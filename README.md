# IoT Dashboard Monitoring - Firebase

Dashboard berbasis web modern yang dirancang untuk memantau data perangkat IoT secara real-time. Proyek ini terintegrasi dengan Firebase Realtime Database untuk menyajikan data sensor secara instan dan interaktif.
🚀 Fitur Utama

    Monitoring Real-time: Visualisasi data sensor langsung dari Firebase.

    Modern UI: Menggunakan komponen dari shadcn/ui untuk antarmuka yang bersih dan profesional.

    Type Safety: Dibangun dengan TypeScript untuk pengembangan yang lebih stabil.

    Fast Performance: Menggunakan Vite sebagai build tool yang sangat cepat.

🛠️ Stack Teknologi

    Frontend Framework: React (Vite)

    Bahasa: TypeScript

    Styling: Tailwind CSS

    UI Components: shadcn/ui

    Backend/Database: Firebase (Realtime Database)

    Deployment: Netlify


⚙️ Persiapan Lokal
Prasyarat

    Node.js (disarankan versi LTS)

    NPM

Langkah Instalasi

    Clone Repository
    Bash

    git clone https://github.com/abdurrahman086/dashboard-monitoring-firebase.git
    cd dashboard-monitoring-firebase

    Instal Dependensi
    Bash

    npm install

    Konfigurasi Firebase Buat file .env.local di root folder dan masukkan kredensial Firebase Anda:
    Cuplikan kode

    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_DATABASE_URL=your_database_url
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id

    Jalankan Aplikasi
    Bash
    
    npm run dev

📖 Panduan Penggunaan

Setelah aplikasi berjalan, berikut adalah cara menggunakan dashboard untuk monitoring:
1. Menghubungkan Hardware ke Firebase

Pastikan perangkat IoT Anda (seperti ESP32 atau ESP8266) sudah dikonfigurasi untuk mengirim data ke Firebase Realtime Database pada path yang sesuai dengan aplikasi ini.

    Struktur Data: Pastikan struktur JSON di Firebase sesuai dengan yang dibaca oleh aplikasi (misalnya: /sensors/temperature, /sensors/humidity).

2. Memantau Data Real-time

    Dashboard Utama: Begitu aplikasi dibuka, widget akan otomatis menampilkan nilai terbaru dari sensor tanpa perlu me-refresh halaman.

    Indikator Status: Cek indikator status untuk memastikan koneksi antara dashboard dan Firebase sedang aktif.

3. Kontrol Perangkat (Jika Tersedia)

    Jika dashboard memiliki fitur kontrol (seperti switch relay), Anda dapat menekan tombol pada UI untuk mengubah nilai di Firebase secara instan, yang kemudian akan dibaca oleh perangkat IoT Anda.

   

🌐 Demo

Aplikasi dapat diakses secara live melalui tautan berikut:

🔗 https://iotfirebase.netlify.app/


📝 Lisensi

Proyek ini dibuat untuk tujuan pembelajaran dan pengembangan IoT. Silakan gunakan dan modifikasi sesuai kebutuhan.



