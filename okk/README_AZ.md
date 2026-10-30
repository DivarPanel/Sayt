# DecorConcept — Firebase + Shopify + GitHub Pages

## 1. Firebase konfiqurasiyası
- `firebase-config.js` artıq Project ID `divarpanel-22e07` və admin `behram.krmv.99@gmail.com` ilə doldurulub.
- Firebase Console → Authentication → Sign-in method → Email/Password aktiv edin.
- Authentication → Users bölməsində `behram.krmv.99@gmail.com` hesabını yaradın və e-poçtu təsdiqləyin.
- Firestore Database yaradın və `firestore.rules` məzmununu Rules bölməsində Publish edin.
- `firestore.indexes.json` üçün Firebase CLI ilə `firebase deploy --only firestore:indexes` işlədin (sadə kolleksiya sorğuları üçün indeks tələb olunmaya bilər).

## 2. GitHub Pages
Bütün faylları repository-nin kök qovluğuna yükləyin. GitHub Pages-i `main` branch və `/ (root)` üçün aktiv edin. Sayt: repository Pages URL-i; admin: həmin URL-in sonuna `admin.html`.

## 3. Shopify məhsullarını ilk dəfə Firebase-ə gətirmək
1. Admin səhifəsini açın və `behram.krmv.99@gmail.com` hesabı ilə daxil olun.
2. `Shopify-dan məhsulları gətir` düyməsini basın.
3. İdxal bitdikdən sonra kataloqu yeniləyin. Müştəri kataloqu Firestore `onSnapshot` ilə real vaxtda dəyişiklikləri alır.
4. Shopify məhsul ID-si `shopify-<id>` kimi saxlanır; yenidən idxal zamanı dublikat yaranmır. Əvvəldən təyin edilmiş `categoryId`, `visible` və `sortOrder` dəyərləri qorunur.

## 4. Vacib qeyd — Shopify CORS
İdxal düyməsi brauzerdən `https://decorconcept.az/products.json?limit=250&page=N` açıq endpoint-inə müraciət edir. Shopify serveri brauzer CORS sorğusunu bloklasa, brauzer idxalı dayandıracaq. Bu halda təhlükəsiz və etibarlı avtomatik idxal üçün GitHub Actions server-side job qurulmalıdır; bunun üçün GitHub repository Secrets-də Firebase service-account JSON saxlanmalı, heç vaxt GitHub-a adi fayl kimi commit edilməməlidir.

## 5. Məlumatlar və qorunma
- Firestore kolleksiyaları: `products`, `categories`.
- Məhsul sənədləri: `title`, `code`, `price`, `size`, `categoryId`, `image`, `shortDescription`, `description`, `visible`, `sortOrder`, `source`, `shopifyId`, `productUrl`.
- Ziyarətçilər oxuya bilər; yalnız təsdiqlənmiş `behram.krmv.99@gmail.com` hesabı yaza bilər.
- Admin parolunu heç vaxt kod fayllarına yazmayın.


## Düzəliş: məhsulların görünməməsi
`catalog.js` və `admin.js` artıq `sortOrder` sahəsi olmayan Firestore sənədlərini də oxuyur. `products/test-product` kimi sənədlər kataloqda görünməlidir. `products` və `categories` kolleksiyaları üçün Firestore Rules yayımlanmalıdır. Shopify idxalı admin panelindən əl ilə başladılır; brauzer CORS məhdudiyyəti səbəbindən işləməyə bilər. GitHub Actions-dakı mövcud JSON yenilənməsi Firestore-a yazmır.
