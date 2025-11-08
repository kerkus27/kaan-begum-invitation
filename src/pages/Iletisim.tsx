import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MessageCircle } from "lucide-react";

const Iletisim = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif font-semibold text-foreground">davete</Link>
        </div>
      </header>

      {/* Contact Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
              İletişim
            </h1>
            <p className="text-lg text-muted-foreground">
              Sorularınız için bize ulaşın. Size yardımcı olmaktan mutluluk duyarız.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-border text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3 text-foreground">
                E-posta
              </h3>
              <a href="mailto:info@davete.com" className="text-muted-foreground hover:text-foreground transition-colors">
                info@davete.com
              </a>
            </Card>

            <Card className="p-8 border-border text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Phone className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3 text-foreground">
                Telefon
              </h3>
              <a href="tel:+905551234567" className="text-muted-foreground hover:text-foreground transition-colors">
                +90 555 123 45 67
              </a>
            </Card>

            <Card className="p-8 border-border text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3 text-foreground">
                WhatsApp
              </h3>
              <a 
                href="https://wa.me/905551234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                WhatsApp ile Yazın
              </a>
            </Card>
          </div>

          <Card className="mt-12 p-8 lg:p-12 border-border">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-6 text-center">
              Çalışma Saatlerimiz
            </h2>
            <div className="text-center text-muted-foreground space-y-2">
              <p>Pazartesi - Cuma: 09:00 - 18:00</p>
              <p>Cumartesi: 10:00 - 16:00</p>
              <p>Pazar: Kapalı</p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Iletisim;
