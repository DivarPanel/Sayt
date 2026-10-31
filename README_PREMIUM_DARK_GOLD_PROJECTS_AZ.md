# DivarPanel.az — Premium Dark Gold

Bu paket DivarPanel.az saytının vahid Premium Dark Gold dizaynını və ana səhifədə layihə ideyaları bölməsini ehtiva edir.

## Ana səhifə
- Premium qara-qızılı vizual üslub.
- Hero banner / məhsul kollajı.
- Şəkilli kateqoriyalar.
- Seçilmiş məhsullar.
- Məhsul kataloqu.
- Layihə İdeyaları / Hazır işlər qalereyası.
- Məhsul detalları, AI prompt və WhatsApp sifarişi.

## Admin paneldə yeni imkanlar

### Hazır işlər və layihə ideyaları
Admin paneldə **Hazır işlər və layihə ideyaları** bölməsindən:
- Layihənin adını yaz.
- Məkan/kateqoriya qeyd et.
- İctimai şəkil URL-i əlavə et.
- Sıra nömrəsini təyin et.
- Qısa açıqlama yaz.
- Saytda göstər/gizlət.
- Mövcud layihəni redaktə et və ya sil.

Layihələr Firestore `projects` kolleksiyasında saxlanılır.

### Ana səhifə bölmələrinin idarəsi
Admin panel → Sayt ayarları:
- **Bütün məhsul kataloqunu göstər** aktivdirsə bütün aktiv məhsullar görünür.
- Bu seçim söndürülərsə, yalnız seçilmiş məhsullar görünür. Məhsulu məhsul redaktəsində “Seçilmiş məhsullarda göstər” ilə işarələ və ya `featuredProductIds` sahəsinə ID-lər əlavə et.
- **Hazır işlər / Layihə ideyaları bölməsini göstər** ilə layihə qalereyasını idarə et.
- **Kateqoriyaları göstər** ilə kateqoriya bölməsini idarə et.

Beləliklə, bütün məhsulların açıq kataloqunu göstərmək əvəzinə yalnız seçilmiş məhsulları və hazır işləri təqdim etmək mümkündür.

## Firebase
Firestore qaydalarına `projects` kolleksiyası əlavə olunub:
- İctimai oxuma.
- Yalnız əsas admin yazma/redaktə/silmə.

Quraşdırarkən `firestore.rules` faylının məzmununu Firebase Console → Firestore Database → Rules bölməsinə tətbiq edin.

## GitHub Pages
`DecorConcept_GitHubPages` qovluğunun içindəkiləri mövcud GitHub Pages repozitoriyasına yükləyin. Mövcud `firebase-config.js` faylı və layihə identifikatoru saxlanılıb.

Qeyd: Hazır işlərə əlavə edilən şəkil URL-ləri ictimai açıq olmalıdır. Canlı Firebase hesabında son yoxlama üçün admin paneldən Firebase bağlantısını test edin.
