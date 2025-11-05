import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckSquare, Share2, Users, CheckCircle, MessageSquare, Image, Mail, MapPin, Bell } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">davete</h1>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Hakkımızda</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Nasıl Çalışır?</a>
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Özellikler</a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sıkça Sorulan Sorular</a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Bize Ulaşın</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
              Premium
            </span>
            <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              DAVET ETMENİN<br />MODERN YOLU!
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Davetinizi; katılım takibi (LCV), hatırlatmalar ve anı paylaşımlarıyla ayrıcalıklı bir deneyime dönüştürün.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base">
                Davete'yi Keşfedin →
              </Button>
              <Button size="lg" variant="outline" className="text-base">
                LCV Hizmetini Keşfedin →
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-card border border-border rounded-3xl p-8 shadow-lg">
              <div className="aspect-[9/19] bg-muted rounded-2xl flex items-center justify-center">
                <p className="text-muted-foreground">Davetiye Önizleme</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Steps Section */}
      <section id="how-it-works" className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-foreground mb-16">
            3 Adımda Modern ve Şık Bir Davet!
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckSquare className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Etkinlik Bilgilerini Ekleyin</h3>
              <p className="text-muted-foreground">
                Davetinize özel tasarımınızı seçip, tarih, konum, yol tarifi, SMS bildirimleri ve etkinlik akışı gibi detayları ekleyerek zarafeti ve şıklığı bir araya getirin.
              </p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Share2 className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Davetiye Linkinizi Paylaşın, Konuklarınızı Davet Edin</h3>
              <p className="text-muted-foreground">
                Davetiyenizi 'Paylaş' butonuyla mesajlaşma uygulamaları, e-posta veya sosyal medya üzerinden kolayca iletererek, konuklarınıza modern ve şık bir davet sunun.
              </p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Davetinizi Sorunsuz Yönetin</h3>
              <p className="text-muted-foreground">
                Katılım durumlarını anlık olarak takip edin, konuklarınızın etkinlikte çektiği fotoğraf ve videoları zahmetsizce toplayın ve davetinizin her yönünü olağanüstü bir şekilde yönetin.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-foreground mb-16">
            Davete'nin Sunduğu Özel Ayrıcalıklar!
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mb-6 bg-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Otomatik Davetiye Gönderimi + LCV Hizmeti (WhatsApp, SMS & Sesli Arama Bildirimi)
              </h3>
              <p className="text-muted-foreground mb-6">
                Davetli listenizi Excel formatında yükleyin, sistem WhatsApp, SMS ve sesli arama ile otomatik bildirim yapsin; konuklarınızın katılım durumunu kolayca öğrenin.
              </p>
              <Button variant="outline">İncele →</Button>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mb-6 bg-primary/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Konuk Takip Durumu (LCV)
              </h3>
              <p className="text-muted-foreground">
                Konuklarınızın katılım durumunu anlık olarak takip edin ve gelişmiş katılım raporlama özellikleriyle etkinliğinizi sorunsuz yönetin.
              </p>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mb-6 bg-primary/10 rounded-lg flex items-center justify-center">
                <Image className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Fotoğraf ve Video Anı Paylaşımı
              </h3>
              <p className="text-muted-foreground">
                Konuklarınız, davetiyeniz veya masadaki QR kodu okutarak etkinlikte çektikleri fotoğraf ve videoları sizinle kolayca paylaşsın.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mb-6 bg-primary/10 rounded-lg flex items-center justify-center">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Basılı ve Online Davetiye Bir Arada
              </h3>
              <p className="text-muted-foreground">
                Basılı davetiyenize Davete QR kodu ekleyin; LCV, yol tarifi, takvime ekleme ve fotoğraf/video paylaşımını kolaylaştırın.
              </p>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mt-12">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mb-6 bg-primary/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Etkinlik Konumu ve Yol Tarifi
              </h3>
              <p className="text-muted-foreground">
                Konuklarınız, davetiyeniz üzerinden etkinlik konumunu görüntülesin ve kolayca yol tarifi alsın.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mb-6 bg-primary/10 rounded-lg flex items-center justify-center">
                <Bell className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Etkinlik Hatırlatması ve Kişiye Özel Bilgilendirme
              </h3>
              <p className="text-muted-foreground">
                Etkinlik bilgileri, masa/koltuk numarası, yol tarifi, kıyafet önerisi, güncellemeler ve teşekkür mesajı gibi detaylarla konuklarınıza özel SMS gönderin; etkili ve unutulmaz bir davet deneyimi sunun.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-foreground mb-16">
            Davete'yi Tercih Edenler Ne Diyor?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10" />
                <div>
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary">★</span>
                    ))}
                  </div>
                  <h4 className="font-bold text-foreground">BALDAN & BARAN – Çırağan</h4>
                  <p className="text-sm text-muted-foreground">Palace Kempinski / İstanbul</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10" />
                <div>
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary">★</span>
                    ))}
                  </div>
                  <h4 className="font-bold text-foreground">NESLİSAH – Kına Gecesi –</h4>
                  <p className="text-sm text-muted-foreground">Marriott Asia / İstanbul</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10" />
                <div>
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary">★</span>
                    ))}
                  </div>
                  <h4 className="font-bold text-foreground">KÜBRA – Kına Gecesi –</h4>
                  <p className="text-sm text-muted-foreground">Crowne Plaza / İstanbul</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© 2025 davete. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
