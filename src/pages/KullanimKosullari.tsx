import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const KullanimKosullari = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif font-semibold text-foreground">davete</Link>
        </div>
      </header>

      {/* Terms Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
              Kullanım Koşulları
            </h1>
            <p className="text-muted-foreground">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
          </div>

          <Card className="p-8 lg:p-12 border-border">
            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">1. Hizmet Kapsamı</h2>
                <p className="text-muted-foreground leading-relaxed">
                  davete, düğün davetiyesi oluşturma ve yönetme hizmeti sunmaktadır. 
                  Hizmetimiz, dijital davetiye oluşturma, LCV (katılım) takibi, takvime ekleme 
                  ve konum paylaşımı gibi özellikler içermektedir.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">2. Kullanıcı Sorumlulukları</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Hizmetimizi kullanırken:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Doğru ve güncel bilgiler sağlamalısınız</li>
                  <li>Başkalarının haklarını ihlal etmemelisiniz</li>
                  <li>Hizmeti kötüye kullanmamalısınız</li>
                  <li>Yasal düzenlemelere uygun hareket etmelisiniz</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">3. Fikri Mülkiyet Hakları</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Platformda yer alan tüm tasarımlar, içerikler ve yazılımlar davete'nin 
                  mülkiyetindedir. İzinsiz kullanım, kopyalama veya dağıtım yasaktır.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">4. Hizmet Değişiklikleri</h2>
                <p className="text-muted-foreground leading-relaxed">
                  davete, hizmet içeriğini, fiyatlandırmayı ve özelliklerini önceden bildirimde 
                  bulunarak değiştirme hakkını saklı tutar.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">5. Sorumluluk Sınırlaması</h2>
                <p className="text-muted-foreground leading-relaxed">
                  davete, hizmetin kesintisiz ve hatasız olacağını garanti etmez. 
                  Kullanıcıların yaşayabileceği dolaylı zararlardan sorumlu değildir.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">6. İletişim</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Kullanım koşulları hakkında sorularınız için{" "}
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

export default KullanimKosullari;
