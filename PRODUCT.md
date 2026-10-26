# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: Full-Stack Golang (`go1.27` `net/http` server di `cmd/tnc-server/main.go` untuk REST API ticketing, booking slot anti-race-condition, turnamen, membership, dan QRIS payment webhook) + Semantic Web Frontend (`web/index.html`, `web/styles.css`, `web/app.js` untuk Company Profile, Community Hub, dan Interactive Booking & QR Court Pass UI).

## Users

- **Pemain & Anggota Komunitas Tenis/Sports (TNC Members & Casual Players):** Mencari jadwal sesi main bareng (*Open Play*, *Fun Match*, *Coaching Clinic*), melihat sisa kuota slot lapangan secara real-time, memesan & membayar tiket sesi/turnamen secara instan, serta mengakses kartu member digital & e-ticket QR.
- **Peserta Turnamen & Event Komunitas:** Mendaftar secara individu atau pasangan/tim untuk turnamen TNC, memantau jadwal pertandingan, bracket, dan leaderboard komunitas.
- **Calon Member & Partner/Sponsor:** Mengenal identitas, kultur, dan aktivitas **TNC (The Nuclear Club)** melalui halaman Company Profile dan galeri komunitas di `radiasi.id`.

## Product Purpose

Mengubah `radiasi.id` menjadi platform resmi **TNC (The Nuclear Club)** — sebuah klub dan komunitas tenis & olahraga modern yang menggabungkan:
1. **Company Profile & Brand Showcase:** Menampilkan identitas klub, cerita komunitas, dokumentasi aktivitas lapangan, dan profil member.
2. **Session Booking & Ticketing Engine:** Pemesanan dan pembayaran slot sesi rutin (*Open Play*, *Coaching*, *Sparring*) maupun tiket event/turnamen dengan kuota terjamin dan e-ticket QR code.
3. **Community & Membership Hub:** Sistem tier keanggotaan (Member Card digital), direktori member, serta klasemen/bracket turnamen internal.

## Positioning

Perpaduan unik antara **prestise klub tenis klasik (*court heritage*)** dengan **energi komunitas muda yang eksplosif (*"Atomic / Nuclear Club"*)** — bukan sekadar direktori sewa lapangan generik, melainkan klub sosial-olahraga terkurasi di mana jadwal main bareng, pembayaran tiket, dan reputasi komunitas menyatu dalam satu ekosistem digital di `radiasi.id`.

## Operating Context

- Diakses terutama melalui browser mobile (saat member ingin cepat-cepat *war* slot Open Play dari grup WhatsApp/Instagram `@the.nuclearclub`) maupun desktop.
- Alur transaksi menuntut kejelasan status kuota (misal: `Sisa 3 dari 12 Slot`), pilihan level permainan (*Beginner*, *Intermediate*, *Advanced*), pembayaran cepat (QRIS / Virtual Account / E-Wallet), dan penerbitan E-Ticket QR untuk check-in di lapangan.

## Capabilities and Constraints

- **Confirmed Core Modules (Phase 1):**
  1. **Company Profile & Community Showcase:** Hero klub, tentang TNC, galeri kegiatan, daftar member & tier membership.
  2. **Booking Sesi Main Bareng (Open Play / Coaching):** Kalender jadwal sesi, filter level & lokasi lapangan, indikator kuota real-time, dan checkout slot.
  3. **Event & Tournament Ticketing:** Registrasi turnamen (individu/ganda), informasi hadiah & regulasi, bracket/leaderboard, serta e-ticket QR.
- **Technical Constraints:**
  - Domain target adalah `https://www.radiasi.id/` pada repositori baru (`/Users/hanifadam/TNC`), menggantikan total situs literasi nuklir lama menjadi 100% platform olahraga/tenis TNC.
  - Backend menggunakan **Golang (Go)** untuk menangani bisnis logika ticketing, manajemen kuota slot, dan pembayaran; Frontend menggunakan **Next.js**.
- **Undecided Product Facts:**
  - Penyedia payment gateway spesifik yang akan diaktifkan pertama kali (Midtrans vs Xendit vs manual/QRIS statis-dinamis).
  - Detail harga riil per sesi Open Play dan struktur biaya tier membership TNC.

## Brand Commitments

- **Nama Brand:** **TNC — The Nuclear Club** (diakses melalui domain `radiasi.id`, memanfaatkan diksi *Radiasi / Nuclear / Atomic* sebagai metafora energi olahraga, pukulan *nuclear serve/forehand*, dan atmosfer komunitas yang menyala).
- **Kanal Sosial Resmi:** Instagram & Threads `@the.nuclearclub`.
- **Arah Warna yang Dikunci User:** Basis **Olive Green** (`#3D4F34` / `#4A5D3F`) dipadukan dengan **Deep Court Bunker** (`#141A12`), **Warm Chalk Alabaster** (`#F5F4EE`), **Muted Sage Olive** (`#76876B`), dan aksen **Optic Tennis Volt** (`#D4E635` — warna bola tenis sekaligus aksen *atomic glow*).
- **Arah Visual & Craft Benchmark (Standing Preference):** **Modern Sports Club Standard (Canon)** dengan tolok ukur kualitas setara **Boutique Studio & Membership Club (Equinox, Barry's, Rocycle)** — tipografi editorial yang tegas dan berwibawa, disiplin grid yang tajam, dan alur *session booking / membership* yang terasa eksklusif namun instan.

## Evidence on Hand

- Domain aktif: `https://www.radiasi.id/`
- Akun komunitas aktif: `@the.nuclearclub` (Instagram & Threads).
- Belum ada foto lapangan/member riil, harga tiket riil, atau data turnamen riil di dalam repositori `/Users/hanifadam/TNC` saat ini (data contoh harus ditandai jelas sebagai simulasi/placeholder sampai aset asli dimasukkan).

## Product Principles

1. **Zero-Friction Slot Booking:** Dari melihat jadwal *Open Play* hingga mendapatkan E-Ticket QR harus bisa diselesaikan dalam hitungan detik di layar HP tanpa kebingungan sisa kuota.
2. **Club Pride & Belonging:** Setiap halaman harus membuat pengunjung merasa sedang memasuki klub tenis eksklusif namun hangat—menonjolkan kultur komunitas, member tier, dan energi pertandingan.
3. **Atomic Precision under Load:** Sistem booking dan ticketing di sisi backend (Golang) harus menjamin keakuratan kuota slot dan status pembayaran tanpa *double-booking*.
4. **Court-First Visual Clarity:** Informasi kritikal (jam main, lokasi lapangan, level pemain, sisa slot, harga tiket) harus langsung terbaca dengan kontras tajam layaknya papan skor di lapangan.
