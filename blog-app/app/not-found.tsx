import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotfoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] text-center">
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <p className="text-2xl font-semibold mb-6">Page Not Found</p>
      <p className="text-muted-foreground max-w-md mb-6">
        The page you are looking for doesnot exist or has been removed
      </p>
      <Button asChild>
        <Link href={"/"}>Return to Home</Link>
      </Button>
    </div>
  );
};

export default NotfoundPage;
