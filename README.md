# Dynamic RTD Firebase Dashboard

Dashboard ini merupakan antarmuka web modern yang dirancang untuk memantau dan mengendalikan perangkat IoT secara real-time. Proyek ini memanfaatkan integrasi Firebase Realtime Database untuk sinkronisasi data instan antara perangkat keras (hardware) dan antarmuka pengguna.
Fitur Utama

    Monitoring Real-time: Visualisasi data sensor secara instan tanpa perlu memuat ulang halaman.

    Kontrol Perangkat: Antarmuka kendali yang responsif untuk manajemen aktuator jarak jauh.

    UI/UX Modern: Desain antarmuka yang bersih, cepat, dan sepenuhnya responsif di berbagai perangkat.

    Integrasi Firebase: Sinkronisasi dua arah yang efisien menggunakan Firebase Realtime Database.

Teknologi yang Digunakan (Tech Stack)

Proyek ini dibangun menggunakan teknologi terbaru untuk memastikan performa dan pengalaman pengguna yang optimal:

    Vite: Build tool generasi berikutnya yang memberikan kecepatan pengembangan luar biasa.

    React: Library JavaScript populer untuk membangun antarmuka pengguna berbasis komponen.

    TypeScript: Memberikan keamanan tipe data untuk mengurangi kesalahan saat pengembangan.

    Tailwind CSS: Framework CSS berbasis utilitas untuk desain UI yang cepat dan fleksibel.

    shadcn/ui: Komponen UI yang dapat digunakan kembali, dibangun di atas Radix UI dan Tailwind CSS.

Cara Penggunaan

    Akses Dashboard: Buka https://iotfirebase.netlify.app/.

    Koneksi Firebase: Pastikan kredensial Firebase sudah terkonfigurasi dengan benar di dalam aplikasi agar sinkron dengan database Anda.

    Pemantauan: Data dari sensor akan muncul secara otomatis pada panel yang tersedia.

    Kendali: Gunakan komponen switch atau button dari shadcn/ui untuk mengubah status perangkat di lapangan.

Struktur Database JSON

Agar dashboard dapat berkomunikasi dengan lancar dengan perangkat IoT Anda, gunakan struktur JSON berikut pada Firebase Realtime Database:
JSON

    ```json
    {
      "monitoring": {
        "temp": 28.5,
        "hum": 60
      },
      "switch": {
        "led": true
      }
    }


Pengembangan

Jika Anda ingin menjalankan proyek ini secara lokal:

    Clone repositori.

    Jalankan npm install atau pnpm install.

    Jalankan server pengembangan dengan npm run dev.

    Build untuk produksi dengan npm run build.

Dibuat untuk mempermudah manajemen ekosistem IoT berbasis web.
