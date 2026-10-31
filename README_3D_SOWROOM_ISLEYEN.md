# DivarPanel.az — 3D dəhliz sərgisi

Bu versiyada `homeDesign: "3d-corridor"` seçildikdə ana səhifədə Three.js əsaslı dəhliz sərgisi açılır.

- Məhsul şəkilləri Firebase `products` kolleksiyasından götürülür və 2D tekstura kimi divarlara yerləşdirilir.
- Ölçü `size` sahəsindən oxunur (məs. `122 × 280 sm`); ölçü tapılmadıqda görünüş üçün ehtiyat ölçü istifadə olunur.
- Sərgi hündürlüyü `showroomHeightMeters` parametrindən, naviqasiya `showroomNavigation` parametrindən oxunur.
- `both`: səhifəni yuxarı-aşağı sürüşdürmə ilə irəli/geri hərəkət və mouse ilə istiqamət dəyişmə; mouse wheel və ekrandakı düymələr də dəstəklənir.
- Məhsul lövhəsinə klik edildikdə mövcud məhsul detalları açılır.
- Klassik və Signature görünüşləri saxlanılır.

Three.js CDN-dən yüklənir; GitHub Pages-də işləməsi üçün internet bağlantısı lazımdır. Lokal `file://` ilə deyil, GitHub Pages və ya HTTP server üzərindən test edin.
