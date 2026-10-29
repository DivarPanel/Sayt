# DecorConcept məhsul kataloqu — GitHub Pages

Bu layihə Shopify mağazasının ictimai `products.json` məlumatını avtomatik götürür və pulsuz GitHub Pages saytında göstərir. Məhsul şəkli olmayan məhsullar kataloqda göstərilmir. Kartda məhsul adı, qiyməti, kodu və qısa təsviri görünür; karta basanda tam təsvir, şəkil, ölçü barədə məlumat və WhatsApp sifariş düyməsi açılır.

**WhatsApp:** `055 203 22 71` (`https://wa.me/994552032271`)

## Avtomatik yenilənmə necə işləyir?

GitHub Actions hər 6 saatdan bir `https://decorconcept.az/products.json` ünvanından məhsulları yenidən yükləyir, səhifələnmiş nəticələri birləşdirir və kataloqu GitHub Pages-ə dərc edir. İstəsəniz, Actions bölməsindən `Update catalog and deploy GitHub Pages` işini **Run workflow** ilə dərhal başladın. GitHub-un planlaşdırılmış işləri bəzən gecikə bilər; yeni məhsul dərhal deyil, növbəti uğurlu yenilənmədə görünəcək.

> Vacib: bu üsul mağazanın ictimai Shopify JSON ünvanının açıq qalmasından asılıdır. Mağaza bu ünvanı bağlasa, məhdudlaşdırsa və ya formatı dəyişsə, avtomatik yenilənmə dayana bilər. Layihə uğursuz yenilənmədə boş kataloq dərc etməmək üçün xəta ilə dayanır.

## GitHub Pages-də pulsuz yayımlamaq

1. [github.com](https://github.com) saytına daxil olun və hesab açın / giriş edin.
2. **New repository** seçin. Ad verin, məsələn `decorconcept-kataloq`. Repository-ni **Public** seçmək ən asan seçimdir.
3. Bu ZIP faylını kompüterdə açın. ZIP-in içindəki fayl və qovluqları repository-nin **əsas səviyyəsinə** yükləyin. `index.html`, `products.json`, `scripts/` və `.github/` birbaşa əsas səviyyədə görünməlidir; iç-içə əlavə `DecorConcept_GitHubPages` qovluğu yaratmayın.
4. GitHub repository-də **Settings → Pages → Build and deployment → Source** bölməsində **GitHub Actions** seçin.
5. **Actions** bölməsinə keçin. Lazım gələrsə, workflow-lara icazə verin.
6. **Actions → Update catalog and deploy GitHub Pages → Run workflow → Run workflow** düymələrini basın.
7. İş bitdikdən sonra **Settings → Pages** bölməsində görünən sayt linkini açın. Adətən link `https://GITHUB-USERNAME.github.io/decorconcept-kataloq/` formasında olur.
8. Yeni məhsullar avtomatik çəkildiyini yoxlamaq üçün Actions bölməsində növbəti uğurlu işin bitməsini gözləyin. İstənilən vaxt `Run workflow` ilə əl ilə yeniləyə bilərsiniz.

## Layihənin faylları

- `index.html` — mobilə uyğun məhsul kataloqu, axtarış, sıralama, məhsul detalları və WhatsApp sifarişi.
- `products.json` — ilkin məhsul məlumatlarının ehtiyat nüsxəsi; ilk yayımlamada dərhal görünüş üçün daxil edilib.
- `scripts/sync_products.py` — Shopify JSON məlumatlarını səhifə-səhifə yükləyir və təkrarlanan məhsulları birləşdirir.
- `.github/workflows/deploy.yml` — avtomatik yenilənmə və GitHub Pages dərc prosesi.

## Yerli yoxlama

Kompüterdə Python quraşdırılıbsa, layihə qovluğunda terminal açıb `python -m http.server 8000` işlədin və `http://localhost:8000` ünvanını açın. Saytı birbaşa `file://` ilə açmaq əvəzinə lokal serverdən istifadə edin.

## Dəyişikliklər

- WhatsApp nömrəsini dəyişmək üçün `index.html` içində `const WA='https://wa.me/994552032271'` sətrini yeniləyin və workflow-un `push` hadisəsi ilə yenidən dərc olunmasını gözləyin.
- Məhsul mənbəyi dəyişərsə, `.github/workflows/deploy.yml` içində `SHOPIFY_PRODUCTS_URL` dəyərini və lazım gəlsə `scripts/sync_products.py` parametrini yeniləyin.
