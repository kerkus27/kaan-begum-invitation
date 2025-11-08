import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Calendar, MapPin, Sparkles, ArrowRight } from "lucide-react";

const Landing = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif font-semibold text-foreground">davete</Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/hakkimizda" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Hakkımızda
            </Link>
            <button onClick={() => scrollToSection('how-it-works')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Nasıl Çalışır
            </button>
            <button onClick={() => scrollToSection('features')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Özellikler
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              SSS
            </button>
            <Link to="/iletisim" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              İletişim
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
              Davet Etmenin Modern Yolu — Sadece Düğünler İçin
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Tek tasarım, hızlı kurulum. LCV takibi, takvime ekleme ve konumla modern bir düğün daveti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                asChild
                className="text-base font-medium"
              >
                <Link to="/hazirdavetiye">
                  Hazır Davetiye ile Başla
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                asChild
                className="text-base font-medium border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                <Link to="/ozeltasarim">
                  Özel Tasarım İste
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <div className="aspect-[9/19] bg-muted/30 rounded-xl flex items-center justify-center border border-border">
                <p className="text-muted-foreground text-sm">Hazır Davetiye Önizleme</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="features" className="bg-card py-24 border-y border-border">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-center text-foreground mb-16">
            Neden Bizi Tercih Etmelisiniz?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="p-8 border-border hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <CheckCircle className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3 text-foreground">
                LCV (Katılım) Takibi
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Kaç kişinin geleceğini anlık görün; WhatsApp/SMS ile kolay yanıt.
              </p>
            </Card>

            <Card className="p-8 border-border hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Calendar className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3 text-foreground">
                Takvime Ekle
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Konuklar tek dokunuşla takvimlerine kaydeder (iCal/Google).
              </p>
            </Card>

            <Card className="p-8 border-border hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3 text-foreground">
                Konum & Yol Tarifi
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Google Maps ile mekâna tek tıkla ulaşım.
              </p>
            </Card>

            <Card className="p-8 border-border hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3 text-foreground">
                Modern Dijital Davetiye
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                QR ve link ile pratik paylaşım, çağdaş deneyim.
              </p>
            </Card>
          </div>

          <div className="text-center py-8">
            <div className="flex flex-wrap justify-center gap-12 text-sm text-muted-foreground">
              <div>
                <div className="text-3xl font-serif font-bold text-foreground mb-1">10.000+</div>
                <div>Davetli</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-foreground mb-1">%78</div>
                <div>LCV Dönüş Oranı</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-foreground mb-1">24 Saat</div>
                <div>Yayında</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-center text-foreground mb-16">
            Nasıl Çalışır?
          </h2>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-serif font-bold text-primary">1</span>
              </div>
              <h3 className="text-2xl font-serif font-semibold text-foreground">
                Bilgileri Girin
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Davetinizin tüm detaylarını hızlıca doldurun.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-serif font-bold text-primary">2</span>
              </div>
              <h3 className="text-2xl font-serif font-semibold text-foreground">
                Linki Paylaşın
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Özel davetiye linkinizi konuklarınızla paylaşın.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-serif font-bold text-primary">3</span>
              </div>
              <h3 className="text-2xl font-serif font-semibold text-foreground">
                LCV'yi Takip Edin
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Katılım durumlarını anlık olarak görüntüleyin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-card py-24 border-y border-border">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-center text-foreground mb-16">
            Sıkça Sorulan Sorular
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border border-border rounded-xl px-6 bg-background">
              <AccordionTrigger className="text-lg font-medium text-foreground hover:no-underline">
                LCV nasıl çalışır?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                LCV (Liste Confirmation Verification), konuklarınızın katılım durumlarını WhatsApp veya SMS üzerinden kolayca bildirmelerini sağlar. Konuklar davetiye linkinden "Katılacağım" veya "Katılamayacağım" seçeneklerini işaretler ve siz anlık olarak tüm yanıtları görebilirsiniz.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-border rounded-xl px-6 bg-background">
              <AccordionTrigger className="text-lg font-medium text-foreground hover:no-underline">
                Konuklar takvime nasıl ekler?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Davetiyede "Takvime Ekle" butonu bulunur. Konuklar bu butona tıkladığında, düğün tarihi otomatik olarak Google Takvim veya Apple Takvim gibi uygulamalara eklenir.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-border rounded-xl px-6 bg-background">
              <AccordionTrigger className="text-lg font-medium text-foreground hover:no-underline">
                Adres/konum linki nasıl açılır?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Davetiyede "Yol Tarifi Al" butonu bulunur. Bu butona tıklandığında, düğün mekânının konumu Google Maps'te açılır ve konuklar kolayca yol tarifi alabilir.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-border rounded-xl px-6 bg-background">
              <AccordionTrigger className="text-lg font-medium text-foreground hover:no-underline">
                Özel tasarım süresi nedir?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Özel tasarım talepleri için ekibimiz 1 iş günü içinde size geri dönüş yapar. Tasarım sürecine başladıktan sonra, genellikle 3-5 iş günü içinde özel davetiyeniz hazır olur.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border border-border rounded-xl px-6 bg-background">
              <AccordionTrigger className="text-lg font-medium text-foreground hover:no-underline">
                Davet linki ne kadar süre geçerli?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Davetiye linkiniz düğün tarihinden sonra 30 gün boyunca aktif kalır. Bu süre içinde konuklarınız davetiyeyi görüntüleyebilir ve anılarınıza erişebilirler.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-primary/5 py-20 border-y border-border">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
            Hazır mısınız? 5 dakikada davetiniz hazır.
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Hemen başlayın ve özel gününüzü konuklarınızla paylaşın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-base font-medium">
              <Link to="/hazirdavetiye">Hazır Davetiye ile Başla</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              asChild
              className="text-base font-medium border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              <Link to="/ozeltasarim">Özel Tasarım İste</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-12 text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-serif font-semibold mb-4">davete</h3>
              <p className="text-primary-foreground/80 text-sm">
                Modern düğün davetiyeleriniz için dijital çözüm.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hızlı Bağlantılar</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><Link to="/hakkimizda" className="hover:text-primary-foreground">Hakkımızda</Link></li>
                <li><button onClick={() => scrollToSection('how-it-works')} className="hover:text-primary-foreground">Nasıl Çalışır</button></li>
                <li><button onClick={() => scrollToSection('features')} className="hover:text-primary-foreground">Özellikler</button></li>
                <li><button onClick={() => scrollToSection('faq')} className="hover:text-primary-foreground">SSS</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Yasal</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><Link to="/kullanimkosullari" className="hover:text-primary-foreground">Kullanım Koşulları</Link></li>
                <li><Link to="/gizlilik" className="hover:text-primary-foreground">Gizlilik</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">İletişim</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><Link to="/iletisim" className="hover:text-primary-foreground">İletişim</Link></li>
                <li><a href="mailto:info@davete.com" className="hover:text-primary-foreground">info@davete.com</a></li>
                <li><a href="https://wa.me/905551234567" className="hover:text-primary-foreground" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/80">
            <p>&copy; {new Date().getFullYear()} davete. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
