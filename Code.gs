// ══════════════════════════════════════════════════════
//  JCI Academy — Google Apps Script Backend
//  Paste this into: script.google.com → New Project
//  Then: Deploy → New deployment → Web App
//    Execute as: Me
//    Who has access: Anyone
// ══════════════════════════════════════════════════════

const SHEET_NAME = 'Odgovori';

/** GET na /exec (npr. kad neko otvori link u browseru) — bez ovoga Google prikazuje „doGet not found”. */
function doGet() {
  return HtmlService.createHtmlOutput(
    '<!DOCTYPE html><html lang="sr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
      '<title>JCI Academy — prijem prijava</title></head><body style="font-family:system-ui,sans-serif;padding:2rem;max-width:32rem;line-height:1.5;color:#0a0f29">' +
      '<h1 style="font-size:1.1rem">Ovo je backend za formu</h1>' +
      '<p>Ovaj link <strong>ne</strong> otvara upitnik. Prijave šalje samo stranica sa formom (POST).</p>' +
      '<p>Otvori javni link koji deli JCI Novi Sad Academy (npr. GitHub Pages).</p>' +
      '</body></html>'
  ).setTitle('JCI Academy');
}

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Create sheet + header row if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Timestamp',
        'Ime',
        'Prezime',
        'Email',
        'Telefon',
        'JCI Organizacija',
        'Zanimanje',
        'Zainteresovan za predavača',
        'Oblast predavanja',
        'Ostale oblasti (custom)',
        'Ideja radionice',
        'Dostupnost u junu',
        'Format',
        'Komentar',
      ]);
      // Bold header
      sheet.getRange(1, 1, 1, 14).setFontWeight('bold').setBackground('#0a0f29').setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.ime || '',
      data.prezime || '',
      data.email || '',
      data.telefon || '',
      data.jci_org || '',
      data.zanimanje || '',
      data.predavac || '',
      data.oblasti || '',
      data.oblast_ostalo || '',
      data.ideja || '',
      data.jun_dostupnost || '',
      data.format || '',
      data.komentar || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function — run manually to check sheet is working
function testWrite() {
  doPost({
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        ime: 'Test',
        prezime: 'Korisnik',
        email: 'test@test.com',
        telefon: '',
        jci_org: 'JCI Novi Sad',
        zanimanje: 'Developer',
        predavac: 'Da',
        oblasti: 'IT & Digitalna transformacija, Liderstvo',
        oblast_ostalo: '',
        ideja: '',
        jun_dostupnost: 'Da',
        format: 'Uživo',
        komentar: 'Test unos',
      })
    }
  });
}
