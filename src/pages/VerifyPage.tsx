
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VerificationScanner } from "@/components/verification/VerificationScanner";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCertificates } from "@/context/CertificateContext";
import { CertificateCard } from "@/components/certificate/CertificateCard";
import { Badge } from "@/components/ui/badge";
import { Loader } from "lucide-react";

const VerifyPage = () => {
  const { id } = useParams<{ id?: string }>();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const { getCertificate, verifyCertificate } = useCertificates();
  
  const certificate = id ? getCertificate(id) : null;
  
  useEffect(() => {
    if (id && certificate) {
      const verifyOnLoad = async () => {
        setIsVerifying(true);
        try {
          const result = await verifyCertificate(id);
          setIsVerified(result);
        } catch (error) {
          console.error("Verification error:", error);
          setIsVerified(false);
        } finally {
          setIsVerifying(false);
        }
      };
      
      verifyOnLoad();
    }
  }, [id, certificate, verifyCertificate]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h1 className="mb-2 text-3xl font-bold text-certify-dark">Certificate Verification</h1>
              <p className="text-lg text-gray-600">
                Verify the authenticity of any certificate issued through E-Certify
              </p>
            </div>
            
            {id && certificate ? (
              <div className="space-y-8">
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <div className="mb-6 flex flex-col items-center space-y-4 text-center">
                    <h2 className="text-xl font-semibold text-certify-dark">
                      Blockchain Verification Status
                    </h2>
                    
                    {isVerifying ? (
                      <div className="flex items-center space-x-2 text-certify-purple">
                        <Loader className="h-6 w-6 animate-spin" />
                        <span>Verifying on blockchain...</span>
                      </div>
                    ) : (
                      <Badge 
                        className={`px-4 py-2 text-base ${
                          isVerified 
                            ? "bg-green-500 hover:bg-green-600" 
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        {isVerified ? "Verified Authentic" : "Verification Failed"}
                      </Badge>
                    )}
                    
                    {isVerified && (
                      <p className="text-sm text-gray-600">
                        This certificate is authentic and has been verified on the Ethereum blockchain.
                      </p>
                    )}
                  </div>
                  
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <CertificateCard certificate={certificate} showActions={false} />
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="mb-2 text-lg font-semibold text-certify-dark">
                          Certificate Details
                        </h3>
                        <dl className="grid grid-cols-3 gap-2 rounded-lg bg-gray-50 p-4 text-sm">
                          <dt className="col-span-1 font-medium text-gray-500">Title:</dt>
                          <dd className="col-span-2">{certificate.title}</dd>
                          
                          <dt className="col-span-1 font-medium text-gray-500">Recipient:</dt>
                          <dd className="col-span-2">{certificate.recipientName}</dd>
                          
                          <dt className="col-span-1 font-medium text-gray-500">Issuer:</dt>
                          <dd className="col-span-2">{certificate.issuerName}</dd>
                          
                          <dt className="col-span-1 font-medium text-gray-500">Issue Date:</dt>
                          <dd className="col-span-2">
                            {new Date(certificate.issueDate).toLocaleDateString()}
                          </dd>
                        </dl>
                      </div>
                      
                      <div>
                        <h3 className="mb-2 text-lg font-semibold text-certify-dark">
                          Blockchain Data
                        </h3>
                        <dl className="grid grid-cols-3 gap-2 overflow-x-auto whitespace-normal break-all rounded-lg bg-gray-50 p-4 text-sm">
                          <dt className="col-span-1 font-medium text-gray-500">Certificate Hash:</dt>
                          <dd className="col-span-2 text-xs">{certificate.hash}</dd>
                          
                          <dt className="col-span-1 font-medium text-gray-500">Transaction ID:</dt>
                          <dd className="col-span-2 text-xs">{certificate.transactionId}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <VerificationScanner />
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VerifyPage;
