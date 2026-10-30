# DIVARPANEL — Premium Dark Gold

Bu yenilənmə əsas müştəri kataloqunun görünüşünü dəyişir. Mövcud Firebase Auth/Firestore bağlantısı, `products` və `categories` kolleksiyaları, admin səhifəsi və Shopify sinxronizasiya workflow-u saxlanılır.

## Yeniliklər
- Premium tünd fon və qızılı vurğular
- Böyük interyer banneri
- Firestore kateqoriyalarından avtomatik şəkilli kateqoriya kartları
- Seçilmiş/endirimli məhsullar vitrini
- Seçilmişlər siyahısı (hazırda həmin brauzerdə `localStorage` ilə)
- Məhsul detalları üçün geniş modal pəncərə
- Mobil ekranlara uyğun ayrıca düzülüş
- Admin panelinə keçid
- Firestore `settings/catalog` sənədindəki `showCode`, `showPrice`, `showSize` seçimlərinə uyğunluq

## Quraşdırma
1. Bu qovluqdakı faylları GitHub repository-nin kök qovluğuna yükləyin və mövcud faylları əvəz edin.
2. GitHub Pages / Actions deploy tamamlanana qədər gözləyin.
3. Saytı sərt yeniləyin: Windows `Ctrl+F5`, mobil brauzerdə səhifəni yenidən açın.
4. Firebase Rules və kolleksiyalarda dəyişiklik tələb olunmur.

## Qeyd
- Hero bannerinin interyer fotosu Unsplash CDN-dən yüklənir; internet bağlantısı tələb edir.
- Kateqoriya şəkilləri həmin kateqoriyaya aid ilk görünən məhsulun Shopify/Firebase şəkilindən götürülür.
- Bu paket virtual divar/otaq vizualizatorunu daxil etmir; bu ayrıca funksional mərhələdir.
