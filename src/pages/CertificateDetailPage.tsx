
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useParams, Link, Navigate } from "react-router-dom";
import { useCertificates } from "@/context/CertificateContext";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { Badge } from "@/components/ui/badge";

const CertificateDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getCertificate } = useCertificates();
  
  // Get certificate details
  const certificate = id ? getCertificate(id) : null;
  
  // If certificate not found, redirect to verification page
  if (!certificate) {
    return <Navigate to="/verify" />;
  }
  
  const verificationUrl = `${window.location.origin}/verify/${certificate.qrCodeId}`;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            {/* Certificate Document */}
            <div className="mb-8 overflow-hidden rounded-lg bg-white shadow-lg">
              {/* Certificate Header */}
              <div className="bg-gradient-to-r from-certify-purple to-certify-purpleDark p-6 text-center text-white">
                <h1 className="mb-2 text-3xl font-bold">Certificate of Achievement</h1>
                <p className="text-lg opacity-90">This is to certify that</p>
              </div>
              
              {/* Certificate Body */}
              <div className="p-8 text-center">
                <h2 className="mb-6 text-3xl font-serif italic text-certify-dark">
                  {certificate.recipientName}
                </h2>
                
                <p className="mb-4 text-lg text-gray-600">
                  has successfully completed
                </p>
                
                <h3 className="mb-8 text-2xl font-bold text-certify-dark">
                  {certificate.title}
                </h3>
                
                <p className="mb-8 mx-auto max-w-2xl text-gray-600">
                  {certificate.description}
                </p>
                
                <div className="mb-8 flex justify-center">
                  <QRCodeSVG
                    value={verificationUrl}
                    size={120}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                    includeMargin={false}
                  />
                </div>
                
                <div className="text-center text-sm text-gray-500">
                  <p>Certificate ID: {certificate.id}</p>
                  <p>Issued on: {new Date(certificate.issueDate).toLocaleDateString()}</p>
                  <p>Issued by: {certificate.issuerName}</p>
                </div>
              </div>
              
              {/* Certificate Footer */}
              <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 p-4">
                <Badge variant={certificate.verified ? "default" : "destructive"} className={certificate.verified ? "bg-green-500" : ""}>
                  {certificate.verified ? "Blockchain Verified" : "Unverified"}
                </Badge>
                
                <div className="text-sm text-gray-500">
                  <p>Verify at: {window.location.host}/verify/{certificate.qrCodeId}</p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" className="border-certify-purple text-certify-purple">
                Download PDF
              </Button>
              
              <Link to={`/verify/${certificate.qrCodeId}`}>
                <Button className="bg-certify-purple hover:bg-certify-purpleDark">
                  Verify on Blockchain
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CertificateDetailPage;
