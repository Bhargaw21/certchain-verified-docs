
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-white py-8">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="block">
              <span className="bg-gradient-to-r from-certify-purple to-certify-purpleDark bg-clip-text text-2xl font-bold text-transparent">
                E-Certify
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Secure digital certificates verified on the blockchain.
              Issue, manage, and verify certificates with confidence.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-certify-purple">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/verify" className="text-gray-600 hover:text-certify-purple">
                  Verify Certificate
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-certify-purple">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="text-gray-600 hover:text-certify-purple">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-certify-purple">
                  Blockchain Info
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-certify-purple">
                  API
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="text-gray-600 hover:text-certify-purple">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-certify-purple">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-6">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} E-Certify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
