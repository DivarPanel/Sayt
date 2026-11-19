# Giriş, müştəri səbəti və admin keçidi

- Saytın ümumi menyusundan birbaşa `Admin` linki çıxarıldı.
- Hamı eyni `Giriş` düyməsindən daxil olur.
- Müştəri daxil olduqda öz hesabı və səbəti ilə işləyir.
- Səbət `customerProfiles/{uid}.cartItems` sahəsində həmin hesab üçün saxlanılır; girişdən əvvəl seçilmiş məhsullar girişdən sonra hesabın səbətinə birləşdirilir.
- Səbətdə miqdar dəyişmək, məhsul silmək və məlum qiymətlər üzrə cəmi hesablamaq mümkündür. Qiyməti olmayan məhsullar ayrıca xəbərdar edilir.
- Admin keçidi yalnız `behram.krmv.99@gmail.com` e-poçtu ilə daxil olmuş istifadəçiyə göstərilir. Bu, mövcud Firestore qaydalarındakı admin e-poçtu ilə eynidir.

## Təhlükəsizlik qeydi
Admin icazəsi istifadəçinin profilindəki `role` sahəsindən götürülmür. Firestore `isAdmin()` qaydası server tərəfdə eyni admin e-poçtunu yoxlayır. Admin səhifəsinin bütün əməliyyatları üçün bu qaydalar qüvvədə qalmalıdır.

## Yoxlama
`catalog.js` üçün `node --check` sintaksis yoxlaması aparılıb. Firebase Authentication və Firestore canlı layihədə sınaqdan keçirilməyib; yayımdan əvvəl Firebase Console-da test hesabları ilə yoxlayın.
