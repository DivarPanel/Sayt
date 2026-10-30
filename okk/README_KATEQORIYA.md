# DecorConcept — Kateqoriya idarəetməsi

Bu yenilənmədə admin panelinə toplu kateqoriya təyini əlavə edilib.

## İstifadə qaydası
1. Admin hesabı ilə `admin.html` səhifəsinə daxil olun.
2. **Kateqoriyalar** bölməsində kateqoriya adını yazıb əlavə edin (məsələn: PVC mərmər, Akustik panel, Fasad, Dekorativ profil).
3. Məhsul əlavə edərkən/redaktə edərkən **Kateqoriya** siyahısından uyğun kateqoriyanı seçin.
4. Çoxlu məhsulu eyni kateqoriyaya ayırmaq üçün **Məhsulların kateqoriyalara bölünməsi** bölməsində məhsulların yanındakı xanaları işarələyin, kateqoriya seçin və **Seçilənlərə tətbiq et** düyməsinə basın.
5. Admin panelində kateqoriya üzrə süzgəcdən istifadə edərək həmin kateqoriyadakı məhsulları göstərin.
6. Müştəri kataloqunda kateqoriya seçimi ilə məhsullar süzülür və məhsul kartında kateqoriya adı göstərilir.

## Shopify idxalı
Shopify məhsulunun `product_type` və ya `tags` dəyəri mövcud kateqoriya adına tam uyğun gəlirsə, idxal zamanı həmin kateqoriya avtomatik təyin edilir. Əks halda məhsul kateqoriyasız saxlanır və admin panelindən əl ilə təyin edilə bilər. Əvvəldən təyin edilmiş kateqoriya idxal zamanı qorunur.

## Yerləşdirmə
ZIP-i açın və içindəki `DecorConcept_GitHubPages` qovluğunun fayllarını GitHub repository-nin əsas qovluğuna yükləyib əvvəlki faylları əvəz edin. `firebase-config.js` və `firestore.rules` fayllarındakı mövcud Firebase parametrlərini dəyişməyin.
