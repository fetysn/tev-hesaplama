# TEV Hesap

Telafi Edici Vergi (TEV / vergi kodu 61) için satır bazında ön hesaplama, kontrol ve raporlama uygulaması.

Canlı uygulama:

- [GitHub Pages](https://fetysn.github.io/tev-hesaplama/)
- [OpenAI Sites](https://tev-hesaplama-tr.fetysn.chatgpt.site)

## Özellikler

- Birden fazla ithal girdi satırı ekleme ve silme
- Toplam CIF ($), toplam CIF (TL), ödenecek TEV ve ödeme farkını anlık hesaplama
- Firma, belge numarası ve belge tarihiyle çalışma
- Eksik alan ve eksik ödeme kontrol özeti
- Taslağı tarayıcıda yerel olarak saklama
- CSV dışa aktarma ve yazdırma
- Mobil, tablet ve masaüstü uyumlu arayüz

## Hesaplama mantığı

Uygulama her satır için aşağıdaki sırayı izler:

```text
Toplam CIF ($) = TEV'e tabi miktar × CIF birim fiyat
Toplam CIF (TL) = Toplam CIF ($) × ihraç tarihindeki kur
Ödenecek TEV (TL) = Toplam CIF (TL) × (TEV oranı / 100)
Ödeme farkı (TL) = Ödenen TEV − Ödenecek TEV
```

TEV oranı yüzde olarak girilir. Örneğin `%7,5` için alana `7,5` yazılır.

> [!IMPORTANT]
> Bu uygulama kontrol ve ön hesaplama aracıdır. Resmî beyan öncesinde sonuçlar güncel mevzuat, gümrük sistemi ve beyanname kayıtlarıyla doğrulanmalıdır.

## Yerel kurulum

Gereksinimler:

- Node.js 22.13 veya üzeri
- npm 10 veya üzeri

```bash
git clone https://github.com/KULLANICI_ADI/tev-hesap.git
cd tev-hesap
npm ci
npm run dev
```

Ardından terminalde gösterilen yerel adresi tarayıcıda açın.

### Windows PowerShell

Projedeki komutlar Unix biçimli ortam değişkeni kullandığı için PowerShell'de geliştirme sunucusu şu şekilde de başlatılabilir:

```powershell
$env:WRANGLER_LOG_PATH='.wrangler/wrangler.log'
.\node_modules\.bin\vinext.cmd dev
```

## Kalite kontrolü

```bash
npm run build
npm run lint
```

GitHub Actions, her `push` ve `pull request` işleminde projeyi otomatik olarak kurar ve derler.

## GitHub Pages yayını

`.github/workflows/deploy-pages.yml` iş akışı `main` dalına gönderilen her güncellemede statik siteyi üretir ve GitHub Pages'e yayınlar. Depoda `Settings → Pages → Source` alanı **GitHub Actions** olarak seçilmelidir.

## Proje yapısı

```text
app/
  page.tsx          Hesaplama ekranı ve istemci mantığı
  globals.css       Görsel tasarım ve duyarlı düzen
  layout.tsx        Sayfa meta verileri
public/             Statik dosyalar
tests/              Otomatik kontroller
.github/            GitHub iş akışları ve şablonlar
docs/               Aktarım ve teknik belgeler
```

## Veri ve gizlilik

- Girilen veriler bir sunucuya veya veritabanına gönderilmez.
- “Taslağı kaydet” özelliği verileri yalnızca kullanıcının tarayıcısındaki `localStorage` alanında saklar.
- CSV dosyası kullanıcının tarayıcısında oluşturulur.
- Tarayıcı verileri temizlenirse kaydedilen taslak silinebilir.

## GitHub'a aktarma

Adım adım aktarım ve uzak depo ayarları için [GitHub Aktarım Rehberi](docs/GITHUB_AKTARIM.md) belgesini kullanın.

## Katkı ve güvenlik

- Değişiklik göndermeden önce [Katkı Rehberi](CONTRIBUTING.md) belgesini okuyun.
- Güvenlik sorunlarını herkese açık issue olarak paylaşmayın; [Güvenlik Politikası](SECURITY.md) içindeki yöntemi kullanın.
- Uygulamanın sınırlamaları ve geliştirme önerileri için [Teknik Notlar](docs/TEKNIK_NOTLAR.md) belgesine bakın.

## Lisans

Bu proje izin alınmadan kopyalanamaz, dağıtılamaz veya ticari amaçla kullanılamaz. Ayrıntılar için [LICENSE](LICENSE) dosyasına bakın.
