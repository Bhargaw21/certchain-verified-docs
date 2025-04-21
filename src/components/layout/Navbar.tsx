
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-4">
      <div className="container flex items-center justify-between">
        {/* Logo and Site Title */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="bg-gradient-to-r from-certify-purple to-certify-purpleDark bg-clip-text text-2xl font-bold text-transparent">
            E-Certify
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden space-x-6 md:flex">
          <Link to="/" className="text-gray-700 hover:text-certify-purple">
            Home
          </Link>
          <Link to="/verify" className="text-gray-700 hover:text-certify-purple">
            Verify Certificate
          </Link>
          {isAuthenticated && user?.role === 'admin' && (
            <Link to="/admin" className="text-gray-700 hover:text-certify-purple">
              Admin Dashboard
            </Link>
          )}
          <Link to="/about" className="text-gray-700 hover:text-certify-purple">
            About
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Hello, {user?.name}
              </span>
              <Button 
                variant="outline" 
                className="border-certify-purple text-certify-purple hover:bg-certify-purple hover:text-white"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" className="border-certify-purple text-certify-purple hover:bg-certify-purple hover:text-white">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-certify-purple text-white hover:bg-certify-purpleDark">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
