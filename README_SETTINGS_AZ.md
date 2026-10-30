# DivarPanel.az — Settings bölməsi

## Quraşdırma
1. ZIP-i açın və `DecorConcept_GitHubPages` qovluğunun məzmununu GitHub Pages repozitoriyasına yükləyin.
2. Firebase Console → Firestore Database → Rules bölməsində layihədəki `firestore.rules` qaydalarını yerləşdirib Publish edin.
3. Firebase Authentication-da əsas admin hesabı (`firebase-config.js` daxilindəki ADMIN_EMAIL) aktiv olmalıdır.
4. Admin panelinə daxil olun və Settings bölməsində parametrləri doldurub yadda saxlayın.

## Firestore
- `settings/catalog`: mağaza, banner, tema, valyuta etiketi, WhatsApp şablonu, SEO, analitika və texniki fasilə parametrləri.
- `settings/adminRoles`: əlavə admin e-poçtları və nəzərdə tutulan rollar.
- `activityLogs`: admin əməliyyatlarının tarixçəsi.
- `products`, `categories`: kataloqun mövcud kolleksiyaları.

## Vacib təhlükəsizlik qeydləri
- `settings/catalog` ictimai oxunur, çünki müştəri saytı həmin parametrləri oxumalıdır. Burada parol, gizli API açarı və şəxsi məlumat saxlamayın. `settings/adminRoles` yalnız əsas adminə açıqdır.
- Admin rolları siyahısı hazırda konfiqurasiya siyahısıdır. Əlavə adminlərin real səlahiyyətlərlə giriş etməsi üçün Firebase Authentication custom claims və uyğun server tərəfli idarəetmə qurulmalıdır. Hazırkı Firestore Rules yazma hüququnu yalnız əsas adminə verir.
- Ehtiyat nüsxə brauzerə JSON kimi endirilir; avtomatik bulud backup və geri-yükləmə bu versiyaya daxil deyil.
- Valyuta seçimi yalnız valyuta işarəsini dəyişir; məzənnə ilə çevirmə aparmır.
- Google Analytics üçün real `G-...` ID, Search Console üçün isə saytınıza aid verification kodu daxil edilməlidir.
- Stokda olmayan məhsulu gizlətmə yalnız məhsulda `stock: 0` olduqda işləyir.
