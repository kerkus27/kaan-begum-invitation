import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";

const HazirDavetiye = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Teşekkürler! Ekibimiz 24 saat içinde davetiyenizi yayına alacak.");
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
        <div className="container mx-auto px-6 max-w-3xl">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Ana Sayfaya Dön
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
              Hazır Tasarım: Bilgileri Doldurun, Hemen Yayınlayalım
            </h1>
            <p className="text-lg text-muted-foreground">
              Tek bir şık tasarım. Bilgileri girin, size özel sayfayı ve LCV takibini açalım.
            </p>
          </div>

          <Card className="p-8 lg:p-12 border-border shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-8">
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
    </div>
  );
};

export default HazirDavetiye;
