(function () {
  'use strict';

  /* ==========================================================================
     1. OFFICIAL TNC YOGYAKARTA SESSION & COURT DATA MODEL
        (Synced with Go /api/v1/sessions & data/club-config.json)
     ========================================================================== */
  const WA_ADMIN_NUMBER = '6281229858442'; // Filza Nayla Haziqa (081229858442)
  const RECLUB_URL = 'https://reclub.co/clubs/@the-nuclear-club-tnc';

  const SESSIONS = {
    'open-play': [
      {
        id: 'uny-tuesday',
        title: 'SELASA · LAP. TENNIS UNY (18:00)',
        court: 'UNY',
        surface: 'INDOOR & OUTDOOR · NIGHT LIGHTS',
        ntrp: 'NEWBIE & BEGINNER',
        startTime: 'SEL · 18:00–20:00 WIB',
        slotsLeft: 3,
        totalSlots: 10,
        barPct: 70,
        priceIDR: 75000,
        priceLabel: 'IDR 50.000 – 85.000 / ORANG',
        feeLabel: 'OPEN PLAY / FUN RALLY',
        serial: 'QRIS AMONG.BREW',
        subSerial: 'NMID: ID1026508193129 · RECLUB IBBDG'
      },
      {
        id: 'uny-friday',
        title: 'JUMAT · LAP. TENNIS UNY (20:00)',
        court: 'UNY',
        surface: 'INDOOR & OUTDOOR · NIGHT LIGHTS',
        ntrp: 'NEWBIE & BEGINNER',
        startTime: 'JUM · 20:00–22:00 WIB',
        slotsLeft: 4,
        totalSlots: 10,
        barPct: 60,
        priceIDR: 75000,
        priceLabel: 'IDR 50.000 – 85.000 / ORANG',
        feeLabel: 'OPEN PLAY / FUN RALLY',
        serial: 'QRIS AMONG.BREW',
        subSerial: 'NMID: ID1026508193129 · RECLUB IBBDG'
      },
      {
        id: 'gpw-saturday',
        title: 'SABTU · LAP. TENNIS GPW (20:00)',
        court: 'GPW',
        surface: 'OUTDOOR COURT · NIGHT LIGHTS',
        ntrp: 'NEWBIE & BEGINNER',
        startTime: 'SAB · 20:00–22:00 WIB',
        slotsLeft: 2,
        totalSlots: 10,
        barPct: 80,
        priceIDR: 75000,
        priceLabel: 'IDR 50.000 – 85.000 / ORANG',
        feeLabel: 'OPEN PLAY / FUN RALLY',
        serial: 'QRIS AMONG.BREW',
        subSerial: 'NMID: ID1026508193129 · RECLUB IBBDG'
      }
    ],
    coaching: [
      {
        id: 'coaching-ferio',
        title: 'COACHING · COACH FERIO ANGGITA',
        court: 'UNY',
        surface: 'LAP. TENNIS UNY / JOI SPORT',
        ntrp: 'KELAS PEMULA (3–8 ORANG)',
        startTime: 'BY SCHEDULE · YOGYAKARTA',
        slotsLeft: 3,
        totalSlots: 8,
        barPct: 62,
        priceIDR: 95000,
        priceLabel: 'IDR 85.000 – 100.000 / ORANG',
        feeLabel: 'COACHING CLINIC / PEMULA',
        serial: 'COACH FERIO ANGGITA',
        subSerial: 'FUNDAMENTAL · E-BOOK · RACKET RENTAL'
      },
      {
        id: 'coaching-gathfan',
        title: 'COACHING · COACH GATHFAN D.',
        court: 'GPW',
        surface: 'LAP. TENNIS GPW / UNY',
        ntrp: 'KELAS PEMULA (3–8 ORANG)',
        startTime: 'BY SCHEDULE · YOGYAKARTA',
        slotsLeft: 4,
        totalSlots: 8,
        barPct: 50,
        priceIDR: 95000,
        priceLabel: 'IDR 85.000 – 100.000 / ORANG',
        feeLabel: 'COACHING CLINIC / PEMULA',
        serial: 'COACH GATHFAN DARMAWAN',
        subSerial: 'RALLY DRILL · POST-GAME CONSULTATION'
      }
    ],
    multisport: [
      {
        id: 'yoga-nov-01',
        title: 'YOGA AT THE COURT · 1 NOV',
        court: 'JOI',
        surface: 'JOI SPORTS & SOCIAL · COACH NILA',
        ntrp: 'BEGINNER FRIENDLY · 200-HR CYT',
        startTime: 'MINGGU 1 NOV · 06:45 WIB',
        slotsLeft: 30,
        totalSlots: 30,
        barPct: 20,
        priceIDR: 75000,
        priceLabel: 'EARLY BIRD IDR 75.000',
        feeLabel: 'WOMEN OF NUCLEAR × TNC YOGA',
        serial: 'QRIS AMONG.BREW',
        subSerial: 'HANYA 30 SPOTS · WA +62 851-5771-9823'
      },
      {
        id: 'multisport-social',
        title: 'JOI SPORT & SOCIAL · PADEL/TENNIS',
        court: 'JOI',
        surface: 'JOI SPORT AND SOCIAL · INDOOR',
        ntrp: 'ALL LEVELS · SOCIAL',
        startTime: 'WEEKEND · YOGYAKARTA',
        slotsLeft: 5,
        totalSlots: 10,
        barPct: 50,
        priceIDR: 85000,
        priceLabel: 'IDR 50.000 – 85.000 / ORANG',
        feeLabel: 'SOCIAL RALLY & COFFEE',
        serial: 'JOI SPORT & SOCIAL',
        subSerial: 'INDOOR · COFFEE SHOP · DOKUMENTASI'
      },
      {
        id: 'padel-yoga-run',
        title: 'TNC YOGA & RUNNING SOCIAL',
        court: 'JOI',
        surface: 'YOGYAKARTA SOCIAL TRACK & STUDIO',
        ntrp: 'ALL LEVELS · COMMUNITY',
        startTime: 'MINGGU PAGI · YOGYAKARTA',
        slotsLeft: 6,
        totalSlots: 12,
        barPct: 50,
        priceIDR: 50000,
        priceLabel: 'IDR 50.000 / ORANG',
        feeLabel: 'COMMUNITY SESSION',
        serial: 'BREW ENERGY & STORIES',
        subSerial: 'KOPI SUSU · DOKUMENTASI · NETWORKING'
      }
    ]
  };

  let currentCategory = 'open-play';
  let selectedIndex = 0;
  let issuedTickets = [];
  let activeModalTicket = null;

  function formatIDR(amount) {
    return 'IDR ' + Number(amount || 0).toLocaleString('id-ID');
  }

  function buildWhatsAppConfirmationURL(playerName, sessionTitle, ticketId) {
    const msg =
      'Halo Admin TNC (Kak Filza), saya ingin konfirmasi pendaftaran & bukti transfer QRIS The NUCLEAR Club:\n\n' +
      '• Nama Pemain: ' + (playerName || 'Member TNC') + '\n' +
      '• Sesi: ' + (sessionTitle || 'Open Play Tennis') + '\n' +
      '• Pass ID: #' + (ticketId || 'TNC-PASS') + '\n' +
      '• Reclub Code: IBBDG\n\n' +
      'Berikut saya lampirkan bukti pembayaran QRIS AMONG.BREW. Terima kasih!';
    return 'https://wa.me/' + WA_ADMIN_NUMBER + '?text=' + encodeURIComponent(msg);
  }

  /* ==========================================================================
     2. HERO BOOKING CONSOLE SYNCHRONIZATION (With GSAP Transitions)
     ========================================================================== */
  function syncHeroCards(animateBars) {
    const list = SESSIONS[currentCategory] || SESSIONS['open-play'];
    const s1 = list[0];
    const s2 = selectedIndex >= 2 && list[selectedIndex] ? list[selectedIndex] : (list[1] || list[0]);

    const t1 = document.getElementById('hero-title-1');
    const sl1 = document.getElementById('hero-slots-1');
    const b1 = document.getElementById('hero-bar-1');
    const c1 = document.getElementById('hero-card-1');

    const t2 = document.getElementById('hero-title-2');
    const sl2 = document.getElementById('hero-slots-2');
    const b2 = document.getElementById('hero-bar-2');
    const c2 = document.getElementById('hero-card-2');

    if (t1 && s1) {
      t1.textContent = s1.title;
      sl1.textContent = s1.slotsLeft > 0 ? s1.slotsLeft + ' SLOTS LEFT' : 'FULL SLOT';
      c1.classList.toggle('is-selected', selectedIndex === 0);
      if (window.gsap && animateBars) {
        window.gsap.to(b1, { width: s1.barPct + '%', duration: 0.45, ease: 'expo.out' });
      } else {
        b1.style.width = s1.barPct + '%';
      }
    }

    if (t2 && s2) {
      t2.textContent = s2.title;
      sl2.textContent = s2.slotsLeft > 0 ? s2.slotsLeft + ' SLOTS LEFT' : 'FULL SLOT';
      c2.classList.toggle('is-selected', selectedIndex >= 1);
      if (window.gsap && animateBars) {
        window.gsap.to(b2, { width: s2.barPct + '%', duration: 0.45, ease: 'expo.out' });
      } else {
        b2.style.width = s2.barPct + '%';
      }
    }

    const active = list[selectedIndex] || s1;
    if (!active) return;

    const priceEl = document.getElementById('selected-session-price');
    const labelEl = document.getElementById('selected-pass-label');
    const serialEl = document.getElementById('qr-pass-serial');
    const subSerialEl = document.getElementById('qr-pass-sub');
    const surfacePill = document.getElementById('hero-surface-pill');
    const timePill = document.getElementById('hero-time-pill');
    const telemetryText = document.getElementById('hero-telemetry-text');
    const mobileTitleEl = document.getElementById('mobile-sticky-title');
    const mobileSubEl = document.getElementById('mobile-sticky-sub');

    if (priceEl) priceEl.textContent = active.priceLabel;
    if (labelEl) labelEl.textContent = active.feeLabel;
    if (serialEl) serialEl.textContent = active.serial;
    if (subSerialEl) subSerialEl.textContent = active.subSerial;
    if (surfacePill) surfacePill.textContent = active.surface;
    if (timePill) timePill.textContent = active.startTime;
    if (telemetryText) telemetryText.textContent = active.title + ' WIB';
    if (mobileTitleEl) mobileTitleEl.textContent = active.title;
    if (mobileSubEl) mobileSubEl.textContent = active.priceLabel + ' · ' + active.slotsLeft + ' SLOTS LEFT';
  }

  function findSessionById(id) {
    for (const cat of Object.keys(SESSIONS)) {
      for (const s of SESSIONS[cat]) {
        if (s.id === id) return s;
      }
    }
    return null;
  }

  function updateLedgerRowUI(sessionId, slotsLeft, totalSlots) {
    const slotSpan = document.querySelector('[data-ledger-slots="' + sessionId + '"]');
    const barEl = document.querySelector('[data-ledger-bar="' + sessionId + '"]');
    if (slotSpan) {
      const total = totalSlots || parseInt(slotSpan.getAttribute('data-total') || '10', 10);
      slotSpan.textContent = slotsLeft + ' / ' + total + ' SLOTS LEFT';
      if (barEl) {
        const filledPct = Math.min(100, Math.round(((total - slotsLeft) / total) * 100));
        barEl.style.width = filledPct + '%';
      }
    }
  }

  /* ==========================================================================
     3. MODAL CONTROLLER & PNG PASS EXPORTER
     ========================================================================== */
  function openPassModal(ticket) {
    activeModalTicket = ticket;
    const modal = document.getElementById('pass-modal');
    if (!modal) return;

    document.getElementById('modal-pass-type').textContent = ticket.ticketType || 'OFFICIAL QRIS COURT PASS';
    document.getElementById('modal-pass-title').textContent = 'TNC PASS · #' + ticket.ticketId;
    document.getElementById('modal-pass-hash').textContent = 'NMID: ID1026508193129 · RECLUB: IBBDG';
    document.getElementById('modal-player-name').textContent = (ticket.playerName || 'TNC YOGYAKARTA MEMBER').toUpperCase();
    document.getElementById('modal-session-title').textContent = ticket.sessionTitle || 'SELASA · LAPANGAN TENNIS UNY · 18:00';
    document.getElementById('modal-surface-tier').textContent = (ticket.courtSurface || 'LAPANGAN TENNIS UNY') + ' · ' + (ticket.ntrpLevel || 'NEWBIE & BEGINNER');
    document.getElementById('modal-price-val').textContent = formatIDR(ticket.priceIdr) + ' · SCAN QRIS AMONG.BREW';

    const waBtn = document.getElementById('modal-wa-admin-btn');
    if (waBtn) {
      waBtn.href = buildWhatsAppConfirmationURL(ticket.playerName, ticket.sessionTitle, ticket.ticketId);
    }

    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');

    if (window.gsap) {
      window.gsap.fromTo(
        '.pass-modal-dialog',
        { y: 24, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'expo.out' }
      );
    }
  }

  function closePassModal() {
    const modal = document.getElementById('pass-modal');
    if (!modal) return;
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
  }

  function downloadCourtPassPNG(ticket) {
    if (!ticket) return;
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 420;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#121E13';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#D1E432';
    ctx.lineWidth = 3;
    ctx.strokeRect(14, 14, canvas.width - 28, canvas.height - 28);

    ctx.fillStyle = '#D1E432';
    ctx.font = '700 14px Archivo, sans-serif';
    ctx.fillText('TNC · THE NUCLEAR CLUB YOGYAKARTA · BREW ENERGY, STORIES AND SCIENCE', 38, 50);

    ctx.fillStyle = '#F0F2E6';
    ctx.font = '700 26px Archivo, sans-serif';
    ctx.fillText(ticket.sessionTitle || 'SELASA · LAPANGAN TENNIS UNY · 18:00', 38, 90);

    ctx.fillStyle = '#384534';
    ctx.fillRect(38, 110, 724, 1.5);

    ctx.fillStyle = '#C6D0B4';
    ctx.font = '600 13px Archivo, sans-serif';
    ctx.fillText('PASS ID & RECLUB CODE', 38, 146);
    ctx.fillText('NAMA PEMAIN / HOLDER', 38, 210);
    ctx.fillText('VENUE & LEVEL', 38, 274);
    ctx.fillText('PEMBAYARAN QRIS & KONFIRMASI WA', 38, 338);

    ctx.fillStyle = '#F0F2E6';
    ctx.font = '700 19px Archivo, sans-serif';
    ctx.fillText('#' + (ticket.ticketId || 'TNC-PASS-8801') + ' · RECLUB: IBBDG', 38, 172);
    ctx.fillText((ticket.playerName || 'TNC YOGYAKARTA MEMBER').toUpperCase(), 38, 236);
    ctx.font = '700 16px Archivo, sans-serif';
    ctx.fillText((ticket.courtSurface || 'LAPANGAN TENNIS UNY') + ' · ' + (ticket.ntrpLevel || 'NEWBIE & BEGINNER'), 38, 300);

    ctx.fillStyle = '#D1E432';
    ctx.font = '700 18px Archivo, sans-serif';
    ctx.fillText(formatIDR(ticket.priceIdr) + ' · QRIS AMONG.BREW (WA: 0812-2985-8442)', 38, 364);

    const qrisImg = document.getElementById('modal-qris-img') || document.getElementById('hero-qris-img');
    if (qrisImg && qrisImg.complete) {
      ctx.fillStyle = '#F6F6EC';
      ctx.fillRect(548, 128, 196, 248);
      ctx.drawImage(qrisImg, 556, 136, 180, 232);
    }

    const link = document.createElement('a');
    link.download = (ticket.ticketId || 'TNC-YOGYAKARTA-PASS') + '.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  function renderIssuedTicketsLedger() {
    const container = document.getElementById('issued-tickets-list');
    const navCount = document.getElementById('nav-pass-count');
    if (navCount) navCount.textContent = String(issuedTickets.length);
    if (!container) return;

    if (issuedTickets.length === 0) return;
    container.innerHTML = '';

    issuedTickets.slice(0, 6).forEach(function (t) {
      const card = document.createElement('article');
      card.className = 'issued-ticket-item';
      card.innerHTML =
        '<div class="issued-ticket-head">' +
          '<span>#' + t.ticketId + '</span>' +
          '<span>RECLUB: IBBDG</span>' +
        '</div>' +
        '<div class="issued-ticket-title">' + t.sessionTitle + '</div>' +
        '<div class="issued-ticket-meta">' + (t.playerName || 'TNC MEMBER').toUpperCase() + ' · ' + formatIDR(t.priceIdr) + '</div>';
      card.addEventListener('click', function () {
        openPassModal(t);
      });
      container.appendChild(card);
    });
  }

  function recordNewTicket(ticket) {
    issuedTickets.unshift(ticket);
    renderIssuedTicketsLedger();
  }

  /* ==========================================================================
     4. BOOKING & WHATSAPP CONFIRMATION ACTIONS (Wired to Go API)
     ========================================================================== */
  async function executeSessionBooking(sessionObj, customPlayerName) {
    if (!sessionObj || sessionObj.slotsLeft <= 0) return;

    const quickInput = document.getElementById('quick-player-name');
    const playerName =
      (customPlayerName && customPlayerName.trim()) ||
      (quickInput && quickInput.value.trim()) ||
      'MEMBER TNC YOGYAKARTA';

    let apiTicket = null;
    try {
      const res = await fetch('/api/v1/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sessionObj.id, playerName: playerName })
      });
      if (res.ok) {
        apiTicket = await res.json();
      }
    } catch (_) {}

    sessionObj.slotsLeft = Math.max(0, sessionObj.slotsLeft - 1);
    sessionObj.barPct = Math.min(100, sessionObj.barPct + 10);

    const ticket = apiTicket || {
      ticketId: 'TNC-JOG-' + (8801 + issuedTickets.length),
      ticketType: 'TNC YOGYAKARTA SESSION PASS',
      sessionId: sessionObj.id,
      sessionTitle: sessionObj.title,
      courtSurface: sessionObj.surface,
      ntrpLevel: sessionObj.ntrp,
      playerName: playerName,
      priceIdr: sessionObj.priceIDR,
      qrPassHash: 'ID1026508193129',
      status: 'AWAITING_QRIS_CONFIRMATION'
    };

    sessionObj.serial = 'PASS LOCKED · #' + ticket.ticketId;
    sessionObj.subSerial = playerName.toUpperCase() + ' · KONFIRMASI WA FILZA';

    syncHeroCards(true);
    updateLedgerRowUI(sessionObj.id, sessionObj.slotsLeft, sessionObj.totalSlots);
    recordNewTicket(ticket);
    openPassModal(ticket);
  }

  syncHeroCards(false);

  // Tab buttons (OPEN PLAY / COACHING / MULTI-SPORT)
  document.querySelectorAll('.booking-tabs-bar .tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const tab = btn.getAttribute('data-tab');
      if (!tab) return;
      currentCategory = tab;
      selectedIndex = 0;
      document.querySelectorAll('.booking-tabs-bar .tab-btn').forEach(function (b) {
        const active = b === btn;
        b.classList.toggle('tab-btn-active', active);
        b.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      syncHeroCards(true);
    });
  });

  // Hero session cards
  ['hero-card-1', 'hero-card-2'].forEach(function (cardId, idx) {
    const card = document.getElementById(cardId);
    if (!card) return;
    card.addEventListener('click', function () {
      selectedIndex = idx;
      syncHeroCards(true);
    });
  });

  // Hero schedule rows
  document.querySelectorAll('[data-select-cat]').forEach(function (row) {
    row.addEventListener('click', function () {
      const cat = row.getAttribute('data-select-cat') || 'open-play';
      const idx = parseInt(row.getAttribute('data-select-index') || '0', 10);
      currentCategory = cat;
      selectedIndex = Math.min(idx, (SESSIONS[cat] || SESSIONS['open-play']).length - 1);

      document.querySelectorAll('[data-select-cat]').forEach(function (r) {
        r.classList.toggle('is-active-sched', r === row);
      });

      document.querySelectorAll('.booking-tabs-bar .tab-btn').forEach(function (b) {
        const active = b.getAttribute('data-tab') === cat;
        b.classList.toggle('tab-btn-active', active);
        b.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      syncHeroCards(true);

      if (window.innerWidth <= 980) {
        const bookingConsole = document.getElementById('hero-booking-console');
        if (bookingConsole) {
          bookingConsole.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });
  });

  // Live Player Name input updates QR subtitle in real time
  const quickPlayerInput = document.getElementById('quick-player-name');
  if (quickPlayerInput) {
    quickPlayerInput.addEventListener('input', function () {
      const val = quickPlayerInput.value.trim();
      const subSerialEl = document.getElementById('qr-pass-sub');
      if (subSerialEl) {
        subSerialEl.textContent = val
          ? 'PEMAIN: ' + val.toUpperCase() + ' · RECLUB IBBDG'
          : 'NMID: ID1026508193129 · RECLUB IBBDG';
      }
    });
  }

  // Primary Hero Book CTA Button & Mobile Sticky Bottom CTA Button
  ['hero-book-btn', 'mobile-sticky-book-btn'].forEach(function (btnId) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener('click', function () {
      const list = SESSIONS[currentCategory] || SESSIONS['open-play'];
      const active = list[selectedIndex] || list[0];
      executeSessionBooking(active);
    });
  });

  // Open Pass Preview button & QR Tile click
  ['open-pass-preview-btn', 'hero-qr-trigger'].forEach(function (id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('click', function () {
      if (issuedTickets.length > 0) {
        openPassModal(issuedTickets[0]);
      } else {
        const list = SESSIONS[currentCategory] || SESSIONS['open-play'];
        const active = list[selectedIndex] || list[0];
        const quickInput = document.getElementById('quick-player-name');
        openPassModal({
          ticketId: 'TNC-JOG-8800',
          ticketType: 'OFFICIAL QRIS AMONG.BREW PASS',
          sessionTitle: active.title,
          courtSurface: active.surface,
          ntrpLevel: active.ntrp,
          playerName: (quickInput && quickInput.value.trim()) || 'MEMBER TNC YOGYAKARTA',
          priceIdr: active.priceIDR,
          qrPassHash: 'ID1026508193129',
          status: 'SCAN_QRIS_AMONG_BREW'
        });
      }
    });
  });

  // Modal Close & Download buttons
  const closeModalBtn = document.getElementById('close-pass-modal');
  const downloadPassBtn = document.getElementById('download-pass-png-btn');
  const modalBackdrop = document.getElementById('pass-modal');

  if (closeModalBtn) closeModalBtn.addEventListener('click', closePassModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', function (e) {
      if (e.target === modalBackdrop) closePassModal();
    });
  }
  if (downloadPassBtn) {
    downloadPassBtn.addEventListener('click', function () {
      if (activeModalTicket) downloadCourtPassPNG(activeModalTicket);
    });
  }

  // Ledger quick-lock buttons
  document.querySelectorAll('[data-quick-lock]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const sessionId = btn.getAttribute('data-quick-lock');
      const sessionObj = findSessionById(sessionId);
      if (sessionObj) {
        executeSessionBooking(sessionObj);
      }
      btn.textContent = 'TERDAFTAR · LIHAT QRIS';
    });
  });

  // Schedule Filter Form + Reset
  const filterForm = document.getElementById('schedule-filter-form');
  const emptyState = document.getElementById('ledger-empty-state');
  const resetFilterBtn = document.getElementById('reset-filter-btn');

  function applyScheduleFilter() {
    const mode = document.getElementById('filter-mode').value;
    const court = document.getElementById('filter-court').value;
    const level = document.getElementById('filter-level').value;
    let visibleCount = 0;

    document.querySelectorAll('#ledger-list .ledger-row:not(.ledger-row-head)').forEach(function (row) {
      const rMode = row.getAttribute('data-mode');
      const rCourt = row.getAttribute('data-court');
      const rLevel = row.getAttribute('data-level');
      const show =
        (mode === 'all' || rMode === mode) &&
        (court === 'all' || rCourt === court) &&
        (level === 'all' || rLevel === level);
      row.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }
  }

  if (filterForm) {
    filterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      applyScheduleFilter();
      const ledgerSection = document.getElementById('open-play');
      if (ledgerSection) ledgerSection.scrollIntoView({ behavior: 'smooth' });
    });
    ['filter-mode', 'filter-court', 'filter-level'].forEach(function (id) {
      const sel = document.getElementById(id);
      if (sel) sel.addEventListener('change', applyScheduleFilter);
    });
  }

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', function () {
      document.getElementById('filter-mode').value = 'all';
      document.getElementById('filter-court').value = 'all';
      document.getElementById('filter-level').value = 'all';
      applyScheduleFilter();
    });
  }

  // Direct WhatsApp Confirmation Form to Admin Filza Nayla Haziqa
  const waConfirmForm = document.getElementById('wa-confirm-form');
  if (waConfirmForm) {
    waConfirmForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const nameInput = document.getElementById('wa-player-name');
      const sessionSelect = document.getElementById('wa-session-select');
      const playerName = (nameInput && nameInput.value.trim()) || 'Member TNC Yogyakarta';
      const chosenSession = (sessionSelect && sessionSelect.value) || 'Selasa 18.00–20.00 WIB · Lapangan Tennis UNY';

      const ticket = {
        ticketId: 'TNC-WA-' + (8901 + issuedTickets.length),
        ticketType: 'KONFIRMASI QRIS VIA WHATSAPP',
        sessionTitle: chosenSession.toUpperCase(),
        courtSurface: 'YOGYAKARTA PARTNER VENUE',
        ntrpLevel: 'NEWBIE & BEGINNER',
        playerName: playerName,
        priceIdr: chosenSession.indexOf('Coaching') !== -1 ? 95000 : 75000,
        qrPassHash: 'ID1026508193129',
        status: 'WA_CONFIRMATION_READY'
      };

      recordNewTicket(ticket);
      const waUrl = buildWhatsAppConfirmationURL(playerName, chosenSession, ticket.ticketId);
      window.open(waUrl, '_blank', 'noopener');
    });
  }

  // Temporary 1 Nov Yoga Event Form & QRIS Handlers
  const yogaForm = document.getElementById('yoga-event-reg-form');
  if (yogaForm) {
    yogaForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nameInput = document.getElementById('yoga-reg-name');
      const waInput = document.getElementById('yoga-reg-wa');
      const matSelect = document.getElementById('yoga-reg-mat');

      const playerName = (nameInput && nameInput.value.trim()) || 'PESERTA YOGA 1 NOV';
      const playerWA = (waInput && waInput.value.trim()) || '-';
      const matOption = (matSelect && matSelect.value) || 'Bawa Matras Sendiri';

      const ticket = {
        ticketId: 'YOGA-NOV1-' + (101 + issuedTickets.length),
        ticketType: 'WOMEN OF NUCLEAR × TNC YOGA PASS',
        sessionId: 'yoga-nov-01',
        sessionTitle: 'YOGA AT THE COURT · MINGGU 1 NOV 2026',
        courtSurface: 'JOI SPORTS & SOCIAL (JL. BIMA NO.88 SLEMAN)',
        ntrpLevel: 'BEGINNER FRIENDLY · COACH NILA (200-HR CYT)',
        playerName: playerName,
        priceIdr: 75000,
        qrPassHash: 'ID1026508193129',
        status: 'AWAITING_QRIS_CONFIRMATION'
      };

      recordNewTicket(ticket);
      openPassModal(ticket);

      // Otomatis kirim data ke Google Spreadsheet via Apps Script Webhook
      sendToGoogleSheet(ticket, playerWA, matOption);

      // Dedicated Event WhatsApp format for +62 851-5771-9823
      const text =
        'Halo Admin Women of Nuclear × The NUCLEAR Club! 👋\n\n' +
        'Saya sudah mengisi form registrasi "Yoga at the Court" (Minggu, 1 Nov 2026 @ Joi Sports & Social):\n\n' +
        '• Nama: ' + playerName + '\n' +
        '• No. WhatsApp: ' + playerWA + '\n' +
        '• Opsi Matras: ' + matOption + '\n' +
        '• Biaya: Early Bird IDR 75.000 (QRIS AMONG.BREW)\n' +
        '• Pass ID: #' + ticket.ticketId + '\n\n' +
        'Berikut bukti transfer QRIS saya. Mohon konfirmasi slotnya ya! Terima kasih ♡';

      const waEventUrl = 'https://wa.me/6285157719823?text=' + encodeURIComponent(text);
      const modalWaBtn = document.getElementById('modal-wa-admin-btn');
      if (modalWaBtn) {
        modalWaBtn.href = waEventUrl;
      }
      window.open(waEventUrl, '_blank', 'noopener');
    });
  }

  // Google Sheets Webhook Integration
  const GOOGLE_SHEETS_WEBHOOK_URL =
    'https://script.google.com/macros/s/AKfycbz_r9TzB3LoEAYDFM0M-e7vPj67KxxSj8gBCgmqKX1ye8_ddM6kghmkNy9hRLeB0k_yRA/exec';

  async function sendToGoogleSheet(ticket, phone, mat) {
    if (!GOOGLE_SHEETS_WEBHOOK_URL) return;
    try {
      const payload = {
        ticketId: ticket.ticketId,
        playerName: ticket.playerName,
        playerPhone: phone,
        matOption: mat,
        sessionTitle: ticket.sessionTitle,
        priceIdr: ticket.priceIdr
      };
      await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Google Sheet webhook sync notice:', err);
    }
  }

  // Open QRIS Modal trigger from Yoga section
  ['yoga-open-qris-modal', 'yoga-qris-trigger'].forEach(function (id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('click', function () {
      const nameInput = document.getElementById('yoga-reg-name');
      const playerName = (nameInput && nameInput.value.trim()) || 'PESERTA YOGA 1 NOV';
      openPassModal({
        ticketId: 'YOGA-NOV1-PREVIEW',
        ticketType: 'WOMEN OF NUCLEAR × TNC YOGA PASS',
        sessionId: 'yoga-nov-01',
        sessionTitle: 'YOGA AT THE COURT · MINGGU 1 NOV 2026',
        courtSurface: 'JOI SPORTS & SOCIAL (JL. BIMA NO.88 SLEMAN)',
        ntrpLevel: 'BEGINNER FRIENDLY · COACH NILA (200-HR CYT)',
        playerName: playerName,
        priceIdr: 75000,
        qrPassHash: 'ID1026508193129',
        status: 'SCAN_QRIS_AMONG_BREW'
      });
    });
  });

  /* ==========================================================================
     5. THREE.JS 3D YOGYAKARTA TENNIS COURTS (UNY, GPW, JOI) & HAWK-EYE
     ========================================================================== */
  const COURT_SURFACES = {
    uny: {
      name: 'LAPANGAN TENNIS UNY · INDOOR & OUTDOOR COURT',
      pace: 'FASILITAS: LAMPU MALAM · TRIBUN · KANTIN / COFFEE SHOP · PARKIR LUAS',
      innerHex: 0x3d4f34,
      apronHex: 0x182617,
      bounceHeight: 2.35,
      ballSpeed: 1.02
    },
    gpw: {
      name: 'LAPANGAN TENNIS GPW · OUTDOOR NIGHT COURT',
      pace: 'FASILITAS: OUTDOOR COURT · PENCAHAYAAN MALAM · TOILET · PARKIR',
      innerHex: 0x2f4838,
      apronHex: 0x142019,
      bounceHeight: 2.5,
      ballSpeed: 0.96
    },
    joi: {
      name: 'JOI SPORT AND SOCIAL · INDOOR SOCIAL COURT',
      pace: 'FASILITAS: INDOOR COURT · COFFEE SHOP · TOILET · PARKIR NYAMAN',
      innerHex: 0x2c4a3e,
      apronHex: 0x13221c,
      bounceHeight: 2.25,
      ballSpeed: 1.08
    }
  };

  function createTennisCourtScene(canvas, initialSurfaceKey) {
    if (!canvas || !window.THREE) return null;
    const THREE = window.THREE;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x0f1910, 1);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0f1910, 0.022);

    const camera = new THREE.PerspectiveCamera(42, 2, 0.1, 200);
    const camTarget = { x: 0, y: 10.5, z: 22.5, lookX: 0, lookY: 0.5, lookZ: 0 };
    let autoOrbit = true;
    let orbitAngle = 0.35;

    const ambient = new THREE.AmbientLight(0xeef2e6, 0.72);
    scene.add(ambient);

    const dirLight1 = new THREE.DirectionalLight(0xfffbe8, 0.95);
    dirLight1.position.set(14, 24, 16);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xd1e432, 0.28);
    dirLight2.position.set(-16, 18, -14);
    scene.add(dirLight2);

    const courtGroup = new THREE.Group();
    scene.add(courtGroup);

    const surfCfg = COURT_SURFACES[initialSurfaceKey] || COURT_SURFACES.uny;

    const apronGeo = new THREE.PlaneGeometry(22, 34);
    const apronMat = new THREE.MeshLambertMaterial({ color: surfCfg.apronHex });
    const apronMesh = new THREE.Mesh(apronGeo, apronMat);
    apronMesh.rotation.x = -Math.PI / 2;
    courtGroup.add(apronMesh);

    const innerGeo = new THREE.PlaneGeometry(11, 23.8);
    const innerMat = new THREE.MeshLambertMaterial({ color: surfCfg.innerHex });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    innerMesh.rotation.x = -Math.PI / 2;
    innerMesh.position.y = 0.02;
    courtGroup.add(innerMesh);

    const lineMat = new THREE.MeshBasicMaterial({ color: 0xf3f3eb });
    function addLine(w, d, x, z) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), lineMat);
      m.rotation.x = -Math.PI / 2;
      m.position.set(x, 0.035, z);
      courtGroup.add(m);
    }

    const lw = 0.14;
    addLine(11, lw, 0, -11.9);
    addLine(11, lw, 0, 11.9);
    addLine(lw, 23.8, -5.5, 0);
    addLine(lw, 23.8, 5.5, 0);
    addLine(lw, 23.8, -4.12, 0);
    addLine(lw, 23.8, 4.12, 0);
    addLine(8.24, lw, 0, -6.4);
    addLine(8.24, lw, 0, 6.4);
    addLine(lw, 12.8, 0, 0);
    addLine(lw, 0.45, 0, -11.65);
    addLine(lw, 0.45, 0, 11.65);

    const netGeo = new THREE.PlaneGeometry(11.8, 1.05, 24, 4);
    const netMat = new THREE.MeshBasicMaterial({
      color: 0xc6d0b4,
      wireframe: true,
      transparent: true,
      opacity: 0.55
    });
    const netMesh = new THREE.Mesh(netGeo, netMat);
    netMesh.position.set(0, 0.525, 0);
    courtGroup.add(netMesh);

    const tapeMesh = new THREE.Mesh(
      new THREE.BoxGeometry(11.8, 0.09, 0.06),
      new THREE.MeshBasicMaterial({ color: 0xf3f3eb })
    );
    tapeMesh.position.set(0, 1.05, 0);
    courtGroup.add(tapeMesh);

    const postGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.12, 12);
    const postMat = new THREE.MeshLambertMaterial({ color: 0x131f0f });
    [-5.9, 5.9].forEach(function (px) {
      const post = new THREE.Mesh(postGeo, postMat);
      post.position.set(px, 0.56, 0);
      courtGroup.add(post);
    });

    const ballGeo = new THREE.SphereGeometry(0.24, 20, 20);
    const ballMat = new THREE.MeshBasicMaterial({ color: 0xd1e432 });
    const ballMesh = new THREE.Mesh(ballGeo, ballMat);
    courtGroup.add(ballMesh);

    const ringGeo = new THREE.RingGeometry(0.18, 0.34, 28);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd1e432,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    });
    const bounceRing = new THREE.Mesh(ringGeo, ringMat);
    bounceRing.rotation.x = -Math.PI / 2;
    bounceRing.position.set(2.2, 0.04, -8.5);
    courtGroup.add(bounceRing);

    const arcPoints = [];
    for (let i = 0; i <= 40; i++) {
      arcPoints.push(new THREE.Vector3(0, 0.5, 0));
    }
    const arcGeo = new THREE.BufferGeometry().setFromPoints(arcPoints);
    const arcMat = new THREE.LineBasicMaterial({ color: 0xd1e432, transparent: true, opacity: 0.65 });
    const arcLine = new THREE.Line(arcGeo, arcMat);
    courtGroup.add(arcLine);

    let bounceHeight = surfCfg.bounceHeight;
    let ballSpeed = surfCfg.ballSpeed;

    function rebuildTrajectoryArc(startX, startZ, endX, endZ, peakY) {
      const positions = arcLine.geometry.attributes.position.array;
      for (let i = 0; i <= 40; i++) {
        const u = i / 40;
        const x = startX + (endX - startX) * u;
        const z = startZ + (endZ - startZ) * u;
        const y = 0.35 + Math.sin(u * Math.PI) * peakY;
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
      }
      arcLine.geometry.attributes.position.needsUpdate = true;
    }

    rebuildTrajectoryArc(-2.8, 10.2, 2.4, -9.6, bounceHeight);

    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    canvas.addEventListener('pointerdown', function (e) {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    });
    window.addEventListener('pointerup', function () {
      isDragging = false;
    });
    window.addEventListener('pointercancel', function () {
      isDragging = false;
    });
    window.addEventListener('pointermove', function (e) {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;
      if (Math.abs(dx) > Math.abs(dy)) {
        autoOrbit = false;
        orbitAngle -= dx * 0.007;
        camTarget.x = Math.sin(orbitAngle) * 22;
        camTarget.z = Math.cos(orbitAngle) * 22;
      }
    });

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = Math.max(300, rect.width);
      const h = Math.max(180, rect.height);
      if (canvas.width !== w || canvas.height !== h) {
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
    }

    resize();
    window.addEventListener('resize', resize);

    let clock = 0;
    let rallyLeg = 0;
    const waypoints = [
      { x: -2.8, z: 10.2 },
      { x: 2.4, z: -9.6 },
      { x: -2.2, z: 9.8 },
      { x: 2.9, z: -10.1 }
    ];

    function animate() {
      requestAnimationFrame(animate);
      clock += 0.014 * ballSpeed;

      if (clock >= 1) {
        clock = 0;
        rallyLeg = (rallyLeg + 1) % waypoints.length;
        const from = waypoints[rallyLeg];
        const to = waypoints[(rallyLeg + 1) % waypoints.length];
        bounceRing.position.set(to.x, 0.04, to.z);
        rebuildTrajectoryArc(from.x, from.z, to.x, to.z, bounceHeight);
      }

      const from = waypoints[rallyLeg];
      const to = waypoints[(rallyLeg + 1) % waypoints.length];
      const bx = from.x + (to.x - from.x) * clock;
      const bz = from.z + (to.z - from.z) * clock;
      const by = 0.28 + Math.sin(clock * Math.PI) * bounceHeight;
      ballMesh.position.set(bx, by, bz);

      const pulse = 0.8 + Math.sin(clock * Math.PI * 2) * 0.35;
      bounceRing.scale.set(pulse, pulse, 1);

      if (autoOrbit) {
        orbitAngle += 0.0022;
        camTarget.x = Math.sin(orbitAngle) * 21.5;
        camTarget.z = Math.cos(orbitAngle) * 21.5;
      }

      camera.position.x += (camTarget.x - camera.position.x) * 0.06;
      camera.position.y += (camTarget.y - camera.position.y) * 0.06;
      camera.position.z += (camTarget.z - camera.position.z) * 0.06;
      camera.lookAt(camTarget.lookX, camTarget.lookY, camTarget.lookZ);

      renderer.render(scene, camera);
    }

    animate();

    return {
      resize: resize,
      setCameraPreset: function (preset) {
        if (preset === 'orbit') {
          autoOrbit = true;
          camTarget.y = 10.5;
          camTarget.lookX = 0;
          camTarget.lookY = 0.5;
          camTarget.lookZ = 0;
        } else if (preset === 'baseline') {
          autoOrbit = false;
          camTarget.x = 0;
          camTarget.y = 4.2;
          camTarget.z = 18.8;
          camTarget.lookX = 0;
          camTarget.lookY = 0.8;
          camTarget.lookZ = -4;
        } else if (preset === 'overhead') {
          autoOrbit = false;
          camTarget.x = 0.1;
          camTarget.y = 26.5;
          camTarget.z = 2.5;
          camTarget.lookX = 0;
          camTarget.lookY = 0;
          camTarget.lookZ = 0;
        } else if (preset === 'umpire' || preset === 'hawkeye') {
          autoOrbit = false;
          camTarget.x = 12.5;
          camTarget.y = 6.2;
          camTarget.z = 0;
          camTarget.lookX = 0;
          camTarget.lookY = 0.8;
          camTarget.lookZ = 0;
        }
      },
      setSurface: function (surfaceKey) {
        const cfg = COURT_SURFACES[surfaceKey] || COURT_SURFACES.uny;
        innerMat.color.setHex(cfg.innerHex);
        apronMat.color.setHex(cfg.apronHex);
        bounceHeight = cfg.bounceHeight;
        ballSpeed = cfg.ballSpeed;
      }
    };
  }

  function initThreeCourtsAndGSAP() {
    const heroScene = createTennisCourtScene(document.getElementById('hero-three-canvas'), 'uny');
    const arenaScene = createTennisCourtScene(document.getElementById('arena-three-canvas'), 'uny');

    // Hero Photo vs Court Rally vs 3D Hawk-Eye Switcher
    const plateFrame = document.querySelector('.hero-plate-frame');
    const heroImg = document.getElementById('hero-plate-img');
    const camBar = document.getElementById('hero-camera-bar');

    document.querySelectorAll('.plate-mode-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const mode = btn.getAttribute('data-view-mode');
        document.querySelectorAll('.plate-mode-btn').forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
        });

        if (mode === 'community' && heroImg) {
          heroImg.src = '../assets/club/tnc-hero-night.jpg';
        } else if (mode === 'rally' && heroImg) {
          heroImg.src = '../assets/plates/court-rally-plate.png';
        }

        if (plateFrame) {
          plateFrame.classList.toggle('is-3d-active', mode === '3d');
        }
        if (camBar) {
          camBar.hidden = mode !== '3d';
        }
        if (heroScene && mode === '3d') {
          heroScene.resize();
          heroScene.setCameraPreset('baseline');
        }
      });
    });

    // Hero 3D Camera Preset pills
    document.querySelectorAll('[data-cam-preset]').forEach(function (pill) {
      pill.addEventListener('click', function () {
        const preset = pill.getAttribute('data-cam-preset');
        document.querySelectorAll('[data-cam-preset]').forEach(function (p) {
          p.classList.toggle('is-active', p === pill);
        });
        if (heroScene) heroScene.setCameraPreset(preset);
      });
    });

    // Arena 3D Camera Preset buttons
    document.querySelectorAll('[data-arena-cam]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const preset = btn.getAttribute('data-arena-cam');
        document.querySelectorAll('[data-arena-cam]').forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
        });
        if (arenaScene) arenaScene.setCameraPreset(preset);
      });
    });

    // Partner Courts Interactive Surface Switcher (UNY / GPW / JOI)
    document.querySelectorAll('[data-court-surface]').forEach(function (card) {
      card.addEventListener('click', function () {
        const surfaceKey = card.getAttribute('data-court-surface');
        document.querySelectorAll('[data-court-surface]').forEach(function (c) {
          c.classList.toggle('is-selected-court', c === card);
        });
        const cfg = COURT_SURFACES[surfaceKey];
        if (cfg) {
          const nameEl = document.getElementById('arena-court-label');
          const paceEl = document.getElementById('arena-pace-label');
          if (nameEl) nameEl.textContent = cfg.name;
          if (paceEl) paceEl.textContent = cfg.pace;
        }
        if (arenaScene) arenaScene.setSurface(surfaceKey);
        if (heroScene) heroScene.setSurface(surfaceKey);
      });
    });
  }

  if (document.readyState === 'complete') {
    initThreeCourtsAndGSAP();
  } else {
    window.addEventListener('load', initThreeCourtsAndGSAP);
  }

  /* ==========================================================================
     6. SYNC INITIAL STATE WITH GO REST API (/api/v1/sessions & /api/v1/health)
     ========================================================================== */
  if (window.location.protocol.startsWith('http')) {
    fetch('/api/v1/health')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        const statusEl = document.getElementById('go-api-status');
        if (statusEl && data.status) {
          statusEl.textContent = 'ENGINE STATUS: ' + data.engine.toUpperCase() + ' · ' + data.status.toUpperCase();
        }
      })
      .catch(function () {});

    fetch('/api/v1/sessions')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (Array.isArray(data.sessions)) {
          data.sessions.forEach(function (srv) {
            const local = findSessionById(srv.id);
            if (local) {
              local.slotsLeft = srv.slotsLeft;
              local.totalSlots = srv.totalSlots;
              updateLedgerRowUI(srv.id, srv.slotsLeft, srv.totalSlots);
            }
          });
          syncHeroCards(false);
        }
        if (Array.isArray(data.tickets) && data.tickets.length > 0) {
          issuedTickets = data.tickets;
          renderIssuedTicketsLedger();
        }
      })
      .catch(function () {});
  }
})();
