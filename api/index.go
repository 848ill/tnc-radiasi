package handler

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"sync"
	"time"
)

type Session struct {
	ID         string `json:"id"`
	Category   string `json:"category"`
	Title      string `json:"title"`
	Court      string `json:"court"`
	Surface    string `json:"surface"`
	NTRP       string `json:"ntrp"`
	StartTime  string `json:"startTime"`
	SlotsLeft  int    `json:"slotsLeft"`
	TotalSlots int    `json:"totalSlots"`
	PriceIDR   int    `json:"priceIdr"`
	PriceLabel string `json:"priceLabel"`
	FeeLabel   string `json:"feeLabel"`
}

type BookingTicket struct {
	TicketID     string    `json:"ticketId"`
	TicketType   string    `json:"ticketType"`
	SessionID    string    `json:"sessionId"`
	SessionTitle string    `json:"sessionTitle"`
	CourtSurface string    `json:"courtSurface"`
	NTRPLevel    string    `json:"ntrpLevel"`
	PlayerName   string    `json:"playerName"`
	PriceIDR     int       `json:"priceIdr"`
	QRPassHash   string    `json:"qrPassHash"`
	Status       string    `json:"status"`
	CreatedAt    time.Time `json:"createdAt"`
}

var (
	mu       sync.RWMutex
	seq      = 8810
	sessions = []*Session{
		{
			ID:         "uny-tuesday",
			Category:   "open-play",
			Title:      "SELASA · LAP. TENNIS UNY (18:00)",
			Court:      "UNY",
			Surface:    "INDOOR & OUTDOOR · NIGHT LIGHTS",
			NTRP:       "NEWBIE & BEGINNER",
			StartTime:  "SEL · 18:00–20:00 WIB",
			SlotsLeft:  3,
			TotalSlots: 10,
			PriceIDR:   75000,
			PriceLabel: "IDR 50.000 – 85.000 / ORANG",
			FeeLabel:   "OPEN PLAY / FUN RALLY",
		},
		{
			ID:         "uny-friday",
			Category:   "open-play",
			Title:      "JUMAT · LAP. TENNIS UNY (20:00)",
			Court:      "UNY",
			Surface:    "INDOOR & OUTDOOR · NIGHT LIGHTS",
			NTRP:       "NEWBIE & BEGINNER",
			StartTime:  "JUM · 20:00–22:00 WIB",
			SlotsLeft:  4,
			TotalSlots: 10,
			PriceIDR:   75000,
			PriceLabel: "IDR 50.000 – 85.000 / ORANG",
			FeeLabel:   "OPEN PLAY / FUN RALLY",
		},
		{
			ID:         "gpw-saturday",
			Category:   "open-play",
			Title:      "SABTU · LAP. TENNIS GPW (20:00)",
			Court:      "GPW",
			Surface:    "OUTDOOR COURT · NIGHT LIGHTS",
			NTRP:       "NEWBIE & BEGINNER",
			StartTime:  "SAB · 20:00–22:00 WIB",
			SlotsLeft:  2,
			TotalSlots: 10,
			PriceIDR:   75000,
			PriceLabel: "IDR 50.000 – 85.000 / ORANG",
			FeeLabel:   "OPEN PLAY / FUN RALLY",
		},
		{
			ID:         "coaching-ferio",
			Category:   "coaching",
			Title:      "COACHING · COACH FERIO ANGGITA",
			Court:      "UNY",
			Surface:    "LAP. TENNIS UNY / JOI SPORT",
			NTRP:       "KELAS PEMULA (3–8 ORANG)",
			StartTime:  "BY SCHEDULE · YOGYAKARTA",
			SlotsLeft:  3,
			TotalSlots: 8,
			PriceIDR:   95000,
			PriceLabel: "IDR 85.000 – 100.000 / ORANG",
			FeeLabel:   "COACHING CLINIC / PEMULA",
		},
		{
			ID:         "coaching-gathfan",
			Category:   "coaching",
			Title:      "COACHING · COACH GATHFAN D.",
			Court:      "GPW",
			Surface:    "LAP. TENNIS GPW / UNY",
			NTRP:       "KELAS PEMULA (3–8 ORANG)",
			StartTime:  "BY SCHEDULE · YOGYAKARTA",
			SlotsLeft:  4,
			TotalSlots: 8,
			PriceIDR:   95000,
			PriceLabel: "IDR 85.000 – 100.000 / ORANG",
			FeeLabel:   "COACHING CLINIC / PEMULA",
		},
		{
			ID:         "multisport-social",
			Category:   "multisport",
			Title:      "JOI SPORT & SOCIAL · PADEL/TENNIS",
			Court:      "JOI",
			Surface:    "JOI SPORT AND SOCIAL · INDOOR",
			NTRP:       "ALL LEVELS · SOCIAL",
			StartTime:  "WEEKEND · YOGYAKARTA",
			SlotsLeft:  5,
			TotalSlots: 10,
			PriceIDR:   85000,
			PriceLabel: "IDR 50.000 – 85.000 / ORANG",
			FeeLabel:   "SOCIAL RALLY & COFFEE",
		},
	}
	tickets []*BookingTicket
)

func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Cache-Control", "no-store")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}

// Handler is the Vercel Serverless Go entrypoint for /api/v1/*
func Handler(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path

	switch {
	case strings.HasSuffix(path, "/health"):
		writeJSON(w, http.StatusOK, map[string]any{
			"club":      "TNC · The Nuclear Club Yogyakarta",
			"domain":    "radiasi.id",
			"tagline":   "Brew Energy, Stories and Science.",
			"reclub":    "IBBDG",
			"status":    "operational",
			"engine":    "go-1.22-serverless",
			"timestamp": time.Now().Format(time.RFC3339),
		})
	case strings.HasSuffix(path, "/sessions"):
		mu.RLock()
		defer mu.RUnlock()
		writeJSON(w, http.StatusOK, map[string]any{
			"club":     "TNC · The Nuclear Club Yogyakarta (radiasi.id)",
			"sessions": sessions,
			"tickets":  tickets,
		})
	case strings.HasSuffix(path, "/bookings") && r.Method == http.MethodPost:
		var req struct {
			SessionID  string `json:"sessionId"`
			PlayerName string `json:"playerName"`
		}
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid payload"})
			return
		}
		player := strings.TrimSpace(req.PlayerName)
		if player == "" {
			player = "MEMBER TNC YOGYAKARTA"
		}

		mu.Lock()
		defer mu.Unlock()
		for _, s := range sessions {
			if s.ID == req.SessionID {
				if s.SlotsLeft > 0 {
					s.SlotsLeft--
				}
				seq++
				tid := fmt.Sprintf("TNC-JOG-%d", seq)
				sum := sha256.Sum256([]byte(tid + "|" + s.ID + "|" + player))
				ticket := &BookingTicket{
					TicketID:     tid,
					TicketType:   "TNC YOGYAKARTA SESSION PASS",
					SessionID:    s.ID,
					SessionTitle: s.Title,
					CourtSurface: s.Surface,
					NTRPLevel:    s.NTRP,
					PlayerName:   player,
					PriceIDR:     s.PriceIDR,
					QRPassHash:   hex.EncodeToString(sum[:])[:12],
					Status:       "VERIFIED_QRIS_PASS",
					CreatedAt:    time.Now(),
				}
				tickets = append([]*BookingTicket{ticket}, tickets...)
				writeJSON(w, http.StatusCreated, ticket)
				return
			}
		}
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "session not found"})
	default:
		writeJSON(w, http.StatusOK, map[string]string{"status": "TNC Go API Ready"})
	}
}
