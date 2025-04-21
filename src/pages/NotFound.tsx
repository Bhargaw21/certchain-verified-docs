
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <div className="mb-8 text-6xl font-bold text-certify-purple">404</div>
      <h1 className="mb-4 text-2xl font-bold text-certify-dark">Page Not Found</h1>
      <p className="mb-8 max-w-md text-gray-600">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button className="bg-certify-purple hover:bg-certify-purpleDark">
          Return to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
