# DecorConcept düzəlişi

1. ZIP daxilindəki faylları GitHub repository-nin kökünə yerləşdirin; `.github` qovluğunu da saxlayın.
2. GitHub Pages deployment uğurla bitdikdən sonra əsas səhifədə Firestore `products/test-product` görünməlidir. Test sənədində `sortOrder` olmasa da artıq oxunur.
3. Admin hesabı ilə `admin.html`-ə daxil olun. Firebase Authentication Email/Password aktiv və Firestore qaydaları yayımlanmış olmalıdır.
4. `Shopify-dan məhsulları gətir` düyməsi artıq eyni GitHub Pages saytındakı `products.json` faylını oxuyur; brauzer CORS məhdudiyyətindən yan keçir.
5. GitHub Actions hər 6 saatda JSON faylını yeniləyir. **Firestore-a avtomatik yazma hələ qurulmayıb**: JSON yeniləndikdən sonra admin idxal düyməsini yenidən basmalıdır. Tam avtomatik Firestore idxalı üçün təhlükəsiz server səlahiyyətləri və ayrıca workflow lazımdır.
6. Admin idxalı zamanı mövcud məhsulların `visible`, `categoryId`, `size`, `sortOrder` dəyərləri saxlanır.
7. Adminin `permission-denied` xətası alması halında Authentication e-poçt təsdiqini və `firestore.rules` faylındakı admin e-poçtunu yoxlayın.
8. `products.json` daxilindəki məhsulların hamısını birdən yazmaq Firestore-un pulsuz kvotasına təsir edə bilər.
