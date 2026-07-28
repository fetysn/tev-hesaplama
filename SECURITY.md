# Güvenlik Politikası

## Desteklenen sürüm

Yalnızca `main` dalındaki en güncel sürüm desteklenir.

## Güvenlik açığı bildirimi

Güvenlik sorunlarını herkese açık GitHub issue olarak yayımlamayın.

Depo sahibi GitHub Security Advisories özelliğini etkinleştirdikten sonra şu yolu kullanın:

1. GitHub deposunda `Security` sekmesini açın.
2. `Advisories` bölümüne girin.
3. `Report a vulnerability` seçeneğini kullanın.

Bildirimde şu bilgileri paylaşın:

- Etkilenen sayfa veya özellik
- Sorunu yeniden oluşturma adımları
- Beklenen ve gerçekleşen sonuç
- Olası etki
- Varsa önerilen çözüm

Gerçek firma, beyanname, GTİP veya ödeme verisini bildirimlere eklemeyin. Gerekirse tamamen kurgusal örnek veri kullanın.

## Veri işleme özeti

Mevcut sürüm kullanıcı girdilerini yalnızca tarayıcıda işler. Taslaklar `localStorage` alanında tutulur ve CSV dosyaları tarayıcı içinde oluşturulur. Harici servis entegrasyonu eklenirse bu politika ve README veri akışını açıklayacak şekilde güncellenmelidir.

