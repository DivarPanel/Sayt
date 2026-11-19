# DivarPanel.az — Biznes modulları (AZ)

Bu paket əvvəlki layihənin üzərində hazırlanıb. `products.json`, məhsul/kateqoriya faylları, şəkillər, mövcud sayt və mövcud Firebase layihə identifikatoru saxlanılıb.

## Yeni admin bölməsi
`admin.html` daxilində **CRM · Filial · Xidmət · AZ/RU** bölməsi əlavə olunub. `business-modules.js` aşağıdakı Firestore kolleksiyaları üçün yaratma, siyahılama, redaktə və arxivləmə interfeysi verir:

- `branches` — filiallar
- `masters` — ustalar
- `serviceTypes` — xidmət növləri
- `serviceOrders` — xidmət sifarişləri
- `orders` — sifarişlər
- `quotes` — qiymət təklifləri
- `discountRules` — endirim qaydaları
- `translations` — AZ/RU tərcümə açarları
- `wishlists` — müştəri seçim siyahıları
- `customerRequests` — müraciətlər
- `customerNotifications` — bildirişlər

Qeydlər silinmir, arxiv statusuna keçirilir. İdarəetmə bölməsi yalnız `behram.krmv.99@gmail.com` admin hesabı ilə yüklənir.

## Quraşdırma
1. Mövcud saytı dəyişməzdən əvvəl Firebase Console-dan Firestore məlumatlarını və Storage fayllarını ayrıca ixrac edin.
2. Bu qovluğun fayllarını GitHub Pages repozitoriyasına yükləyin; `products.json` və şəkillər qovluqlarını silməyin.
3. Firebase Console → Firestore Database → Rules bölməsində `firestore.rules` məzmununu nəzərdən keçirib yayımlayın.
4. Authentication-də admin e-poçtunun mövcud olduğunu və Email/Password girişinin aktiv olduğunu yoxlayın.
5. Saytı admin hesabı ilə açıb hər kolleksiyada test qeydi yaradın, redaktə edin və arxivləyin.

## Vacib texniki sərhədlər
- Bu paket yeni admin CRUD interfeysini və Firestore kolleksiya qaydalarının başlanğıcını əlavə edir; bu, bütün biznes proseslərinin tam avtomatlaşdırılması demək deyil.
- Müştəri tərəfində xidmət sifarişi forması, usta üçün ayrıca giriş/yalnız ona təyin edilmiş işlər ekranı, e-poçt/SMS göndərişi, real PDF generatoru, endirimlərin səbətə avtomatik hesablanması, tam AZ/RU sayt tərcüməsinin bütün səhifələrə tətbiqi və filial üzrə maliyyə hesabatları bu paketdə tam inteqrasiya edilməyib.
- `customerUid` tələb edən müştəri qeydlərində müştəri UID-si yazılmalıdır; admin tərəfindən yaradılan qeydlərdə də sonradan müştəriyə bağlamaq üçün UID sahəsi əlavə edilməlidir.
- Firestore qaydalarını canlı məlumatlarda tətbiq etməzdən əvvəl ayrıca test Firebase layihəsində yoxlamaq tövsiyə olunur. Qaydalar yanlış tətbiq olunarsa mövcud saytın bəzi sorğuları bloklana bilər.
- Admin e-poçtuna əsaslanan giriş mövcud layihənin modelini qoruyur; istehsal səviyyəli rol/filial icazələri üçün server-side custom claims və ya Cloud Functions əsaslı yoxlama ayrıca qurulmalıdır.
