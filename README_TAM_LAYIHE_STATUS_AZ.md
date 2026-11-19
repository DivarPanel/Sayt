# DivarPanel.az — yenilənmə paketi

## Bu mərhələdə edilənlər
- Dəyişiklikdən əvvəl təqdim edilmiş orijinal ZIP, products.json, firestore.rules, firestore.indexes.json və firebase-config.js ayrıca backup qovluğuna kopyalanıb; SHA-256 manifest yaradılıb.
- Shopify fallback kataloqunda məhsullar product_type əsasında kateqoriyalara ayrılır və məhsulun bütün şəkil URL-ləri saxlanılır.
- `showAllProducts=false` olduqda featured siyahısı boşdursa məhsulların hamısının təsadüfən gizlənməsi aradan qaldırılıb.
- Admin panelinə biznes modulları üçün form/siyahı interfeysi hostu və 11 modul nişanı əlavə edilib.
- Mövcud Firestore rules faylında yeni biznes kolleksiyaları üçün artıq xüsusi qaydalar mövcud idi; bu mərhələdə həmin qaydalar dəyişdirilməyib.

## Canlı Firebase backup barədə
Bu backup yalnız təqdim edilmiş layihə arxivinin və lokal faylların surətidir. Uzaq Firestore verilənlər bazası və Firebase Storage faylları bu mühitdən ixrac edilməyib. Buna görə canlı Firebase məlumatlarının backup-ı tamamlanmış sayılmır. Qaydaları yayımlamazdan əvvəl Firebase Console-dan Firestore export və Storage backup alın.

## Hələ tamamlanmalı inteqrasiyalar
Müştəri/usta üçün ayrıca giriş və məhdud səlahiyyətli ekranlar, müştəri tərəfində xidmət sifarişi axını, endirimlərin səbətə avtomatik hesablanması, PDF generatoru, bütün səhifələr üzrə AZ/RU tərcümə, real filial/usta analitikası, email/push bildirişləri, Cloud Functions və end-to-end canlı testlər bu mərhələdə tamamlanmayıb. Admin biznes modulu CRUD interfeysidir; hər prosesin tam avtomatlaşdırılması deyil.

## Quraşdırmadan əvvəl
1. Backup qovluğundakı `BACKUP_MANIFEST.json` ilə fayl hash-lərini yoxlayın.
2. Firebase Console-da Firestore və Storage üçün ayrıca canlı backup yaradın.
3. `firestore.rules` faylını əvvəlcə test Firebase layihəsində sınaqdan keçirin.
4. GitHub Pages-ə yüklədikdən sonra brauzer konsolunu və mobil/desktop görünüşünü yoxlayın.
