# GitHub Aktarım Rehberi

Bu belge mevcut TEV Hesap projesini yeni bir GitHub deposuna aktarma adımlarını açıklar.

## 1. GitHub'da depo oluşturun

1. [GitHub – New repository](https://github.com/new) sayfasını açın.
2. Depo adı olarak `tev-hesap` yazın.
3. Görünürlüğü seçin:
   - **Private:** Firma içi kullanım için önerilir.
   - **Public:** Kaynak kodu herkes görebilir.
4. `Add a README`, `.gitignore` ve lisans seçeneklerini işaretlemeyin. Bu dosyalar projede zaten mevcut.
5. `Create repository` düğmesine basın.

## 2. Mevcut projeyi GitHub'a bağlayın

Proje klasöründe aşağıdaki komutları çalıştırın. `KULLANICI_ADI` kısmını GitHub kullanıcı veya organizasyon adınızla değiştirin.

```bash
git remote -v
git remote add github https://github.com/KULLANICI_ADI/tev-hesap.git
git push -u github main
```

`github` adında bir uzak bağlantı zaten varsa:

```bash
git remote set-url github https://github.com/KULLANICI_ADI/tev-hesap.git
git push -u github main
```

> [!TIP]
> GitHub parola ile Git işlemlerini kabul etmez. Tarayıcı oturumu kullanan GitHub Desktop, Git Credential Manager veya kişisel erişim anahtarı kullanın.

## 3. Depo ayarlarını tamamlayın

GitHub deposunda şu ayarlar önerilir:

- `Settings → General → Default branch`: `main`
- `Settings → Branches → Add branch protection rule`: `main`
- Birleştirmeden önce pull request zorunluluğu
- GitHub Actions kontrolünün başarılı olma zorunluluğu
- En az bir onay zorunluluğu (ekip kullanımı varsa)
- Doğrudan `main` dalına zorla gönderimi engelleme

## 4. Depo bilgilerini düzenleyin

Depo ana sayfasındaki **About** bölümünde:

- Description: `Telafi Edici Vergi hesaplama ve kontrol uygulaması`
- Website: `https://tev-hesaplama-tr.fetysn.chatgpt.site`
- Topics: `tev`, `gumruk`, `vergi`, `nextjs`, `typescript`, `cloudflare`

## 5. İlk kontrol

Aktarım sonrası aşağıdakileri doğrulayın:

- README depo ana sayfasında doğru görünüyor.
- `Actions` sekmesindeki `CI` iş akışı başarıyla tamamlanıyor.
- `node_modules`, `dist`, `.wrangler` ve çalışma dosyaları depoya eklenmemiş.
- `.openai/hosting.json` içinde gizli anahtar veya parola yok.
- Canlı site bağlantısı çalışıyor.

## Sonraki güncellemeler

Önerilen çalışma şekli:

```bash
git switch -c ozellik/kisa-aciklama
# Değişiklikleri yapın
git add .
git commit -m "feat: kısa açıklama"
git push -u github ozellik/kisa-aciklama
```

Ardından GitHub üzerinden `main` dalına bir Pull Request açın.

