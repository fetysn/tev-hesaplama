# GitHub Pages Kurulumu

Bu proje GitHub Pages için statik çıktı üretecek şekilde yapılandırılmıştır.

## GitHub'da yapılacak ayar

1. `https://github.com/fetysn/tev-hesaplama/settings/pages` adresini açın.
2. `Build and deployment` bölümündeki `Source` alanından **GitHub Actions** seçin.
3. Değiştirilen proje dosyalarını `main` dalına yükleyin.
4. `Actions` sekmesinde **GitHub Pages'e Yayınla** iş akışını açın.
5. Yeşil onay işaretini bekleyin.

Yayın tamamlandığında site adresi:

`https://fetysn.github.io/tev-hesaplama/`

## İş akışı dosyasını web arayüzünden ekleme

Noktayla başlayan `.github` klasörü sürükle-bırak ile yüklenmezse:

1. Depoda `Add file → Create new file` seçin.
2. Dosya adı alanına tam olarak `.github/workflows/deploy-pages.yml` yazın.
3. Bilgisayardaki `deploy-pages.yml` dosyasının içeriğini yapıştırın.
4. `Commit changes` düğmesine basın.

## Sorun giderme

- `Actions` sekmesi kapalıysa depo ayarlarından Actions kullanımına izin verin.
- Pages kaynağı `Deploy from a branch` değil, **GitHub Actions** olmalıdır.
- İş akışı tamamlanmadan Pages bağlantısı açılmaz.
- İlk yayın birkaç dakika sürebilir.
- Depo adı değişirse yapılandırma yeni depo adını otomatik kullanır.

