# DivarPanel.az — 3D dəhliz dizayn seçimi

Admin paneldə **Sayt ayarları → Ana səhifə dizayn rejimi → Dizayn** sahəsinə üçüncü seçim əlavə edildi:

- `signature` — Signature Experience — 3 konsept
- `classic` — Klassik kataloq görünüşü
- `3d-corridor` — 3D dəhliz sərgisi — 3,2 m

Seçilmiş rejim `settings` sənədində `homeDesign` sahəsində saxlanılır.
3D sərgi parametrləri ayrıca `showroomMode`, `showroomHeightMeters` (3.2) və `showroomNavigation` (`both`) sahələrində saxlanılır.

**Vacib:** Bu yeniləmə admin seçim menyusunu və parametrlərin saxlanmasını təmin edir. 3D dəhlizin müştəri saytında faktiki render olunması üçün Three.js showroom modulunun `homeDesign === "3d-corridor"` rejiminə bağlanması ayrıca inteqrasiya mərhələsidir.
