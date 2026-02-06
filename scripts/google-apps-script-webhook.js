// ============================================================
// Google Apps Script Webhook
// ============================================================
// This script receives form submissions from your website and:
// 1. Saves them to your Google Sheet
// 2. Sends you an email notification for every new lead
//
// SETUP (takes ~2 minutes):
// 1. Open your Google Sheet:
//    https://docs.google.com/spreadsheets/d/1vtkqfAVEM1SxZflW9hQyJGVEnY6Z5ja42Y7DDb-MuLI/edit
// 2. Click Extensions > Apps Script
// 3. Delete any code in the editor
// 4. Paste this ENTIRE file
// 5. Click "Deploy" > "New deployment"
// 6. Select type: "Web app"
// 7. Set "Execute as": Me
// 8. Set "Who has access": Anyone
// 9. Click "Deploy" and authorize when prompted
// 10. Copy the Web App URL
// 11. In Vercel, add environment variable:
//     GOOGLE_SHEETS_WEBHOOK_URL = <paste the URL>
// 12. Redeploy your site
//
// That's it! Every form submission will now:
// - Appear in your Google Sheet
// - Send you an email notification
// ============================================================

const SPREADSHEET_ID = '1vtkqfAVEM1SxZflW9hQyJGVEnY6Z5ja42Y7DDb-MuLI';
const NOTIFICATION_EMAIL = 'brandon@learnandleverageai.com';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    if (data.type === 'callback_request') {
      // Add to Callback Requests sheet
      const callbackSheet = ss.getSheetByName('Callback Requests');
      callbackSheet.appendRow([
        data.name,
        data.email,
        data.phone,
        data.message || 'N/A',
        data.timestamp
      ]);

      // Also add to main All Leads sheet
      const allLeads = ss.getSheetByName('Sheet1');
      allLeads.appendRow([
        'Callback Request',
        data.name,
        data.email,
        data.phone || 'N/A',
        'N/A',
        'N/A',
        data.message || 'N/A',
        data.timestamp
      ]);

      // Send email notification
      MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        subject: 'New Callback Request - ' + data.name,
        htmlBody: '<h2>New Callback Request</h2>' +
          '<p><strong>Name:</strong> ' + data.name + '</p>' +
          '<p><strong>Email:</strong> ' + data.email + '</p>' +
          '<p><strong>Phone:</strong> ' + data.phone + '</p>' +
          '<p><strong>Message:</strong> ' + (data.message || 'N/A') + '</p>' +
          '<p><strong>Submitted:</strong> ' + data.timestamp + '</p>' +
          '<hr>' +
          '<p><a href="https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '">View All Leads</a></p>'
      });

    } else if (data.type === 'event_registration') {
      // Add to main All Leads sheet
      const allLeads = ss.getSheetByName('Sheet1');
      allLeads.appendRow([
        'Event Registration',
        data.name,
        data.email,
        'N/A',
        data.company || 'N/A',
        data.industry || 'N/A',
        data.question || 'N/A',
        data.timestamp
      ]);

      // Send email notification
      MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        subject: 'New Event Registration - ' + data.name,
        htmlBody: '<h2>New Event Registration</h2>' +
          '<p><strong>Name:</strong> ' + data.name + '</p>' +
          '<p><strong>Email:</strong> ' + data.email + '</p>' +
          '<p><strong>Company:</strong> ' + (data.company || 'N/A') + '</p>' +
          '<p><strong>Industry:</strong> ' + (data.industry || 'N/A') + '</p>' +
          '<p><strong>Question:</strong> ' + (data.question || 'N/A') + '</p>' +
          '<p><strong>Submitted:</strong> ' + data.timestamp + '</p>' +
          '<hr>' +
          '<p><a href="https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '">View All Leads</a></p>'
      });
    }

    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('Webhook is running')
    .setMimeType(ContentService.MimeType.TEXT);
}
