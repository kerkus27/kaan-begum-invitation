import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Calendar, MapPin, Sparkles, ArrowRight } from "lucide-react";

const Landing = () => {
  const [formData, setFormData] = useState({
    groomName: "",
    brideName: "",
    weddingDate: "",
    venue: "",
    address: "",
    contactName: "",
    contactPhone: "",
    doorTime: "",
    ceremonyTime: "",
    afterPartyTime: "",
    notes: "",
    kvkkConsent: false,
  });

  const [customFormData, setCustomFormData] = useState({
    name: "",
    phone: "",
    email: "",
    weddingDate: "",
    requirements: "",
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleReadyFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form validation would go here
    alert("Teşekkürler! Ekibimiz 24 saat içinde davetiyenizi yayına alacak.");
  };

  const handleCustomFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Talebiniz alındı! 1 iş günü içinde size dönüş yapacağız.");
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <h1 className="text-2xl font-serif font-semibold text-foreground">davete</h1>
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('how-it-works')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Nasıl Çalışır
            </button>
            <button onClick={() => scrollToSection('features')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Özellikler
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              SSS
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              İletişim
            </button>
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
                onClick={() => scrollToSection('ready-invitation')}
                className="text-base font-medium"
              >
                Hazır Davetiye ile Başla
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => scrollToSection('custom-design')}
                className="text-base font-medium border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                Özel Tasarım İste
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

      {/* Option 1 - Ready Invitation Form */}
      <section id="ready-invitation" className="bg-card py-24 border-y border-border">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
              Hazır Tasarım: Bilgileri Doldurun, Hemen Yayınlayalım
            </h2>
            <p className="text-lg text-muted-foreground">
              Tek bir şık tasarım. Bilgileri girin, size özel sayfayı ve LCV takibini açalım.
            </p>
          </div>

          <Card className="p-8 lg:p-12 border-border shadow-sm">
            <form onSubmit={handleReadyFormSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="groomName">Damat Ad Soyad *</Label>
                  <Input 
                    id="groomName" 
                    required 
                    value={formData.groomName}
                    onChange={(e) => setFormData({...formData, groomName: e.target.value})}
                    className="border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brideName">Gelin Ad Soyad *</Label>
                  <Input 
                    id="brideName" 
                    required 
                    value={formData.brideName}
                    onChange={(e) => setFormData({...formData, brideName: e.target.value})}
                    className="border-border"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="weddingDate">Düğün Tarihi *</Label>
                  <Input 
                    id="weddingDate" 
                    type="date" 
                    required 
                    value={formData.weddingDate}
                    onChange={(e) => setFormData({...formData, weddingDate: e.target.value})}
                    className="border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="venue">Düğün Mekânı / Yer Adı *</Label>
                  <Input 
                    id="venue" 
                    required 
                    value={formData.venue}
                    onChange={(e) => setFormData({...formData, venue: e.target.value})}
                    className="border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Adres (opsiyonel)</Label>
                <Textarea 
                  id="address" 
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="border-border"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactName">İletişim Kişisi Ad Soyad *</Label>
                  <Input 
                    id="contactName" 
                    required 
                    value={formData.contactName}
                    onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                    className="border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">İletişim Telefonu *</Label>
                  <Input 
                    id="contactPhone" 
                    type="tel" 
                    placeholder="+90 (___) ___ __ __" 
                    required 
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                    className="border-border"
                  />
                </div>
              </div>

              <div className="border-t border-border pt-8">
                <h3 className="text-xl font-serif font-semibold mb-6">Akış / Zamanlar</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="doorTime">Kapı Açılış Saati *</Label>
                    <Input 
                      id="doorTime" 
                      type="time" 
                      required 
                      value={formData.doorTime}
                      onChange={(e) => setFormData({...formData, doorTime: e.target.value})}
                      className="border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ceremonyTime">Nikâh Saati *</Label>
                    <Input 
                      id="ceremonyTime" 
                      type="time" 
                      required 
                      value={formData.ceremonyTime}
                      onChange={(e) => setFormData({...formData, ceremonyTime: e.target.value})}
                      className="border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="afterPartyTime">After Party Saati (opsiyonel)</Label>
                    <Input 
                      id="afterPartyTime" 
                      type="time" 
                      value={formData.afterPartyTime}
                      onChange={(e) => setFormData({...formData, afterPartyTime: e.target.value})}
                      className="border-border"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notlar (opsiyonel)</Label>
                <Textarea 
                  id="notes" 
                  rows={4}
                  placeholder="Özel istekleriniz veya notlarınız..."
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="border-border"
                />
              </div>

              <div className="flex items-start gap-3 pt-4">
                <Checkbox 
                  id="kvkk" 
                  required
                  checked={formData.kvkkConsent}
                  onCheckedChange={(checked) => setFormData({...formData, kvkkConsent: checked as boolean})}
                />
                <Label htmlFor="kvkk" className="text-sm leading-relaxed cursor-pointer">
                  KVKK kapsamında kişisel verilerimin işlenmesini kabul ediyorum.
                </Label>
              </div>

              <Button type="submit" size="lg" className="w-full text-base font-medium">
                Önizle ve Devam Et
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Option 2 - Custom Design */}
      <section id="custom-design" className="py-24">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
              Özel Tasarım İste
            </h2>
            <p className="text-lg text-muted-foreground">
              Hazır tasarım dışında bir şey hayal ediyorsanız, bize yazın.
            </p>
          </div>

          <Card className="p-8 lg:p-12 border-border shadow-sm">
            <form onSubmit={handleCustomFormSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="customName">Ad Soyad *</Label>
                <Input 
                  id="customName" 
                  required 
                  value={customFormData.name}
                  onChange={(e) => setCustomFormData({...customFormData, name: e.target.value})}
                  className="border-border"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="customPhone">Telefon *</Label>
                  <Input 
                    id="customPhone" 
                    type="tel" 
                    required 
                    value={customFormData.phone}
                    onChange={(e) => setCustomFormData({...customFormData, phone: e.target.value})}
                    className="border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customEmail">E-posta (opsiyonel)</Label>
                  <Input 
                    id="customEmail" 
                    type="email" 
                    value={customFormData.email}
                    onChange={(e) => setCustomFormData({...customFormData, email: e.target.value})}
                    className="border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customWeddingDate">Düğün Tarihi (opsiyonel)</Label>
                <Input 
                  id="customWeddingDate" 
                  type="date" 
                  value={customFormData.weddingDate}
                  onChange={(e) => setCustomFormData({...customFormData, weddingDate: e.target.value})}
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
                  value={customFormData.requirements}
                  onChange={(e) => setCustomFormData({...customFormData, requirements: e.target.value})}
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
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground">
              Hazır mısınız? 5 dakikada davetiniz hazır.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => scrollToSection('ready-invitation')}
                className="text-base font-medium"
              >
                Hazır Davetiye ile Başla
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => scrollToSection('custom-design')}
                className="text-base font-medium border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                Özel Tasarım İste
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-primary text-primary-foreground py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-serif font-semibold mb-4">davete</h3>
              <p className="text-sm opacity-90">
                Modern dijital düğün davetiyeleri
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Bağlantılar</h4>
              <div className="space-y-2 text-sm opacity-90">
                <div><a href="#" className="hover:opacity-100 transition-opacity">Hakkımızda</a></div>
                <div><a href="#" className="hover:opacity-100 transition-opacity">Kullanım Koşulları</a></div>
                <div><a href="#" className="hover:opacity-100 transition-opacity">Gizlilik</a></div>
                <div><a href="#" className="hover:opacity-100 transition-opacity">KVKK</a></div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">İletişim</h4>
              <div className="space-y-2 text-sm opacity-90">
                <div><a href="mailto:info@davete.com" className="hover:opacity-100 transition-opacity">info@davete.com</a></div>
                <div><a href="https://wa.me/905555555555" className="hover:opacity-100 transition-opacity">WhatsApp</a></div>
              </div>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-primary-foreground/20">
            <p className="text-sm opacity-90">© 2025 davete. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
