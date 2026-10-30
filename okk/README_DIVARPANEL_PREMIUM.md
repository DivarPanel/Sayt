# DivarPanel — yenilənmiş kataloq və admin

## Yeniliklər
- Əsas səhifə brendi `DIVARPANEL` olaraq yeniləndi; mobil uyğun müasir dizayn.
- Kateqoriyalar əsas səhifədə həm sürətli düymələr, həm də seçim siyahısı ilə göstərilir.
- Əsas səhifədə Admin paneli düyməsi var (`admin.html`).
- Admin məhsul redaktəsi ayrıca pəncərə kimi açılır.
- Admin → “Kataloqda görünən məlumatlar” bölməsindən kod, qiymət və ölçünün hamı üçün göstərilməsini/gizlədilməsini idarə et.
- Məhsul redaktəsində “Seçilmiş məhsullarda göstər” seçimi var.
- Seçilmiş məhsul üçün əvvəlki qiymət və indiki qiyməti daxil et. Əvvəlki qiymət indiki qiymətdən böyükdürsə, vitrində endirimli xüsusi kart və animasiyalı qiymət vurğusu görünür.

## GitHub-a yerləşdirmə
ZIP-i açın. `DecorConcept_GitHubPages` qovluğundakı faylları GitHub repository-nin kökünə yükləyib əvvəlkilərlə əvəz edin. `firebase-config.js` faylını saxlayın; öz Firebase konfiqurasiyanızla əvəz etməyin.

## Firebase Rules
Firebase Console → Firestore Database → Rules bölməsində bu ZIP-dəki `firestore.rules` mətnini Publish edin. Yeni `settings/catalog` sənədi kataloqda kod/qiymət/ölçü görünüşünü cihazlar arasında sinxron saxlayır.

## İstifadə
1. Əsas saytda yuxarı sağdakı “Admin paneli” düyməsi ilə admin səhifəsini açın.
2. `behram.krmv.99@gmail.com` hesabı ilə daxil olun.
3. Yeni məhsul və ya mövcud məhsulun “Redaktə” düyməsi ilə pəncərəni açın.
4. Seçilmiş məhsul üçün “Seçilmiş məhsullarda göstər” işarəsini qoyun; `Əvvəlki qiymət` və `İndiki qiymət` daxil edin.
5. Kataloqda hansı məlumatların görünəcəyini ayrıca paneldə seçib “Görünüşü yadda saxla” düyməsinə basın.

Qeyd: Bu yenilənmə Firebase-də yeni `settings` kolleksiyasından istifadə edir. Rules faylı yayımlanmadan həmin parametrlərin yazılması mümkün olmayacaq. Məhsul məlumatları və mövcud kolleksiyalar silinmir.

## Gizli kataloq — Shopify-dan yenidən gələn məhsullar
- Admin panelində `Gizli kataloq · Shopify-dan gələn yeni məhsullar` bölməsi var.
- Shopify sinxronizasiyası zamanı Firestore-da olmayan məhsullar `visible:false` və `pendingReview:true` ilə yaradılır. Buna görə müştərinin əsas kataloqunda görünmür.
- Admin həmin məhsulu yoxlayıb `Yoxladım — göstər` düyməsi ilə əsas kataloqa əlavə edə bilər.
- `Gizli saxla` seçilərsə məhsul Firestore-da arxiv kimi qalır, əsas səhifədə görünmür və növbəti sinxronizasiyada avtomatik aktivləşmir.
- Shopify sinxronizasiyası GitHub Actions tərəfindən `products.json` faylını yenilədikdən sonra Admin → `Shopify-dan məhsulları gətir` düyməsi ilə işlədilir. Mövcud məhsulların kateqoriya, qiymət və görünüş seçimləri qorunur.

## Virtual Showroom (məhsulu divarda sına)
Məhsul kartına klik etdikdə açılan detallı pəncərədə **“Divarda necə görünər? — Virtual Showroom”** düyməsi var. Buradan qonaq otağı, yataq otağı və ofis fonu seçmək, öz otağınızın şəklini yükləmək, məhsul teksturasının enini, şəffaflığını və mövqeyini dəyişmək mümkündür.

Qeyd: Bu versiya brauzerdə işləyən ilkin vizual simulyasiyadır. Məhsul şəkli otaq şəklinin üzərinə tekstura kimi yerləşdirilir; avtomatik divar aşkarlanması, perspektiv uyğunlaşdırma və fotorealistik AI montajı daxil deyil. Daha real nəticə üçün növbəti mərhələdə divar sahəsinin nöqtələrlə seçilməsi və perspektiv deformasiya əlavə oluna bilər.
