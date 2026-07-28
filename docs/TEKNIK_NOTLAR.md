# Teknik Notlar ve Geliştirme Yol Haritası

## Mevcut mimari

- Arayüz: React 19 ve Next.js uyumlu App Router yapısı
- Derleme: vinext ve Vite
- Çalışma ortamı: Cloudflare Workers uyumlu ESM çıktı
- Stil: Tek bir global CSS dosyası
- Veri saklama: Yalnızca tarayıcı `localStorage`
- Sunucu/veritabanı: Kullanılmıyor

## Kaynak Excel'de tespit edilen sorunlar

İlk çalışma kitabında aşağıdaki kırılganlıklar vardı:

- Kur bilgisi başka bir çalışma kitabındaki `Sayfa1` sayfasına bağlıydı.
- Ödenen TEV araması silinmiş bir hücre aralığına başvuruyordu (`#REF!`).
- Boş satırlarda dahi yüzlerce arama formülü çalışıyordu.
- `#NAME?`, `#N/A` ve `#REF!` hataları kullanıcıya doğrudan yansıyordu.
- Giriş alanlarıyla hesaplanan alanlar görsel olarak yeterince ayrılmıyordu.
- Mobil kullanım, doğrulama özeti, taslak saklama ve dışa aktarma akışı yoktu.

Web sürümü dış çalışma kitabı bağlantılarını kaldırır ve her satırı kullanıcının açıkça girdiği değerlerle hesaplar.

## Bilinen sınırlamalar

- Döviz kuru otomatik olarak TCMB veya gümrük sisteminden alınmaz.
- Beyanname ve GTİP bilgileri harici bir sisteme bağlanmaz.
- Tarayıcılar ve cihazlar arasında taslak eşitlemesi yoktur.
- CSV dışa aktarımı vardır; doğrudan `.xlsx` üretimi yoktur.
- Kullanıcı hesabı, rol ve işlem geçmişi bulunmaz.
- Hesaplama mevzuat uygunluğu konusunda otomatik hüküm vermez.

## Önerilen sonraki geliştirmeler

1. Kur kaynağı ve tarih seçimi için güvenilir resmî servis entegrasyonu
2. GTİP ve vergi oranı referans tablosu
3. Beyanname bazlı kayıt, sürüm ve işlem geçmişi
4. Excel içe/dışa aktarma
5. Firma ve kullanıcı bazlı yetkilendirme
6. Hesaplama kuralları için birim ve uç durum testleri
7. Ondalık hassasiyeti için para hesaplama kütüphanesi
8. Değişiklik kaydı ve onay akışı

## Hesaplamada dikkat edilecek noktalar

- Kullanıcı TEV oranını yüzde olarak girer; hesaplamada `100`e bölünür.
- `Number` türü çok yüksek tutarlarda kayan nokta yuvarlama farkı oluşturabilir.
- Resmî işlemlerde kurumun kabul ettiği yuvarlama basamağı ayrıca tanımlanmalıdır.
- Negatif ödeme farkı, ödenen tutarın hesaplanan TEV'den düşük olduğunu gösterir.

