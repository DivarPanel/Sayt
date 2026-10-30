# DivarPanel — Pulsuz AR və foto-dizayn

## Pulsuz olanlar
- Sayt GitHub Pages-də işləyir.
- Məhsul və kateqoriyalar mövcud Firebase Firestore bazasından oxunur.
- Android Chrome-da uyğun cihazlarda WebXR immersive AR + hit-test.
- Otaq fotosu üzərində məhsul teksturasını lokal yerləşdirmək, ölçü, mövqe, şəffaflıq və filtr dəyişmək.
- Hazır kompozisiyanı PNG kimi endirmək.
- Şəkil emalı serverə göndərilmir; OpenAI API, Firebase Functions və ödənişli AI serveri tələb olunmur.

## Quraşdırma
1. ZIP-dən `DecorConcept_GitHubPages` qovluğunun məzmununu GitHub repozitoriyasına yerləşdirin.
2. GitHub Pages HTTPS linkini açın.
3. Məhsul → Virtual Showroom → Foto dizayn redaktoru.
4. Otaq şəklini seçin, sürgülərlə paneli yerləşdirin, PNG kimi yükləyin.
5. Android AR üçün uyğun ARCore cihazında Chrome açın, kamera icazəsi verin, Real AR düyməsini seçin.

## iPhone
iPhone Safari WebXR immersive AR dəstəkləmir. iPhone-da real AR üçün məhsul başına USDZ 3D model lazımdır. USDZ modeli Blender kimi pulsuz alətlərlə hazırlamaq olar, amma modelin özü hər məhsul üçün ayrıca qurulmalı və yoxlanmalıdır. USDZ olmayan məhsullarda foto-dizayn rejimindən istifadə edin.

## Məhdudiyyətlər
- Foto dizayn redaktoru generativ AI deyil; məhsul şəkli otaq fotosunun üzərinə kompozit edilir.
- Perspektiv və divar sahəsi istifadəçi tərəfindən tənzimlənir; avtomatik divar tanıma yoxdur.
- WebXR yalnız uyğun Android cihaz/brauzerdə işləyir. Hər telefon üçün zəmanət yoxdur.
- 2D məhsul fotosu öz-özünə fiziki dəqiq 3D model yaratmır.
- Üçüncü tərəf məhsul şəkillərinin canvas-a ixracı CORS icazəsindən asılıdır. İxrac bloklanarsa, şəkli eyni domenə yerləşdirmək və ya CORS icazəli mənbədən istifadə etmək lazımdır.
