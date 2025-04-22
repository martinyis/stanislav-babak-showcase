
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-bold text-gradient mb-6">404</h1>
        <p className="text-2xl font-medium text-foreground mb-4">Page Not Found</p>
        <p className="text-foreground/70 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button className="bg-gradient-primary">
          <a href="/" className="flex items-center">
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
