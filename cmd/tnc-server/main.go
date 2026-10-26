package main

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"sync"
	"time"
)

// Session represents a bookable TNC Yogyakarta court session (Open Play, Coaching, or Multi-Sport).
type Session struct {
	ID         string `json:"id"`
	Category   string `json:"category"`
	Title      string `json:"title"`
	Court      string `json:"court"`
	Surface    string `json:"surface"`
	NTRPLevel  string `json:"ntrpLevel"`
	StartTime  string `json:"startTime"`
	SlotsLeft  int    `json:"slotsLeft"`
	TotalSlots int    `json:"totalSlots"`
	PriceIDR   int    `json:"priceIdr"`
	PriceRange string `json:"priceRange"`
	UnitLabel  string `json:"unitLabel"`
}

// BookingRequest represents a player's request to lock a slot.
type BookingRequest struct {
	SessionID  string `json:"sessionId"`
	PlayerName string `json:"playerName"`
}

// BookingTicket represents an issued QR Court Pass and QRIS reservation.
type BookingTicket struct {
	TicketID     string    `json:"ticketId"`
	TicketType   string    `json:"ticketType"`
	SessionID    string    `json:"sessionId"`
	SessionTitle string    `json:"sessionTitle"`
	CourtSurface string    `json:"courtSurface"`
	NTRPLevel    string    `json:"ntrpLevel"`
	PlayerName   string    `json:"playerName"`
	PriceIDR     int       `json:"priceIdr"`
	PriceRange   string    `json:"priceRange"`
	QRPassHash   string    `json:"qrPassHash"`
	Status       string    `json:"status"`
	IssuedAt     time.Time `json:"issuedAt"`
}

// ClubStore manages concurrency-safe slot inventory and tickets for TNC Yogyakarta.
type ClubStore struct {
	mu       sync.RWMutex
	sessions map[string]*Session
	order    []string
	tickets  []BookingTicket
}

// NewClubStore initializes the TNC Yogyakarta court session ledger.
func NewClubStore() *ClubStore {
	initial := []*Session{
		{
			ID:         "uny-tuesday",
			Category:   "open-play",
			Title:      "UNY TUESDAY · 18:00",
			Court:      "UNY",
			Surface:    "LAPANGAN TENNIS UNY (INDOOR/OUTDOOR)",
			NTRPLevel:  "NEWBIE & BEGINNER",
			StartTime:  "SELASA · 18:00–20:00 WIB",
			SlotsLeft:  3,
			TotalSlots: 10,
			PriceIDR:   65000,
			PriceRange: "IDR 50.000 – 85.000",
			UnitLabel:  "PLAYER",
		},
		{
			ID:         "uny-friday",
			Category:   "open-play",
			Title:      "UNY FRIDAY · 20:00",
			Court:      "UNY",
			Surface:    "LAPANGAN TENNIS UNY (FLOODLIT)",
			NTRPLevel:  "NEWBIE & BEGINNER",
			StartTime:  "JUMAT · 20:00–22:00 WIB",
			SlotsLeft:  4,
			TotalSlots: 10,
			PriceIDR:   75000,
			PriceRange: "IDR 50.000 – 85.000",
			UnitLabel:  "PLAYER",
		},
		{
			ID:         "gpw-saturday",
			Category:   "open-play",
			Title:      "GPW SATURDAY · 20:00",
			Court:      "GPW",
			Surface:    "LAPANGAN TENNIS GPW (OUTDOOR)",
			NTRPLevel:  "NEWBIE & BEGINNER",
			StartTime:  "SABTU · 20:00–22:00 WIB",
			SlotsLeft:  5,
			TotalSlots: 10,
			PriceIDR:   65000,
			PriceRange: "IDR 50.000 – 85.000",
			UnitLabel:  "PLAYER",
		},
		{
			ID:         "coaching-ferio",
			Category:   "coaching",
			Title:      "COACH FERIO · CLINIC",
			Court:      "UNY",
			Surface:    "LAPANGAN TENNIS UNY · 3H + E-BOOK",
			NTRPLevel:  "NEWBIE (3–8 ORANG)",
			StartTime:  "SELASA / JUMAT · UNY",
			SlotsLeft:  3,
			TotalSlots: 8,
			PriceIDR:   85000,
			PriceRange: "IDR 85.000 – 100.000",
			UnitLabel:  "PLAYER",
		},
		{
			ID:         "coaching-gathfan",
			Category:   "coaching",
			Title:      "COACH GATHFAN · LAB",
			Court:      "JOI",
			Surface:    "JOI SPORT & SOCIAL / GPW",
			NTRPLevel:  "BEGINNER (3–8 ORANG)",
			StartTime:  "SABTU / MINGGU · JOI/GPW",
			SlotsLeft:  4,
			TotalSlots: 8,
			PriceIDR:   95000,
			PriceRange: "IDR 85.000 – 100.000",
			UnitLabel:  "PLAYER",
		},
		{
			ID:         "multisport-social",
			Category:   "multisport",
			Title:      "PADEL · YOGA · RUN",
			Court:      "JOI",
			Surface:    "JOI SPORT & SOCIAL YOGYAKARTA",
			NTRPLevel:  "ALL LEVELS WELCOME",
			StartTime:  "WEEKEND SOCIAL SESSION",
			SlotsLeft:  6,
			TotalSlots: 12,
			PriceIDR:   75000,
			PriceRange: "IDR 50.000 – 85.000",
			UnitLabel:  "PLAYER",
		},
	}

	sMap := make(map[string]*Session, len(initial))
	order := make([]string, 0, len(initial))
	for _, s := range initial {
		sMap[s.ID] = s
		order = append(order, s.ID)
	}

	return &ClubStore{
		sessions: sMap,
		order:    order,
		tickets:  make([]BookingTicket, 0),
	}
}

var (
	ErrSessionNotFound = errors.New("session not found")
	ErrSlotSoldOut     = errors.New("no slots remaining for this session")
)

// BookSlot atomically decrements the slot counter and issues a QR Court Pass.
func (cs *ClubStore) BookSlot(req BookingRequest) (BookingTicket, error) {
	cs.mu.Lock()
	defer cs.mu.Unlock()

	sess, ok := cs.sessions[req.SessionID]
	if !ok {
		return BookingTicket{}, ErrSessionNotFound
	}
	if sess.SlotsLeft <= 0 {
		return BookingTicket{}, ErrSlotSoldOut
	}

	sess.SlotsLeft--
	seq := len(cs.tickets) + 1
	ticketID := fmt.Sprintf("TNC-JGJ-%04d", 2600+seq)
	sum := sha256.Sum256([]byte(fmt.Sprintf("%s:%s:%s:%d", ticketID, sess.ID, req.PlayerName, time.Now().UnixNano())))

	ticket := BookingTicket{
		TicketID:     ticketID,
		TicketType:   "TNC_YOGYAKARTA_PASS",
		SessionID:    sess.ID,
		SessionTitle: sess.Title + " (" + sess.StartTime + ")",
		CourtSurface: sess.Surface,
		NTRPLevel:    sess.NTRPLevel,
		PlayerName:   req.PlayerName,
		PriceIDR:     sess.PriceIDR,
		PriceRange:   sess.PriceRange,
		QRPassHash:   hex.EncodeToString(sum[:8]),
		Status:       "AWAITING_WA_CONFIRMATION",
		IssuedAt:     time.Now().UTC(),
	}
	cs.tickets = append(cs.tickets, ticket)
	return ticket, nil
}

// ListSessions returns a snapshot of all sessions.
func (cs *ClubStore) ListSessions() []Session {
	cs.mu.RLock()
	defer cs.mu.RUnlock()

	out := make([]Session, 0, len(cs.order))
	for _, id := range cs.order {
		if s, ok := cs.sessions[id]; ok {
			out = append(out, *s)
		}
	}
	return out
}

// ListTickets returns the most recent issued tickets (newest first).
func (cs *ClubStore) ListTickets() []BookingTicket {
	cs.mu.RLock()
	defer cs.mu.RUnlock()

	out := make([]BookingTicket, len(cs.tickets))
	for i := range cs.tickets {
		out[i] = cs.tickets[len(cs.tickets)-1-i]
	}
	return out
}

func (cs *ClubStore) RegisterRoutes(mux *http.ServeMux, rootDir string) {
	mux.HandleFunc("GET /api/v1/health", func(w http.ResponseWriter, r *http.Request) {
		cs.mu.RLock()
		tCount := len(cs.tickets)
		cs.mu.RUnlock()

		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(map[string]any{
			"status":  "online",
			"club":    "TNC · The Nuclear Club Yogyakarta (radiasi.id)",
			"tagline": "Brew Energy, Stories and Science.",
			"engine":  "go-atomic-ticketing-jogja-v2",
			"tickets": tCount,
		})
	})

	mux.HandleFunc("GET /api/v1/config", func(w http.ResponseWriter, r *http.Request) {
		cfgPath := filepath.Join(rootDir, "data", "club-config.json")
		raw, err := os.ReadFile(cfgPath)
		if err != nil {
			http.Error(w, `{"error":"config not found"}`, http.StatusNotFound)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		_, _ = w.Write(raw)
	})

	mux.HandleFunc("GET /api/v1/sessions", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(map[string]any{
			"sessions": cs.ListSessions(),
			"tickets":  cs.ListTickets(),
		})
	})

	mux.HandleFunc("GET /api/v1/tickets", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(map[string]any{
			"tickets": cs.ListTickets(),
		})
	})

	mux.HandleFunc("POST /api/v1/bookings", func(w http.ResponseWriter, r *http.Request) {
		var req BookingRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, `{"error":"invalid JSON payload"}`, http.StatusBadRequest)
			return
		}
		if req.PlayerName == "" {
			req.PlayerName = "TNC Member Jogja"
		}
		ticket, err := cs.BookSlot(req)
		w.Header().Set("Content-Type", "application/json")
		if err != nil {
			status := http.StatusConflict
			if errors.Is(err, ErrSessionNotFound) {
				status = http.StatusNotFound
			}
			w.WriteHeader(status)
			_ = json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
			return
		}
		w.WriteHeader(http.StatusCreated)
		_ = json.NewEncoder(w).Encode(ticket)
	})

	// Serve plate and club assets and scaffold CSS so web/index.html works identically over HTTP and file://
	assetsDir := filepath.Join(rootDir, "assets")
	mux.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir(assetsDir))))

	scaffoldDir := filepath.Join(rootDir, ".impeccable", "build", "scaffold")
	mux.Handle("/.impeccable/build/scaffold/", http.StripPrefix("/.impeccable/build/scaffold/", http.FileServer(http.Dir(scaffoldDir))))

	webDir := filepath.Join(rootDir, "web")
	mux.Handle("/", http.FileServer(http.Dir(webDir)))
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	rootDir, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	store := NewClubStore()
	mux := http.NewServeMux()
	store.RegisterRoutes(mux, rootDir)

	addr := ":" + port
	log.Printf("TNC · The Nuclear Club Yogyakarta server listening on http://localhost%s", addr)
	if err := http.ListenAndServe(addr, mux); err != nil {
		log.Fatal(err)
	}
}
