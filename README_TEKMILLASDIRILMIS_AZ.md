# DivarPanel.az — təkmilləşdirilmiş versiya

## Edilən dəyişikliklər
- Ana səhifənin görünüşü Premium Dark Gold istiqamətində yeniləndi.
- Məhsul axtarışına ölçü sahəsi də əlavə edildi.
- Məhsul ətraflı təsvirinin göstərilməsi üçün təhlükəsiz HTML təmizlənməsi əlavə edildi.
- Admin paneldə toplu redaktə forması JavaScript ilə işlək hala gətirildi.
- Toplu dəyişikliklər Firestore `writeBatch` ilə 450 sənədlik qruplarda yazılır.
- Məhsulun silinməsi əvəzinə arxivə köçürülməsi tətbiq edildi.
- Arxiv filtri, tək məhsulu bərpa etmə və toplu arxiv/bərpa əməliyyatları əlavə edildi.
- Məhsul redaktə pəncərəsinin bağlama düyməsi görünən edildi.
- Arxivdəki məhsullar SEO aktiv məhsullar siyahısına daxil edilmir.

## Məlumatların qorunması
- `products.json`, Firebase konfiqurasiyası, Firestore qaydaları və mövcud məhsul məlumatları bu paketdə qəsdən dəyişdirilməyib.
- Arxiv funksiyası məhsul sənədini silmir; `archived: true` və `visible: false` sahələrini yazır.
- Bərpa əməliyyatı `archived: false` və `visible: true` yazır.
- Canlı Firestore bazasında əməliyyat aparılmayıb.

## Yoxlama nəticələri
- JavaScript sintaksis yoxlaması: uğurlu.
- Yeni admin elementlərinin HTML/JS uyğunluğu: yoxlanılıb.
- Arxiv, bərpa, filtr və toplu yazma mexanizmlərinin statik yoxlaması: uğurlu.
- ZIP faylının ilkin bütövlüyü: uğurlu.

## Yayımdan əvvəl
1. Bu ZIP-i əvvəlki layihənin üzərinə yazmadan əvvəl ayrıca saxlayın.
2. Firebase test layihəsində admin girişi, məhsul əlavə/redaktə, toplu redaktə, arxiv və bərpa əməliyyatlarını yoxlayın.
3. GitHub Pages-də yayımladıqdan sonra mobil və desktop brauzerlərdə yoxlayın.
4. Firebase Authentication və Firestore qaydalarının canlı layihədə düzgün yayımlandığını ayrıca təsdiqləyin.

Qeyd: Bu mühitdə canlı Firebase hesabına daxil olub real Firestore əməliyyatları və brauzer əsaslı vizual sınaq aparılmayıb. Buna görə canlı inteqrasiya təsdiqi kimi təqdim edilmir.
