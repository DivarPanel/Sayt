# Müştəriyə xüsusi kataloq göndərmək

1. ZIP-dəki bütün faylları GitHub Pages repozitoriyasına yükləyin.
2. Firebase Console → Firestore Database → Rules bölməsində `firestore.rules` qaydalarını Publish edin.
3. Admin panelinə daxil olun. Məhsul idarəetməsi siyahısından göndərmək istədiyiniz məhsulları seçin.
4. `Müştəriyə kataloq göndər` bölməsində dizaynı, məhsul seçimini, müddəti və göstəriləcək məlumatları seçin.
5. `Seçilmiş kataloqu yarat` düyməsini basın, sonra linki kopyalayın və ya WhatsApp ilə göndərin.

Seçimlər: seçilmiş/filtrə uyğun/bütün aktiv məhsullar; kart/siyahı/kompakt dizayn; qiymət, endirim, kod, ölçü, təsvir, şəkil və WhatsApp düyməsini göstər/gizlət; müddətsiz, 1, 7, 30 və ya 90 günlük link; fərdi salamlaşma və müştəri nömrəsi.

Kataloq `sharedCatalogs` kolleksiyasında məhsul məlumatlarının anlıq surəti kimi saxlanır. Əsas məhsul sonradan dəyişsə, artıq göndərilmiş kataloq dəyişmir. Linki alan hər kəs kataloqu görə bilər. PDF üçün müştəri kataloqunda `PDF kimi saxla / Çap et` düyməsini basıb brauzerdə `Save as PDF` seçin.
