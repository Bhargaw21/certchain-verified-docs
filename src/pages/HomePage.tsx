
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CertificateCard } from "@/components/certificate/CertificateCard";
import { useCertificates } from "@/context/CertificateContext";

const HomePage = () => {
  const { certificates } = useCertificates();
  
  // Get the first certificate for showcase
  const showcaseCertificate = certificates[0];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-certify-purple to-certify-purpleDark py-20 text-white">
          <div className="container">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                  Blockchain-Verified Digital Certificates
                </h1>
                <p className="text-lg opacity-90">
                  E-Certify uses blockchain technology to create tamper-proof digital certificates
                  that can be easily verified and shared.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/verify">
                    <Button size="lg" variant="outline" className="border-white bg-white/10 text-white hover:bg-white hover:text-certify-purple">
                      Verify a Certificate
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="lg" className="bg-white text-certify-purple hover:bg-gray-100">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="mx-auto max-w-md">
                {showcaseCertificate && (
                  <div className="transform transition duration-500 hover:rotate-1 hover:scale-105">
                    <CertificateCard certificate={showcaseCertificate} showActions={false} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20">
          <div className="container">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-certify-dark">How E-Certify Works</h2>
              <p className="text-lg text-gray-600">
                Our platform combines the security of blockchain technology with the simplicity
                of digital certificates to create a seamless verification experience.
              </p>
            </div>
            
            <div className="grid gap-12 md:grid-cols-3">
              <div className="space-y-4 rounded-lg border border-gray-100 p-6 text-center shadow-sm transition-all hover:shadow-md">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-certify-purple/10 text-certify-purple">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-certify-dark">Create & Issue</h3>
                <p className="text-gray-600">
                  Create digital certificates with customizable templates and issue them to recipients securely.
                </p>
              </div>
              
              <div className="space-y-4 rounded-lg border border-gray-100 p-6 text-center shadow-sm transition-all hover:shadow-md">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-certify-purple/10 text-certify-purple">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-certify-dark">Store on Blockchain</h3>
                <p className="text-gray-600">
                  Each certificate is hashed and stored on the Ethereum blockchain for immutable record-keeping.
                </p>
              </div>
              
              <div className="space-y-4 rounded-lg border border-gray-100 p-6 text-center shadow-sm transition-all hover:shadow-md">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-certify-purple/10 text-certify-purple">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-certify-dark">Verify Instantly</h3>
                <p className="text-gray-600">
                  Anyone can verify a certificate's authenticity by scanning its QR code or entering its ID.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-gray-50 py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl rounded-xl bg-white p-12 shadow-lg">
              <div className="text-center">
                <h2 className="mb-4 text-3xl font-bold text-certify-dark">
                  Ready to Create Blockchain-Verified Certificates?
                </h2>
                <p className="mb-8 text-lg text-gray-600">
                  Join organizations around the world who trust E-Certify for their digital certification needs.
                </p>
                <Link to="/register">
                  <Button size="lg" className="bg-certify-purple px-8 hover:bg-certify-purpleDark">
                    Get Started Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
