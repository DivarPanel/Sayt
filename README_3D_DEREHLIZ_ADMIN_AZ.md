# 3D dəhliz sərgisi — Admin parametrləri

Admin panel → Sayt ayarları bölməsində yeni **3D dəhliz sərgisi** idarəetməsi əlavə edilib.

Saxlanılan Firestore sahələri (`settings/catalog`):
- `showroomMode`: `3d-corridor` və ya `classic`
- `showroomHeightMeters`: rəqəm, standart `3.2`
- `showroomNavigation`: `both`, `scroll` və ya `mouse`

Admin parametrləri Firebase Firestore-a `saveAllSettings` düyməsi ilə yazılır.
Bu yeniləmə admin interfeysini və konfiqurasiyanın saxlanmasını əlavə edir. Canlı saytda 3D dəhlizin faktiki render olunması üçün `index.html`/showroom modulunun bu sahələri oxuyub kamera və səhnə davranışına tətbiq etməsi ayrıca inteqrasiya mərhələsidir.

Mövcud məhsul, kateqoriya, müştəri kataloqu və Firebase məlumatları saxlanılır.
