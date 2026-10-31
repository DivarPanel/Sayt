# DivarPanel.az — GitHub Pages-də avtomatik sitemap (domen dəyişmədən)

Bu variant GitHub Pages hostinqini və `divarpanel.az` domenini saxlayır. `sitemap.xml` GitHub Actions tərəfindən Firestore-dan yenidən yaradılır və eyni GitHub Pages saytına yerləşdirilir.

## Sabit sitemap ünvanı

`https://divarpanel.az/sitemap.xml`

Google Search Console-a bu ünvanı bir dəfə əlavə edin. Link dəyişməyəcək.

## Yenilənmə qaydası

- GitHub Actions hər 15 dəqiqədən bir Firestore-dakı məhsulları yoxlayır və sitemap-i yenidən yaradır.
- Məhsulda `seoEnabled: true` və `visible` false olmayan halda URL sitemap-ə daxil olur.
- SEO söndürüləndə və ya məhsul gizlədiləndə növbəti avtomatik yenilənmədə çıxarılır.
- Kataloq ana səhifəsi yalnız `settings/catalog.catalogSeoEnabled === true` olduqda daxil edilir.
- Məhsul redaktə edildikdən sonra ən gec növbəti planlı icrada (təxminən 15 dəqiqə) sitemap yenilənir. GitHub Actions planlı icraları bəzən gecikdirə bilər.

## Quraşdırma

1. Bu ZIP-dəki `DecorConcept_GitHubPages` qovluğunun məzmununu mövcud GitHub repository-nin kökünə köçürün. Əvvəlki faylların ehtiyat nüsxəsini saxlayın.
2. GitHub repository-də **Settings → Pages** bölməsinə daxil olun.
3. **Build and deployment → Source** seçimini **GitHub Actions** edin (əgər artıq belədirsə, dəyişməyin).
4. Dəyişiklikləri `main` branch-ə göndərin.
5. Repository-də **Actions** bölməsini açın və “Refresh sitemap and deploy GitHub Pages” workflow-unun uğurla bitməsini gözləyin.
6. `https://divarpanel.az/sitemap.xml` ünvanını açaraq XML-in göründüyünü yoxlayın.
7. Google Search Console → Sitemaps bölməsində `sitemap.xml` göndərin. Əvvəldən əlavə etmisinizsə, yenidən göndərmək lazım deyil.

## Təhlükəsizlik və şərtlər

- Admin/service-account açarı GitHub-a və brauzer koduna əlavə edilmir.
- Script yalnız Firestore-un mövcud public-read qaydaları ilə açıq oxuna bilən `products` kolleksiyasını və `settings/catalog` sənədini oxuyur. Bu qaydalar bağlıdırsa, workflow Firestore 403 xətası verəcək; qaydaları zəiflətməyin, əvvəlcə oxu siyasətini yoxlayın.
- GitHub Actions cron-u dəqiq real vaxt zəmanəti vermir; təxminən 15 dəqiqəlik dövrlə işləyir.
- Bu ZIP domen DNS-ni, domen adını və hostinqi dəyişmir. DNS parametrlərinə toxunmaq lazım deyil.
- GitHub Actions ilk dəfə işləyəndən sonra `sitemap.xml` repository-yə ayrıca commit olunmur; deploy olunan Pages artefaktında yaradılır.
