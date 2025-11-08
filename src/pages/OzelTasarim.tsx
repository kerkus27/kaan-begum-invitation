import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";

const OzelTasarim = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    weddingDate: "",
    requirements: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Talebiniz alındı! 1 iş günü içinde size dönüş yapacağız.");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif font-semibold text-foreground">davete</Link>
        </div>
      </header>

      {/* Form Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-2xl">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Ana Sayfaya Dön
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
              Özel Tasarım İste
            </h1>
            <p className="text-lg text-muted-foreground">
              Hazır tasarım dışında bir şey hayal ediyorsanız, bize yazın.
            </p>
          </div>

          <Card className="p-8 lg:p-12 border-border shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Ad Soyad *</Label>
                <Input 
                  id="name" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="border-border"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon *</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-posta (opsiyonel)</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weddingDate">Düğün Tarihi (opsiyonel)</Label>
                <Input 
                  id="weddingDate" 
                  type="date" 
                  value={formData.weddingDate}
                  onChange={(e) => setFormData({...formData, weddingDate: e.target.value})}
                  className="border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">İstekleriniz *</Label>
                <Textarea 
                  id="requirements" 
                  rows={5}
                  placeholder="Tarz, renk, ilave özellikler…"
                  required
                  value={formData.requirements}
                  onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                  className="border-border"
                />
              </div>

              <div className="space-y-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  variant="outline"
                  className="w-full text-base font-medium border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                >
                  Talebimi Gönder
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  1 iş günü içinde dönüş yapıyoruz.
                </p>
              </div>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default OzelTasarim;
