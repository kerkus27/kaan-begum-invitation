import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Gizlilik = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif font-semibold text-foreground">davete</Link>
        </div>
      </header>

      {/* Privacy Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
              Gizlilik Politikası
            </h1>
            <p className="text-muted-foreground">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
          </div>

          <Card className="p-8 lg:p-12 border-border">
            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">1. Toplanan Bilgiler</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Hizmetimizi kullanırken aşağıdaki bilgileri topluyoruz:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Ad, soyad ve iletişim bilgileri</li>
                  <li>Düğün tarihi ve mekan bilgileri</li>
                  <li>Konuk listesi ve LCV yanıtları</li>
                  <li>Kullanım istatistikleri ve teknik veriler</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">2. Bilgilerin Kullanımı</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Topladığımız bilgileri şu amaçlarla kullanırız:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Dijital davetiye oluşturma ve yönetme</li>
                  <li>LCV takibi ve bildirimler gönderme</li>
                  <li>Müşteri desteği sağlama</li>
                  <li>Hizmet kalitesini geliştirme</li>
                  <li>Yasal yükümlülükleri yerine getirme</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">3. Bilgi Güvenliği</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Kişisel verilerinizi korumak için endüstri standartlarında güvenlik önlemleri 
                  alıyoruz. Verileriniz şifreli bağlantılar üzerinden iletilir ve güvenli 
                  sunucularda saklanır.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">4. Üçüncü Taraflarla Paylaşım</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Kişisel bilgilerinizi üçüncü taraflarla paylaşmıyoruz. Sadece hizmet 
                  sağlayıcılarımızla (SMS, e-posta servisleri gibi) gerekli bilgileri paylaşırız.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">5. Çerezler (Cookies)</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır. 
                  Tarayıcı ayarlarınızdan çerezleri yönetebilirsiniz.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">6. Haklarınız (KVKK)</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  KVKK kapsamında aşağıdaki haklara sahipsiniz:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                  <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                  <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                  <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
                  <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
                  <li>Verilerin silinmesini veya yok edilmesini isteme</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">7. İletişim</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Gizlilik politikamız veya kişisel verileriniz hakkında sorularınız için{" "}
                  <Link to="/iletisim" className="text-primary hover:underline">
                    iletişim sayfamızdan
                  </Link>
                  {" "}bize ulaşabilirsiniz.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Gizlilik;
