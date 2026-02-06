# Dynamic RTD Firebase Dashboard

Dashboard ini merupakan antarmuka web yang dirancang untuk memantau dan mengendalikan perangkat IoT secara real-time menggunakan integrasi Firebase Realtime Database. Proyek ini mempermudah visualisasi data sensor dan kontrol aktuator melalui browser.
Fitur Utama

    Monitoring Real-time: Memantau data dari sensor (seperti suhu, kelembapan, dll) yang terhubung ke Firebase secara instan.

    Kontrol Perangkat: Tombol kendali (Switch/Button) untuk menyalakan atau mematikan perangkat dari jarak jauh.

    Visualisasi Dinamis: Tampilan yang responsif dan adaptif terhadap perubahan data di database.

    Integrasi Firebase: Terhubung langsung dengan Firebase Realtime Database untuk sinkronisasi data dua arah.

Prasyarat

Sebelum menggunakan dashboard ini, pastikan Anda memiliki:

    Perangkat IoT (seperti ESP32 atau ESP8266) yang sudah terkonfigurasi dengan Firebase.

    URL Firebase Realtime Database yang aktif.

    Struktur JSON yang sesuai di Firebase agar dapat dibaca oleh dashboard.

Cara Penggunaan

    Akses Website: Buka https://iotfirebase.netlify.app/ melalui browser Anda.

    Konfigurasi Koneksi: (Jika diminta) Masukkan konfigurasi API Key atau URL Firebase Anda untuk menghubungkan dashboard dengan database pribadi.

    Memantau Data: Periksa bagian panel sensor untuk melihat nilai numerik atau grafik yang berubah secara otomatis saat ada pengiriman data dari perangkat IoT.

    Mengendalikan Perangkat: Klik pada tombol toggle atau switch yang tersedia untuk mengirimkan instruksi (misal: mengubah nilai 0 menjadi 1) ke Firebase, yang kemudian akan diterima oleh perangkat hardware Anda.

Struktur Database (Contoh)

Agar dashboard berfungsi optimal, pastikan struktur data di Firebase mengikuti pola berikut:
JSON

{
  "sensor": {
    "temperature": 25.5,
    "humidity": 60
  },
  "control": {
    "led_status": 0
  }
}

Teknologi yang Digunakan

    Web Base: Vite, TypeScript, React, shadcn-ui, Tailwind CSS

    Database: Firebase Realtime Database.

    Hosting: Netlify.

Kontribusi

Jika Anda ingin mengembangkan lebih lanjut atau menemukan bug, silakan hubungi pengembang atau lakukan pull request jika repositori tersedia secara publik.

Dokumen ini dibuat sebagai panduan dasar operasional website IoT Firebase.
