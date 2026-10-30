# DecorConcept — Firebase + GitHub Pages

## Vacib konfiqurasiya
1. `firebase-config.js` faylında `BURA_REAL_API_KEY_YAZIN`, `BURA_REAL_APP_ID_YAZIN` və `behram.krmv.99@gmail.com` dəyərlərini öz Firebase Web App məlumatlarınızla əvəz edin.
2. `firestore.rules` faylında `behram.krmv.99@gmail.com` yerinə həmin admin e-poçtunu yazın.
3. Firebase Console → Authentication → Sign-in method → Email/Password aktiv edin.
4. Authentication → Users → Add user ilə admin hesabını yaradın. E-poçt ünvanı config və rules faylındakı ilə tam eyni olmalıdır. E-poçtu Firebase-də verified edin (email verification tələb olunursa).
5. Firestore Database yaradın (Production mode) və `firestore.rules` qaydalarını yayımlayın.
6. `firestore.indexes.json` indekslərini Firebase CLI ilə deploy edin: `firebase deploy --only firestore:indexes`.
7. Bütün faylları GitHub repository-nin kök qovluğuna yükləyin. GitHub Pages source `Deploy from a branch` → `main` → `/ (root)` seçilə bilər.
8. Müştəri kataloqu: `https://İSTİFADƏÇİ.github.io/REPOSITORY/`; admin: `.../admin.html`.

## Məhsulların doldurulması
Firestore-da `products` və `categories` kolleksiyaları yaradıldıqdan sonra admin panelindən kateqoriya və məhsul əlavə edin. Hazırda Shopify-dan avtomatik import/sinxronizasiya bu fayllarda aktiv deyil; mövcud Shopify JSON məlumatlarını Firestore-a import etmək üçün ayrıca etibarlı sinxronizasiya funksiyası lazımdır. Bu versiya Firestore-dakı dəyişiklikləri bütün açıq cihazlarda real vaxtda göstərir.

## Məlumat forması
`products/{id}`: `title`, `code`, `price` (rəqəm), `size`, `categoryId`, `image`, `shortDescription`, `description`, `visible` (boolean), `sortOrder` (rəqəm), `updatedAt`.
`categories/{id}`: `name`, `sortOrder`.

## Təhlükəsizlik qeydləri
- API key Firebase Web SDK üçün public config məlumatıdır; təhlükəsizlik Firestore Rules və Authentication ilə təmin edilir.
- Admin e-poçtu `firebase-config.js` və `firestore.rules` daxilində eyni olmalıdır.
- GitHub Pages-dəki `admin.html` gizli səhifə deyil; təhlükəsizlik server qaydaları ilə təmin edilir.
- Şifrəni heç vaxt JavaScript faylına yazmayın və GitHub-a yükləməyin.
- Bu sadə qaydalar e-poçt ünvanını yoxlayır. Daha güclü istehsal təhlükəsizliyi üçün admin custom claims tövsiyə olunur.

## Qeyd
Firebase layihə ID-si və messaging sender ID verilib, lakin real `apiKey`, `appId` və admin e-poçtu istifadəçi tərəfindən doldurulmalıdır. Placeholder-larla layihə işləməyəcək.
