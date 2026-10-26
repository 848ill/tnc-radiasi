# TNC · The NUCLEAR Club Yogyakarta (`radiasi.id`)

> **“Brew Energy, Stories and Science.”** — Komunitas olahraga Tennis, Padel, Yoga & Running di Yogyakarta (Est. 2026).

## Arsitektur Proyek

- **`cmd/tnc-server/main.go`**: Server HTTP Go (Golang `net/http`) untuk *self-hosted* / Docker / Railway / Render / Cloud Run / VPS.
- **`api/index.go` & `vercel.json`**: *Serverless Go Handler* & konfigurasi *routing* untuk deployment instan di **Vercel** (mendukung *Preview/Staging* & *Production* di domain `radiasi.id`).
- **`web/`**: Frontend semantik (`index.html`, `styles.css`, `app.js`) dengan animasi **GSAP** dan simulasi lapangan 3D **Three.js**.
- **`assets/club/`**: Foto dokumentasi resmi komunitas TNC Yogyakarta dan QRIS resmi **AMONG.BREW - BEVERAGES (`NMID: ID1026508193129`)**.
- **`data/club-config.json`**: Pusat data konfigurasi jadwal, harga, coach, fasilitas, link Reclub (`IBBDG`), dan WhatsApp Admin (**Filza Nayla Haziqa — `0812-2985-8442`**).

---

## Menjalankan Secara Lokal

```bash
# Jalankan unit test Go
go test -v ./cmd/tnc-server

# Build & jalankan di http://localhost:8080
go build -o tnc-server ./cmd/tnc-server
./tnc-server
```

---

## Panduan Deployment: Staging & Production

Proyek ini mendukung **2 jalur deployment** (pilih sesuai infrastruktur `radiasi.id`):

### Opsi A — Via GitHub + Vercel (Otomatis Staging & Production)
1. Push branch `staging` -> Otomatis menghasilkan URL **Staging Preview** Vercel.
2. Merge/Push ke branch `main` -> Otomatis deploy ke **Production (`https://www.radiasi.id`)**.

### Opsi B — Via Docker Compose / VPS / Railway / Render
```bash
# Menjalankan environment Staging (Port 8081) & Production (Port 8080)
docker compose up -d --build
```
- **Staging:** `http://localhost:8081`
- **Production:** `http://localhost:8080`
