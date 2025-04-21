
import React, { createContext, useContext, useState } from 'react';
import { Certificate } from '@/types';

// Sample certificates data
const MOCK_CERTIFICATES: Certificate[] = [
  {
    id: '1',
    title: 'Blockchain Developer Certification',
    recipientName: 'John Doe',
    recipientEmail: 'john@example.com',
    issueDate: '2023-04-15',
    issuerName: 'Blockchain Academy',
    description: 'This certifies that John Doe has successfully completed the Blockchain Developer course.',
    hash: '0x7b5d8c69a9e1f6d8e5b4c3d2a1b0f9e8d7c6b5a4',
    transactionId: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    verified: true,
    qrCodeId: 'cert-1',
    template: 'professional',
  },
  {
    id: '2',
    title: 'Smart Contract Security Expert',
    recipientName: 'Jane Smith',
    recipientEmail: 'jane@example.com',
    issueDate: '2023-06-22',
    issuerName: 'Security Solutions Inc.',
    description: 'This certifies that Jane Smith has demonstrated expertise in Smart Contract Security.',
    hash: '0x8c7b6a5d4e3f2c1b0a9d8e7f6a5b4c3d2e1f0a9b',
    transactionId: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    verified: true,
    qrCodeId: 'cert-2',
    template: 'standard',
  }
];

// Define context type
interface CertificateContextType {
  certificates: Certificate[];
  isLoading: boolean;
  addCertificate: (certificate: Omit<Certificate, 'id' | 'hash' | 'transactionId' | 'verified' | 'qrCodeId'>) => Promise<Certificate>;
  getCertificate: (id: string) => Certificate | undefined;
  verifyCertificate: (id: string) => Promise<boolean>;
}

// Create context
const CertificateContext = createContext<CertificateContextType | undefined>(undefined);

export const CertificateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [certificates, setCertificates] = useState<Certificate[]>(MOCK_CERTIFICATES);
  const [isLoading, setIsLoading] = useState(false);

  const addCertificate = async (certificateData: Omit<Certificate, 'id' | 'hash' | 'transactionId' | 'verified' | 'qrCodeId'>) => {
    setIsLoading(true);
    
    // Simulate API call and blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate a unique ID and QR code ID
    const id = `cert-${Date.now()}`;
    const qrCodeId = `qr-${Date.now()}`;
    
    // Create a new certificate with a mock hash and transaction ID
    const newCertificate: Certificate = {
      ...certificateData,
      id,
      qrCodeId,
      hash: `0x${Math.random().toString(16).substring(2, 42)}`,
      transactionId: `0x${Math.random().toString(16).substring(2, 66)}`,
      verified: true,
    };
    
    setCertificates(prev => [...prev, newCertificate]);
    setIsLoading(false);
    
    return newCertificate;
  };

  const getCertificate = (id: string) => {
    return certificates.find(cert => cert.id === id || cert.qrCodeId === id);
  };

  const verifyCertificate = async (id: string) => {
    setIsLoading(true);
    
    // Simulate API call and blockchain verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const certificate = getCertificate(id);
    setIsLoading(false);
    
    return !!certificate?.verified;
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

// Custom hook to use the certificate context
export const useCertificates = () => {
  const context = useContext(CertificateContext);
  if (context === undefined) {
    throw new Error('useCertificates must be used within a CertificateProvider');
  }
  return context;
};
