# JCI Academy Forma — Uputstvo za Deploy

Forma je potpuno besplatna. Nema logina, watermark-a ni plaćanja.
Stack: **HTML/CSS/JS** → **Google Apps Script** → **Google Sheets** → **GitHub Pages**

---

## Korak 1 — Napravi Google Sheet

1. Idi na [sheets.google.com](https://sheets.google.com) i napravi novi sheet.
2. Otvori Apps Script: **Proširenja → Apps Script**
3. Obriši default kod i nalepi sadržaj fajla `Code.gs`
4. Klikni **Sačuvaj** (ikona diskete) i daj projektu ime npr. `JCI Academy Backend`

---

## Korak 2 — Deployuj Web App

1. U Apps Script editoru klikni **Deploy → New deployment**
2. Klikni zupčanik pored "Select type" → odaberi **Web App**
3. Podesi:
   - **Description**: JCI Academy Form v1
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Klikni **Deploy** → dozvoli pristup svom Google nalogu
5. Kopiraj **Web App URL** koji se pojavi (izgleda ovako: `https://script.google.com/macros/s/XXXX/exec`)

---

## Korak 3 — Ubaci URL u HTML formu

1. Otvori `index.html` u text editoru
2. Nađi liniju (blizu vrha `<script>` sekcije):
   ```js
   const APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Zameni `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` sa URL-om koji si kopirao u koraku 2
4. Sačuvaj fajl

---

## Korak 4 — Hostuj na GitHub Pages

1. Idi na [github.com](https://github.com) → **New repository**
2. Ime repo-a npr: `jci-academy-forma` (može biti public)
3. Upload-uj `index.html` (samo taj fajl je potreban)
4. Idi na **Settings → Pages**
5. Pod **Source** odaberi `main` branch → `/root`
6. Klikni **Save** — forma je živa za ~1 minutu na URL-u:
   `https://TVOJ-USERNAME.github.io/jci-academy-forma/`

---

## Testiranje

1. Popuni formu i pošalji
2. Otvori Google Sheet — podaci treba da se pojave u listu **Odgovori**
3. Ako lista ne postoji, automatski se kreira pri prvom unosu

---

## Ažuriranje Google Apps Script (ako promeniš kod)

Svaki put kad promeniš `Code.gs`:
- **Deploy → Manage deployments → Edit** → promeni verziju na **New version** → **Deploy**
- URL ostaje isti!

---

## Napomene

- `mode: 'no-cors'` znači da browser ne može da čita odgovor servera, ali podaci se šalju i upisuju
- Forma radi čak i bez potvrde o uspehu — Google Sheet uvek prima podatke
- Nema limita na broj unosa (Google Sheets drži 10M ćelija)

---

*JCI Novi Sad Academy · 2026*
