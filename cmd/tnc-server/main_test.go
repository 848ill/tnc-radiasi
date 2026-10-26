package main

import (
	"fmt"
	"sync"
	"testing"
)

func TestConcurrentSlotBookingNeverOverbooks(t *testing.T) {
	store := NewClubStore()

	// uny-tuesday starts with 3 slots left. Fire 25 concurrent booking attempts.
	const goroutines = 25
	var wg sync.WaitGroup
	wg.Add(goroutines)

	successCount := 0
	var mu sync.Mutex

	for i := 0; i < goroutines; i++ {
		go func(idx int) {
			defer wg.Done()
			_, err := store.BookSlot(BookingRequest{
				SessionID:  "uny-tuesday",
				PlayerName: fmt.Sprintf("Player-%d", idx),
			})
			if err == nil {
				mu.Lock()
				successCount++
				mu.Unlock()
			}
		}(i)
	}

	wg.Wait()

	if successCount != 3 {
		t.Fatalf("expected exactly 3 successful bookings, got %d", successCount)
	}

	sessions := store.ListSessions()
	for _, s := range sessions {
		if s.ID == "uny-tuesday" && s.SlotsLeft != 0 {
			t.Fatalf("expected 0 slots remaining for uny-tuesday, got %d", s.SlotsLeft)
		}
	}
}
