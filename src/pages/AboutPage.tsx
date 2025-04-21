
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const AboutPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h1 className="mb-4 text-3xl font-bold text-certify-dark">About E-Certify</h1>
              <p className="text-lg text-gray-600">
                Revolutionizing digital certificates with blockchain technology
              </p>
            </div>
            
            <div className="space-y-12">
              {/* About Section */}
              <section className="rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-4 text-2xl font-semibold text-certify-dark">Our Mission</h2>
                <p className="mb-4 text-gray-600">
                  E-Certify was founded with a simple yet powerful mission: to create a system where digital certificates 
                  could be fully trusted, easily verified, and completely tamper-proof. By leveraging blockchain technology, 
                  we've built a platform that ensures the integrity and authenticity of every certificate issued.
                </p>
                <p className="text-gray-600">
                  Our goal is to solve the growing problem of certificate fraud and misrepresentation by creating 
                  an immutable record of achievements, qualifications, and credentials that can be instantly verified 
                  by anyone, anywhere in the world.
                </p>
              </section>
              
              {/* How It Works */}
              <section className="rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-2xl font-semibold text-certify-dark">How It Works</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg border border-gray-100 p-4 text-center">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-certify-purple/10 text-certify-purple mx-auto">
                        <span className="text-xl font-semibold">1</span>
                      </div>
                      <h3 className="mb-2 font-semibold text-certify-dark">Certificate Creation</h3>
                      <p className="text-sm text-gray-600">
                        Organizations create and customize digital certificates for their recipients.
                      </p>
                    </div>
                    
                    <div className="rounded-lg border border-gray-100 p-4 text-center">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-certify-purple/10 text-certify-purple mx-auto">
                        <span className="text-xl font-semibold">2</span>
                      </div>
                      <h3 className="mb-2 font-semibold text-certify-dark">Blockchain Registration</h3>
                      <p className="text-sm text-gray-600">
                        Each certificate is hashed and registered on the Ethereum blockchain, creating a permanent record.
                      </p>
                    </div>
                    
                    <div className="rounded-lg border border-gray-100 p-4 text-center">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-certify-purple/10 text-certify-purple mx-auto">
                        <span className="text-xl font-semibold">3</span>
                      </div>
                      <h3 className="mb-2 font-semibold text-certify-dark">Easy Verification</h3>
                      <p className="text-sm text-gray-600">
                        Recipients share their certificates with a QR code that anyone can scan to instantly verify.
                      </p>
                    </div>
                  </div>
                  
                  <div className="rounded-lg bg-gray-50 p-6">
                    <h3 className="mb-4 text-lg font-semibold text-certify-dark">The Technology Behind It</h3>
                    <p className="mb-3 text-gray-600">
                      E-Certify uses a combination of secure web technologies and blockchain integration:
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-600">
                      <li>Smart contracts on the Ethereum blockchain to store certificate hashes</li>
                      <li>SHA-256 cryptographic hashing to create unique identifiers for each certificate</li>
                      <li>QR code technology for easy scanning and verification</li>
                      <li>Secure digital signature protocols to ensure issuer authenticity</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              {/* Use Cases */}
              <section className="rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-2xl font-semibold text-certify-dark">Who Uses E-Certify</h2>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <h3 className="mb-2 font-semibold text-certify-dark">Educational Institutions</h3>
                    <p className="text-sm text-gray-600">
                      Universities, colleges, and schools use E-Certify to issue tamper-proof degrees, 
                      diplomas, and certificates that can be easily verified by employers.
                    </p>
                  </div>
                  
                  <div className="rounded-lg bg-gray-50 p-4">
                    <h3 className="mb-2 font-semibold text-certify-dark">Training Organizations</h3>
                    <p className="text-sm text-gray-600">
                      Professional training bodies issue verifiable certifications for skills and courses, 
                      adding value to their offerings.
                    </p>
                  </div>
                  
                  <div className="rounded-lg bg-gray-50 p-4">
                    <h3 className="mb-2 font-semibold text-certify-dark">Corporations</h3>
                    <p className="text-sm text-gray-600">
                      Companies use E-Certify for internal training recognition, employee achievements, 
                      and verifiable credentials for partners and clients.
                    </p>
                  </div>
                  
                  <div className="rounded-lg bg-gray-50 p-4">
                    <h3 className="mb-2 font-semibold text-certify-dark">Event Organizers</h3>
                    <p className="text-sm text-gray-600">
                      Conferences, workshops, and events use E-Certify to provide attendees with 
                      blockchain-verified proof of participation.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
