import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Redirect to the wedding invitation HTML page
    window.location.href = "/wedding.html";
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-xl text-muted-foreground">Yönlendiriliyor...</p>
      </div>
    </div>
  );
};

export default Index;
