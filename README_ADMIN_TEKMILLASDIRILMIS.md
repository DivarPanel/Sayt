# DecorConcept Admin — təkmilləşdirilmiş məhsul idarəetməsi

## Yeni imkanlar
- Məhsul adı, kodu və ID üzrə axtarış
- Kateqoriya və aktiv/gizli statusuna görə süzgəc
- Minimum və maksimum qiymət filtri
- Ad, qiymət və son dəyişiklik tarixinə görə sıralama
- Filtrə uyğun bütün məhsulları toplu seçmək
- Seçilən məhsullara kateqoriya təyin etmək
- Seçilən məhsulları toplu gizlətmək və aktivləşdirmək
- Seçim sayının canlı göstərilməsi və filtrləri sıfırlamaq
- Məhsul yaradıldıqda və redaktə, kateqoriya, status, sıralama dəyişəndə `updatedAt` və `updatedBy` sahələrinin yazılması
- Məhsul siyahısında son dəyişiklik tarixi və admin e-poçtunun göstərilməsi

## Quraşdırma
1. ZIP-i açın.
2. `DecorConcept_GitHubPages` qovluğundakı faylları GitHub repository-nizdəki eyni adlı fayllarla əvəz edin.
3. `firebase-config.js` daxilində mövcud Firebase konfiqurasiyasını saxlayın.
4. GitHub Pages yenilənəndən sonra `/admin.html` səhifəsini açın.

Firebase Rules-da `products` və `categories` üçün admin yazma icazəsi olmalıdır. Bu versiya ayrıca audit kolleksiyası yaratmır; hər məhsulun son dəyişiklik vaxtını `updatedAt`, dəyişəni isə `updatedBy` sahəsində saxlayır.
