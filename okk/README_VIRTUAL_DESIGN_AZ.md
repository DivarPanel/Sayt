# DivarPanel Virtual Design və Seçilmişlər

## Daxil edilənlər
- Müştəri üçün seçilmiş məhsullar `localStorage`-da saxlanır (`dp_favorites`). Eyni brauzerdə səhifə yenilənsə də qalır; başqa cihazlara sinxronlaşmır.
- Məhsul detalında Virtual Showroom açılır.
- 3D otaq bölməsi: hazır otaq fonları və məhsul teksturasının divar sahəsinə yerləşdirilməsi.
- Öz şəklim: müştəri otaq fotosu yükləyə və teksturanın enini, şəffaflığını, üfüqi/şaquli yerini tənzimləyə bilər.
- Canlı AR kamera: HTTPS tələb edir; kamera icazəsi verildikdə kamera axını üzərində məhsul teksturası göstərilir.
- AI üslub önizləməsi: brauzerdə tekstura/kontrast/işıq effekti simulyasiyasıdır, generativ AI xidməti deyil.

## Quraşdırma
1. `DecorConcept_GitHubPages` qovluğunun məzmununu mövcud GitHub Pages repository-nə yükləyin və faylları əvəz edin.
2. Mövcud Firebase config, Firestore kolleksiyaları və Rules dəyişdirilmir.
3. GitHub Pages HTTPS ünvanında işlədiyinə əmin olun; kamera rejimi yalnız HTTPS/localhost-da işləyir.

## Məhdudiyyətlər
Bu versiya məhsul teksturasını istifadəçinin seçdiyi sahəyə yerləşdirən vizual sınaqdır. Divar sərhədini avtomatik tanımır, perspektiv mesh-i hesablamır, fiziki ölçü/işıq simulyasiyası etmir. Fotorealistik generativ AI üçün ayrıca AI API/backend və istifadəçi razılığı tələb olunur. AR rejimi kamera axınının üzərinə 2D tekstura qoyur, tam WebXR/3D məkan izləmə deyil.

## Menyudakı istifadə bölməsi

Saytın yuxarı menyusunda **Virtual showroom** keçidi var. Bu keçid istifadə qaydası bölməsinə aparır və məhsul seçimi, otaq rejimi, panelin tənzimlənməsi və kamera rejiminin qısa izahını göstərir.

## Yoxlama qeydləri

- `catalog.js` üçün Node.js sintaksis yoxlaması uğurla keçib (`node --check`).
- `index.html` HTML parser yoxlamasından keçib.
- Menyu keçidi və istifadə təlimatı bölməsinin ID/anchor uyğunluğu yoxlanılıb.
- Kamera rejimindən çıxanda və məhsul pəncərəsini bağlayanda kamera axını dayandırılır.
- Canlı Firebase məlumatları ilə tam brauzer sınağı bu mühitdə tamamlanmayıb; yayımlandıqdan sonra Firestore qaydaları, domen icazələri və kamera HTTPS icazəsi real cihazda yoxlanmalıdır.


## Yeni inteqrasiya: Real AR və Generativ AI
Ətraflı Firebase/OpenAI quraşdırması və Android/iOS test addımları üçün `AI_AR_QURASDIRMA_AZ.md` faylına baxın. AI üçün Firebase Functions deploy, App Check site key və OPENAI_API_KEY secret tələb olunur. iPhone AR üçün hər məhsula USDZ 3D model əlavə edilməlidir.


## Pulsuz versiya
OpenAI API və Firebase Functions tələb olunmur. Foto dizayn redaktoru brauzerdə lokal kompozit edir. Android WebXR AR uyğun cihazlarda işləyir. iPhone AR üçün ayrıca USDZ model lazımdır. Təlimat: `AI_AR_QURASDIRMA_AZ.md`.
