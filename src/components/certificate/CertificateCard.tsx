
import { Certificate } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from 'qrcode.react';
import { Link } from "react-router-dom";

interface CertificateCardProps {
  certificate: Certificate;
  showActions?: boolean;
}

export function CertificateCard({ certificate, showActions = true }: CertificateCardProps) {
  const { 
    id, 
    title, 
    recipientName, 
    issueDate, 
    issuerName, 
    verified,
    qrCodeId
  } = certificate;

  const verificationUrl = `${window.location.origin}/verify/${qrCodeId}`;

  return (
    <Card className="overflow-hidden shadow-md transition-all hover:shadow-lg">
      <CardHeader className="bg-gradient-to-r from-certify-purple to-certify-purpleDark p-4 text-white">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4 flex flex-col space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-500">Recipient:</span>
            <span className="text-sm font-semibold">{recipientName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-500">Issuer:</span>
            <span className="text-sm">{issuerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-500">Issue Date:</span>
            <span className="text-sm">{new Date(issueDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-500">Status:</span>
            <Badge 
              variant={verified ? "default" : "destructive"}
              className={verified ? "bg-green-500 hover:bg-green-600" : ""}
            >
              {verified ? "Verified" : "Unverified"}
            </Badge>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center">
          <QRCodeSVG
            value={verificationUrl}
            size={120}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
            includeMargin={false}
          />
        </div>
      </CardContent>
      
      {showActions && (
        <CardFooter className="flex justify-between gap-2 bg-gray-50 p-4">
          <Link to={`/certificate/${id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View
            </Button>
          </Link>
          <Link to={verificationUrl} className="flex-1">
            <Button className="w-full bg-certify-purple hover:bg-certify-purpleDark">
              Verify
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
