# Müştərinin şəxsi səbət linki

- Müştəri ad, soyad, telefon, e-poçt və şifrə ilə qeydiyyatdan keçir; sonrakı giriş e-poçt/şifrə ilədir.
- Məhsul pəncərəsində say seçib “Səbətə əlavə et” düyməsini basır.
- “Səbətim” bölməsində sayları dəyişir və məhsulları silə bilir.
- “Şəxsi sifariş linki yarat və paylaş” unikal, 30 gün müddətli link yaradır.
- Linki WhatsApp, e-poçt və digər tətbiqlərlə paylaşmaq mümkündür; uyğun brauzerdə link kopyalanır.
- Müştəriyə aid məlumatlar Firestore `cartShares` kolleksiyasında saxlanılır.

## Firebase-də vacib addım
`firestore.rules` faylındakı qaydaları Firebase Console → Firestore Database → Rules bölməsinə dərc edin. Qaydalar dərc edilmədən paylaşım linkinin oxunması/yazılması işləməyəcək. Firebase Authentication-də Email/Password provayderi aktiv olmalıdır.

## Qeyd
Link sifariş sorğusudur, ödəniş və ya təsdiqlənmiş sifariş deyil. Qiyməti olmayan məhsul üçün qiymət təkliflə dəqiqləşdirilir. Link 30 gündən sonra etibarsız sayılır.
