import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckSquare, Share2, Users, CheckCircle, MessageSquare, Image, Mail, MapPin, Bell } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">davete</h1>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Hakkımızda</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Nasıl Çalışır?</a>
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Özellikler</a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sıkça Sorulan Sorular</a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Bize Ulaşın</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 bg-transparent border border-border text-muted-foreground text-xs font-medium tracking-wider uppercase mb-8">
              Premium
            </span>
            <h2 className="text-5xl lg:text-6xl font-semibold text-foreground mb-6 tracking-tight leading-tight">
              DAVET ETMENİN<br />MODERN YOLU!
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Davetinizi; katılım takibi (LCV), hatırlatmalar ve anı paylaşımlarıyla ayrıcalıklı bir deneyime dönüştürün.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Davete'yi Keşfedin →
              </Button>
              <Button size="lg" variant="outline" className="border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary">
                LCV Hizmetini Keşfedin →
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-card border border-border/50 rounded-xl p-10 shadow-sm">
              <div className="aspect-[9/19] bg-muted/30 rounded-xl flex items-center justify-center border border-border/30">
                <p className="text-muted-foreground text-sm">Davetiye Önizleme</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Steps Section */}
      <section id="how-it-works" className="bg-card py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl lg:text-5xl font-semibold text-center text-foreground mb-20 tracking-tight">
            3 Adımda Modern ve Şık Bir Davet!
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-10 text-center hover:shadow-sm transition-all border-border/50 bg-background">
              <div className="w-20 h-20 mx-auto mb-8 border border-border/50 rounded-full flex items-center justify-center">
                <CheckSquare className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Etkinlik Bilgilerini Ekleyin</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Davetinize özel tasarımınızı seçip, tarih, konum, yol tarifi, SMS bildirimleri ve etkinlik akışı gibi detayları ekleyerek zarafeti ve şıklığı bir araya getirin.
              </p>
            </Card>
            
            <Card className="p-10 text-center hover:shadow-sm transition-all border-border/50 bg-background">
              <div className="w-20 h-20 mx-auto mb-8 border border-border/50 rounded-full flex items-center justify-center">
                <Share2 className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Davetiye Linkinizi Paylaşın, Konuklarınızı Davet Edin</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Davetiyenizi 'Paylaş' butonuyla mesajlaşma uygulamaları, e-posta veya sosyal medya üzerinden kolayca iletererek, konuklarınıza modern ve şık bir davet sunun.
              </p>
            </Card>
            
            <Card className="p-10 text-center hover:shadow-sm transition-all border-border/50 bg-background">
              <div className="w-20 h-20 mx-auto mb-8 border border-border/50 rounded-full flex items-center justify-center">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Davetinizi Sorunsuz Yönetin</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Katılım durumlarını anlık olarak takip edin, konuklarınızın etkinlikte çektiği fotoğraf ve videoları zahmetsizce toplayın ve davetinizin her yönünü olağanüstü bir şekilde yönetin.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl lg:text-5xl font-semibold text-center text-foreground mb-20 tracking-tight">
            Davete'nin Sunduğu Özel Ayrıcalıklar!
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Card className="p-10 hover:shadow-sm transition-all border-border/50">
              <div className="w-16 h-16 mb-6 border border-border/50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Otomatik Davetiye Gönderimi + LCV Hizmeti (WhatsApp, SMS & Sesli Arama Bildirimi)
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Davetli listenizi Excel formatında yükleyin, sistem WhatsApp, SMS ve sesli arama ile otomatik bildirim yapsin; konuklarınızın katılım durumunu kolayca öğrenin.
              </p>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">İncele →</Button>
            </Card>

            <Card className="p-10 hover:shadow-sm transition-all border-border/50">
              <div className="w-16 h-16 mb-6 border border-border/50 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Konuk Takip Durumu (LCV)
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Konuklarınızın katılım durumunu anlık olarak takip edin ve gelişmiş katılım raporlama özellikleriyle etkinliğinizi sorunsuz yönetin.
              </p>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-10 hover:shadow-sm transition-all border-border/50">
              <div className="w-16 h-16 mb-6 border border-border/50 rounded-lg flex items-center justify-center">
                <Image className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Fotoğraf ve Video Anı Paylaşımı
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Konuklarınız, davetiyeniz veya masadaki QR kodu okutarak etkinlikte çektikleri fotoğraf ve videoları sizinle kolayca paylaşsın.
              </p>
            </Card>

            <Card className="p-10 hover:shadow-sm transition-all border-border/50">
              <div className="w-16 h-16 mb-6 border border-border/50 rounded-lg flex items-center justify-center">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Basılı ve Online Davetiye Bir Arada
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Basılı davetiyenize Davete QR kodu ekleyin; LCV, yol tarifi, takvime ekleme ve fotoğraf/video paylaşımını kolaylaştırın.
              </p>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            <Card className="p-10 hover:shadow-sm transition-all border-border/50">
              <div className="w-16 h-16 mb-6 border border-border/50 rounded-lg flex items-center justify-center">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Etkinlik Konumu ve Yol Tarifi
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Konuklarınız, davetiyeniz üzerinden etkinlik konumunu görüntülesin ve kolayca yol tarifi alsın.
              </p>
            </Card>

            <Card className="p-10 hover:shadow-sm transition-all border-border/50">
              <div className="w-16 h-16 mb-6 border border-border/50 rounded-lg flex items-center justify-center">
                <Bell className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Etkinlik Hatırlatması ve Kişiye Özel Bilgilendirme
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Etkinlik bilgileri, masa/koltuk numarası, yol tarifi, kıyafet önerisi, güncellemeler ve teşekkür mesajı gibi detaylarla konuklarınıza özel SMS gönderin; etkili ve unutulmaz bir davet deneyimi sunun.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-card py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl lg:text-5xl font-semibold text-center text-foreground mb-20 tracking-tight">
            Davete'yi Tercih Edenler Ne Diyor?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-border/50 bg-background">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full border border-border/50 flex-shrink-0" />
                <div>
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary text-lg">★</span>
                    ))}
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">BALDAN & BARAN – Çırağan</h4>
                  <p className="text-xs text-muted-foreground">Palace Kempinski / İstanbul</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-border/50 bg-background">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full border border-border/50 flex-shrink-0" />
                <div>
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary text-lg">★</span>
                    ))}
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">NESLİSAH – Kına Gecesi –</h4>
                  <p className="text-xs text-muted-foreground">Marriott Asia / İstanbul</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-border/50 bg-background">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full border border-border/50 flex-shrink-0" />
                <div>
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary text-lg">★</span>
                    ))}
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">KÜBRA – Kına Gecesi –</h4>
                  <p className="text-xs text-muted-foreground">Crowne Plaza / İstanbul</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground text-sm">© 2025 davete. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
