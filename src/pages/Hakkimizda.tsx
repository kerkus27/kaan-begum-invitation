import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Heart, Sparkles, Users } from "lucide-react";

const Hakkimizda = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif font-semibold text-foreground">davete</Link>
        </div>
      </header>

      {/* About Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
              Hakkımızda
            </h1>
            <p className="text-xl text-muted-foreground">
              Düğünlerinizi dijitale taşıyan modern davetiye platformu
            </p>
          </div>

          <Card className="p-8 lg:p-12 border-border mb-12">
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">davete</strong>, modern çiftlerin düğün davetiyelerini 
                dijital dünyaya taşımak için kurulmuş bir platformdur. Misyonumuz, düğün organizasyonunun 
                en önemli adımlarından biri olan davetiye sürecini kolaylaştırmak ve modernleştirmektir.
              </p>
              <p>
                Geleneksel kağıt davetiyelerin yerini alan dijital çözümümüz ile çiftler, 
                hem çevreci hem de pratik bir yol seçmiş olurlar. LCV (katılım) takibi, 
                takvime otomatik ekleme ve konum paylaşımı gibi özelliklerimizle konuklarınıza 
                modern ve kusursuz bir deneyim sunuyoruz.
              </p>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-8 border-border text-center">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3 text-foreground">
                Tutkuyla Çalışıyoruz
              </h3>
              <p className="text-muted-foreground">
                Her düğün bizim için özel. Çiftlerin mutluluğunu dijitale taşımak için tutkuyla çalışıyoruz.
              </p>
            </Card>

            <Card className="p-8 border-border text-center">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3 text-foreground">
                Modern Çözümler
              </h3>
              <p className="text-muted-foreground">
                Teknolojiyi kullanarak geleneksel süreçleri modernleştiriyor, kullanıcı dostu çözümler sunuyoruz.
              </p>
            </Card>

            <Card className="p-8 border-border text-center">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3 text-foreground">
                Müşteri Odaklı
              </h3>
              <p className="text-muted-foreground">
                Müşteri memnuniyeti önceliğimiz. Her adımda yanınızdayız ve desteğimizi sunuyoruz.
              </p>
            </Card>
          </div>

          <Card className="p-8 lg:p-12 border-border bg-card">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-6 text-center">
              Neden davete?
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                ✓ <strong className="text-foreground">Hızlı ve Kolay:</strong> Dakikalar içinde davetiyenizi oluşturun ve paylaşın
              </p>
              <p className="leading-relaxed">
                ✓ <strong className="text-foreground">LCV Takibi:</strong> Kimin geleceğini anlık olarak takip edin
              </p>
              <p className="leading-relaxed">
                ✓ <strong className="text-foreground">Çevre Dostu:</strong> Kağıt israfını önleyin, dijital çözümü tercih edin
              </p>
              <p className="leading-relaxed">
                ✓ <strong className="text-foreground">Modern Deneyim:</strong> Konuklarınıza unutulmaz bir davetiye deneyimi sunun
              </p>
              <p className="leading-relaxed">
                ✓ <strong className="text-foreground">7/24 Destek:</strong> Her an yanınızdayız, sorularınızı yanıtlamaya hazırız
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Hakkimizda;
