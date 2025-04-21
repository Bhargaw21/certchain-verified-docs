
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CertificateForm } from "@/components/certificate/CertificateForm";
import { useCertificates } from "@/context/CertificateContext";
import { useAuth } from "@/context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { CertificateCard } from "@/components/certificate/CertificateCard";

const AdminDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const { certificates } = useCertificates();
  const { user, isAuthenticated } = useAuth();
  
  // Redirect if not authenticated or not an admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-certify-dark">Admin Dashboard</h1>
              <p className="text-gray-600">Manage and issue blockchain-verified certificates</p>
            </div>
            
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-certify-purple hover:bg-certify-purpleDark"
            >
              {showForm ? "Close Form" : "Issue New Certificate"}
            </Button>
          </div>
          
          {showForm && (
            <div className="mb-12 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-6 text-xl font-semibold text-certify-dark">
                Create New Certificate
              </h2>
              <CertificateForm />
            </div>
          )}
          
          <div className="space-y-8">
            <div>
              <h2 className="mb-6 text-xl font-semibold text-certify-dark">
                Recently Issued Certificates
              </h2>
              
              {certificates.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {certificates.map((certificate) => (
                    <CertificateCard 
                      key={certificate.id} 
                      certificate={certificate} 
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-md bg-white p-8 text-center shadow-sm">
                  <p className="text-lg text-gray-600">
                    No certificates have been issued yet.
                  </p>
                  <Button
                    onClick={() => setShowForm(true)}
                    variant="link"
                    className="mt-2 text-certify-purple"
                  >
                    Issue your first certificate
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
