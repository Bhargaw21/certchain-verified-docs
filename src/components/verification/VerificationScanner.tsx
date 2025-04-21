
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Search } from "lucide-react";
import { useCertificates } from "@/context/CertificateContext";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function VerificationScanner() {
  const [certificateId, setCertificateId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  const { getCertificate, verifyCertificate } = useCertificates();
  const navigate = useNavigate();
  
  const handleVerify = async () => {
    if (!certificateId.trim()) return;
    
    setIsVerifying(true);
    setVerificationResult(null);
    
    try {
      // First check if certificate exists
      const certificate = getCertificate(certificateId);
      
      if (!certificate) {
        setVerificationResult({
          success: false,
          message: "Certificate not found. Please check the ID and try again.",
        });
        return;
      }
      
      // Then verify on blockchain
      const isVerified = await verifyCertificate(certificateId);
      
      if (isVerified) {
        setVerificationResult({
          success: true,
          message: "Certificate successfully verified on the blockchain!",
        });
        
        // Navigate to certificate details after a short delay
        setTimeout(() => {
          navigate(`/certificate/${certificate.id}`);
        }, 2000);
      } else {
        setVerificationResult({
          success: false,
          message: "Certificate data does not match blockchain records.",
        });
      }
    } catch (error) {
      setVerificationResult({
        success: false,
        message: "An error occurred during verification.",
      });
    } finally {
      setIsVerifying(false);
    }
  };
  
  return (
    <Card className="w-full max-w-lg shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Verify Certificate</CardTitle>
        <CardDescription>
          Enter a certificate ID or QR code identifier to verify its authenticity on the blockchain.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter certificate ID or scan QR code"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleVerify}
              disabled={isVerifying || !certificateId.trim()}
              className="bg-certify-purple hover:bg-certify-purpleDark"
            >
              {isVerifying ? "Verifying..." : "Verify"}
              {!isVerifying && <Search className="ml-2 h-4 w-4" />}
            </Button>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            <p>Try demo IDs: "cert-1" or "qr-cert-2"</p>
          </div>
        </div>
        
        {verificationResult && (
          <Alert variant={verificationResult.success ? "default" : "destructive"}>
            {verificationResult.success ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertTitle>
              {verificationResult.success ? "Success" : "Error"}
            </AlertTitle>
            <AlertDescription>
              {verificationResult.message}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="mt-6 rounded-md bg-gray-50 p-4">
          <h4 className="mb-2 text-sm font-medium text-gray-700">
            How verification works:
          </h4>
          <ol className="list-inside list-decimal space-y-1 text-sm text-gray-600">
            <li>We check if the certificate exists in our database</li>
            <li>We calculate the hash of the certificate data</li>
            <li>We verify this hash on the Ethereum blockchain</li>
            <li>We confirm the certificate is authentic and unaltered</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
