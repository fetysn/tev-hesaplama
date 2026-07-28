# Katkı Rehberi

TEV Hesap projesine katkıda bulunmadan önce bir issue açarak öneriyi ve kullanım senaryosunu açıklayın.

## Geliştirme akışı

1. Depoyu fork edin veya yeni bir özellik dalı açın.
2. Değişikliği küçük ve tek amaçlı tutun.
3. Türkçe alan adlarını ve hesaplama terimlerini mevcut arayüzle tutarlı kullanın.
4. Hesaplama mantığı değişiyorsa formülü, örnek girdiyi ve beklenen sonucu belgeleyin.
5. Derleme ve kalite kontrollerini çalıştırın.
6. Pull Request şablonundaki kontrol listesini tamamlayın.

```bash
npm ci
npm run build
npm run lint
```

## Commit biçimi

Kısa ve açıklayıcı Conventional Commits biçimi önerilir:

- `feat: csv dışa aktarmaya toplam satırı ekle`
- `fix: virgüllü oran girişini doğru hesapla`
- `docs: kurulum rehberini güncelle`
- `test: tev hesaplama uç durumlarını ekle`

## Pull Request beklentileri

- Değişikliğin amacı ve kullanıcı etkisi açıklanmalıdır.
- Arayüz değişikliklerinde ekran görüntüsü eklenmelidir.
- Hesaplama değişikliklerinde örnek sonuç verilmelidir.
- Kişisel veri, gerçek beyanname numarası veya gizli firma bilgisi eklenmemelidir.
- Yeni bağımlılıkların gerekçesi açıklanmalıdır.

## Kod ilkeleri

- Erişilebilir form etiketlerini ve klavye kullanımını koruyun.
- Mobil görünümü bozmayın.
- Hesaplama formülünü tek ve izlenebilir bir yerde tutun.
- Harici veri kaynakları için hata, zaman aşımı ve kaynak tarihi gösterin.
- Kullanıcı verisini açık onay olmadan sunucuya göndermeyin.

