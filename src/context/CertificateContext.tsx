
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Certificate } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

// Type for context
interface CertificateContextType {
  certificates: Certificate[];
  isLoading: boolean;
  addCertificate: (
    certificate: Omit<Certificate, 'id' | 'hash' | 'transactionId' | 'verified' | 'qrCodeId'>
  ) => Promise<Certificate>;
  getCertificate: (id: string) => Certificate | undefined;
  verifyCertificate: (id: string) => Promise<boolean>;
}

// Interface matching Supabase database schema (snake_case)
interface SupabaseCertificate {
  id: string;
  title: string;
  recipient_name: string;
  recipient_email: string;
  issue_date: string;
  expiry_date?: string;
  issuer_name: string;
  description: string;
  hash?: string;
  transaction_id?: string;
  verified?: boolean;
  qr_code_id: string;
  template: 'standard' | 'professional' | 'academic';
  user_id?: string;
  created_at: string;
}

// Convert from DB format to frontend format
const mapToCertificate = (dbCert: SupabaseCertificate): Certificate => ({
  id: dbCert.id,
  title: dbCert.title,
  recipientName: dbCert.recipient_name,
  recipientEmail: dbCert.recipient_email,
  issueDate: dbCert.issue_date,
  expiryDate: dbCert.expiry_date,
  issuerName: dbCert.issuer_name,
  description: dbCert.description,
  hash: dbCert.hash,
  transactionId: dbCert.transaction_id,
  verified: dbCert.verified || false,
  qrCodeId: dbCert.qr_code_id,
  template: dbCert.template
});

// Convert from frontend format to DB format
const mapToDbCertificate = (cert: Omit<Certificate, 'id' | 'hash' | 'transactionId' | 'verified' | 'qrCodeId'>) => ({
  title: cert.title,
  recipient_name: cert.recipientName,
  recipient_email: cert.recipientEmail,
  issue_date: cert.issueDate,
  expiry_date: cert.expiryDate,
  issuer_name: cert.issuerName,
  description: cert.description,
  template: cert.template
});

const CertificateContext = createContext<CertificateContextType | undefined>(undefined);

export const CertificateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load certificates on mount (admin: all; user: own only)
  useEffect(() => {
    async function fetchCertificates() {
      if (!user) {
        setCertificates([]);
        return;
      }
      setIsLoading(true);
      let query = supabase.from('certificates').select('*');
      // Admin: view all, User: view only their own
      if (user.role === 'user') query = query.eq('user_id', user.id);
      // For admin (thanks to RLS), get all
      const { data, error } = await query.order('created_at', { ascending: false });
      if (!error && data) {
        const mappedCertificates = (data as SupabaseCertificate[]).map(mapToCertificate);
        setCertificates(mappedCertificates);
      }
      setIsLoading(false);
    }
    fetchCertificates();
  }, [user]);

  // Add certificate (admins only)
  const addCertificate = async (
    certData: Omit<Certificate, 'id' | 'hash' | 'transactionId' | 'verified' | 'qrCodeId'>
  ): Promise<Certificate> => {
    setIsLoading(true);
    // Generate a random string for qrCodeId
    const qrCodeId = `qr-${Math.random().toString(36).substring(2, 12)}`;
    const hash = Math.random().toString(36).substring(2, 42); // Placeholders for now
    const transactionId = Math.random().toString(36).substring(2, 66);

    // Convert frontend data to database format
    const dbCertData = mapToDbCertificate(certData);

    // Insert certificate
    const { data, error } = await supabase.from('certificates').insert([
      {
        ...dbCertData,
        qr_code_id: qrCodeId,
        hash,
        transaction_id: transactionId,
        verified: true,
        user_id: user?.id,
      },
    ])
    .select()
    .single();

    setIsLoading(false);
    if (error || !data) throw new Error(error?.message || 'Failed to insert certificate');
    
    // Convert back to frontend format
    const newCertificate = mapToCertificate(data as SupabaseCertificate);
    setCertificates(prev => [newCertificate, ...prev]);
    return newCertificate;
  };

  // Get single certificate by id or qrCodeId
  const getCertificate = (id: string) => {
    return certificates.find(
      cert => cert.id === id || cert.qrCodeId === id
    );
  };

  // Verify certificate: check if it's present (locally), and its "verified" field (simulate blockchain for demo)
  const verifyCertificate = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    // Try local first
    let cert = certificates.find(
      cert => cert.id === id || cert.qrCodeId === id
    );
    // If not found, try fetch
    if (!cert) {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .or(`id.eq.${id},qr_code_id.eq.${id}`);
      
      if (data && data.length > 0) {
        cert = mapToCertificate(data[0] as SupabaseCertificate);
      }
    }
    setIsLoading(false);
    return Boolean(cert?.verified);
  };

  return (
    <CertificateContext.Provider
      value={{
        certificates,
        isLoading,
        addCertificate,
        getCertificate,
        verifyCertificate,
      }}
    >
      {children}
    </CertificateContext.Provider>
  );
};

export const useCertificates = () => {
  const ctx = useContext(CertificateContext);
  if (!ctx) throw new Error('useCertificates must be used within a CertificateProvider');
  return ctx;
};
