import { Navigate } from "react-router-dom";

const Index = () => {
  // This component simply redirects to our homepage
  return <Navigate to="/" replace />;
};

export default Index;
