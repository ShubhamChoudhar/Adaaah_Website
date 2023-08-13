const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// Google Sheets credentials and token path
const SHEETS_SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SHEETS_TOKEN_PATH = 'sheets_token.json';

// Gmail API scope
const GMAIL_SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

// Google Calendar credentials and token path
const CALENDAR_SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const CALENDAR_TOKEN_PATH = 'calendar_token.json';

let flag = 0;
let temp;
let events;
let emails = [];

function authorize(credentials, tokenPath, sheetsScopes, gmailScopes, callback) {
  const { client_secret, client_id, redirect_uris } = credentials;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);

  fs.readFile(tokenPath, (err, token) => {
    if (err) return getNewToken(oAuth2Client, tokenPath, sheetsScopes, gmailScopes, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getNewToken(oAuth2Client, tokenPath, sheetsScopes, gmailScopes, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [...sheetsScopes, ...gmailScopes],
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      fs.writeFile(tokenPath, JSON.stringify(token), (err) => {
        if (err) return console.error('Error writing token to file', err);
        console.log('Token stored to', tokenPath);
      });
      callback(oAuth2Client);
    });
  });
}

async function sendSubscribedEmail(auth, email) {
  const gmail = google.gmail({ version: 'v1', auth });

  const message = [
    `From: Your Email Id`, // Replace with the Gmail account you want to send emails from
    `To: ${email}`,
    `Subject:  Your Exclusive Subscription Newsletter - Stay Informed!`,
    `Content-Type: text/html; charset=utf-8`,
      '',
      `Dear ${email},\n\nStay ahead with our exclusive newsletter! Get the latest updates about our events, exclusive content, special offers, and community highlights. Don't miss out—subscribe today!\n\nBest Regards,\nAdaah`,
    ].join('\n');

    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    try {
      const res = await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: encodedMessage,
        },
      });
      console.log('Email sent:', res.data);
    } 
    catch (err) {
      console.error('Error sending email:', err.message);
    }
  }

async function sendUnsubscribedEmail(auth, email) {
  const gmail = google.gmail({ version: 'v1', auth });

  const message = [
    `From: Your Email Id`, // Replace with the Gmail account you want to send emails from
    `To: ${email}`,
    `Subject: Unsubscribe Confirmation - Adaah`,
    `Content-Type: text/html; charset=utf-8`,
    '',
    `Dear ${email},\n\n\tYou have been unsubscribed from our newsletter. We appreciate your past engagement and hope to connect with you again in the future.\n\nBest Regards,\nAdaah`,
  ].join('\n');

  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  try {
    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
      raw: encodedMessage,
      },
    });
    console.log('Email sent:', res.data);
  } 
  catch (err) {
    console.error('Error sending email:', err.message);
  }
}

// Function to check if the email is already subscribed
async function isEmailSubscribed(auth, email) {
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = 'Spreadsheet Id'; // Replace with your actual spreadsheet ID
  const sheetName = 'Sheet1'; // Replace with the name of your sheet containing the emails

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range:`${sheetName}!A:A`, // Assuming the email is in column A
      valueRenderOption: 'UNFORMATTED_VALUE',
    });
    const rows = response.data.values;
    const isSubscribed = rows.some((row) => row[0] === email);
    return isSubscribed;
  } catch (err) {
    console.error('Error fetching data from spreadsheet:', err.message);
    return false;
  }
}

async function isEmailUnsubscribed(auth, email) {
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = 'Spreadsheet Id'; // Replace with your actual spreadsheet ID
  const sheetName = 'Sheet1'; // Replace with the name of your sheet containing the emails

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:A`, // Assuming the email is in column A
      valueRenderOption: 'UNFORMATTED_VALUE',
    });
    const rows = response.data.values;
    const isUnsubscribed = !rows.some((row) => row[0] === email);
    return isUnsubscribed;
  } catch (err) {
    console.error('Error fetching data from spreadsheet:', err.message);
    return true; // Consider the email unsubscribed if there is an error fetching data
  }
}

function writeToSpreadsheet(auth, formId, data) {
  const sheets = google.sheets({ version: 'v4', auth });
  let spreadsheetId;
  let range;
  let values;
  if (formId === 'form1') {
    spreadsheetId = 'Spreadsheet Id'; // Replace with the actual spreadsheet ID for form1
    range = 'Sheet1!A2:C2';
    values = [
      [data.firstname, data.lastname, data.feedback],
    ];
  } 
  else if (formId === 'form2') {
    spreadsheetId = 'Spreadsheet Id'; // Replace with the actual spreadsheet ID for form2
    range = 'Sheet1!A2:E2';
    values = [
      [data.firstname, data.lastname, data.email, data.mobno, data.message],
    ];
  }
  else if (formId === 'form3') {
    spreadsheetId = 'Spreadsheet Id'; // Replace with the actual spreadsheet ID for form3
    range = 'Sheet1!A2';
    values = [
      [data.email],
    ];
  }
  else {
    return console.error('Invalid formId:', formId);
  }

  sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    resource: {
      values,
    },
  }, (err, res) => {
    if (err) return console.error('The API returned an error:', err.message);
    // console.log(spreadsheetId, range, values);
    console.log('Data written successfully!');
  });
}

async function sendEventDetailsEmail(auth, email, eventDetails) {
  const gmail = google.gmail({ version: 'v1', auth });
  const message = [
    `From: Your Email Id`, // replace with your email
    `To: ${email}`,
    `Subject: New Event: ${eventDetails.summary}`,
    '',
    `Dear Subscriber,`,
    '',
    `We have a new event coming up: ${eventDetails.summary}.`,
    `It will be held on: ${new Date(eventDetails?.start?.dateTime).toLocaleDateString()} to ${new Date(eventDetails?.end?.dateTime).toLocaleDateString()}`,
    `Description: ${eventDetails.description}`,
    '',
    `We look forward to your participation.`,
    `Best Regards,`,
    `Your Name`,
  ].join('\n');

  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  try {
    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });
    console.log('Email sent:', res.data);
  } catch (err) {
    console.error('Error sending email:', err.message);
  }
}

//Function to get all subscribed emails
async function getAllSubscribers(auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = 'Spreadsheet Id'; // Replace with your actual spreadsheet ID
  const sheetName = 'Sheet1'; // Replace with the name of your sheet containing the emails

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range:`${sheetName}!A2:A`, // Assuming the email is in column A
      valueRenderOption: 'UNFORMATTED_VALUE',
    });
    // Extract emails from rows and return them
    const rows = response.data.values;
    console.log("rows", rows);
    console.log("flag", flag);
    console.log("temp", temp);
    emails = rows.map((row) => row[0]);
    emails.forEach((email) => {
      if(temp > flag){
        console.log("email", email);
        sendEventDetailsEmail(auth, email, events);
      }
      
    });
  } catch (err) {
    console.error('Error fetching data get all subscribers from spreadsheet:', err.message);
    return [];
  }
  
}

// Function to fetch calendar events and send event details to subscribed emails
function fetchCalendarEvents(auth, res) {
  temp = flag;
  flag = flag + 1;
  const calendar = google.calendar({ version: 'v3', auth });
  calendar.events.list({
    calendarId: 'primary', // Replace with the desired calendar ID
    timeMin: new Date().toISOString(),
    maxResults: 10, // Adjust the number of events you want to fetch
    singleEvents: true,
    orderBy: 'startTime',
  }, async (err, response) => {
    if (err) {
      console.error('Error fetching calendar events:', err.message);
      return res.status(500).json({ error: 'Failed to fetch calendar events' });
    }

    events = response.data.items;
    console.log(emails);
    emails.forEach((email) => {
      console.log("flag1", flag);
      console.log("temp1",temp);
      console.log(events);
      if(temp < flag){
          for(let i = 0; i < events.length; i++){
              sendEventDetailsEmail(auth, email, events[i]);
          }
        }
            
    });
    
    res.status(200).json(events); // Return the calendar events as a response
  });
}

function deleteFromSpreadsheet(auth, email) {
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = 'Spreadsheet Id'; // Replace with your actual spreadsheet ID
  const sheetName = 'Sheet1'; // Replace with the name of your sheet containing the emails
  // const emailColumnIndex = 1; // Assuming the email is in the first column (A)

  // Use the Sheets API to find the row containing the email
  sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A:A`, // Assuming the email is in column A
    valueRenderOption: 'UNFORMATTED_VALUE',
  }, (err, response) => {
    if (err) {
      console.error('Error fetching data from spreadsheet:', err.message);
      return;
    }

    const rows = response.data.values;
    const rowIndexToDelete = rows.findIndex((row) => row[0] === email);
    if (rowIndexToDelete !== -1) {
      // Use the Sheets API to delete the entire row containing the email
      sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        resource: {
          requests: [
            {
              deleteDimension: {
                range: {
                  sheetId: 0,
                  dimension: 'ROWS',
                  startIndex: rowIndexToDelete,
                  endIndex: rowIndexToDelete + 1,
                },
              },
            },
          ],
        },
      }, (err, response) => {
        if (err) {
          console.error('Error deleting row from spreadsheet:', err.message);
        } else {
          console.log('Email deleted successfully!');
        }
      });
    } else {
      console.log('Email not found in the spreadsheet.');
    }
  });
}

app.use(cors());
app.use(express.json());

// Load Google Sheets client secrets and authorize the client
fs.readFile('./credentials.json', (err, content) => {
  if (err) return console.error('Error loading Sheets client secret file', err);
  const credentials = JSON.parse(content).web;
  authorize(credentials, SHEETS_TOKEN_PATH, SHEETS_SCOPES, GMAIL_SCOPES, (auth) => {
    console.log('Google Sheets API and Gmail API authorized.');
    // Start the server after successful authorization for Google Sheets and Gmail
    app.listen(3001, () => {
      console.log('Server is running on http://localhost:3001');
    });
    
    getAllSubscribers(auth);

    // Define a POST endpoint to receive form data from the front-end
    app.post('/write-to-spreadsheet', (req, res) => {
      const formData = req.body; // Form data sent from the front-end
      const formId = formData.formId;
      // console.log(formData);
      writeToSpreadsheet(auth, formId, formData); // Pass the 'auth' variable here
      res.status(200).send('Data received and written to Google Sheets.');
    });

    // Update the 'app.post' route for subscribing
    app.post('/subscribe', (req, res) => {
    console.log('Received subscribe request:', req.body);
    const formData = req.body;
    const email = formData.email;

    // Check if the email is already subscribed
    isEmailSubscribed(auth, email)
      .then((isSubscribed) => {
        console.log('isSubscribed:', isSubscribed); 
        if (isSubscribed) {
          return res.status(400).json({ error: 'Email is already subscribed' });
        }

        // Write email to the Google Sheets
        writeToSpreadsheet(auth, 'form3', formData);
        getAllSubscribers(auth);

        // Send confirmation email to the subscriber
        sendSubscribedEmail(auth, email)
          .then(() => {
            res.status(200).json({ message: 'Subscription successful!' });
          })
          .catch((error) => {
            console.error('Error subscribing:', error);
            res.status(500).json({ error: 'Failed to subscribe' });
          });
      })

      .catch((error) => {
        console.error('Error checking subscription:', error);
        res.status(500).json({ error: 'Failed to check subscription' });
      });
  });

  app.post('/unsubscribe', (req, res) => {
    const { email } = req.body;

    // Check if the email is already unsubscribed
    isEmailUnsubscribed(auth, email)
      .then((isUnsubscribed) => {
        if (isUnsubscribed) {
          return res.status(400).json({ error: 'Email is already unsubscribed' });
        }

        // If the email exists in the spreadsheet, proceed with the unsubscribe process
        // Implement the logic to delete the email from the Google Sheets
        // Call a function to delete the email from the spreadsheet
        deleteFromSpreadsheet(auth, email);
        getAllSubscribers(auth);

        // Send confirmation email to the unsubscribed user
        sendUnsubscribedEmail(auth, email)
          .then(() => {
            res.status(200).json({ message: 'Unsubscribed successfully!' });
          })
          .catch((error) => {
            console.error('Error unsubscribing:', error);
            res.status(500).json({ error: 'Failed to unsubscribe' });
          });
      })
      .catch((error) => {
        console.error('Error checking subscription status:', error);
        res.status(500).json({ error: 'Failed to check subscription status' });
      });

  });

    // Define the route for fetching calendar events
    app.get('/api/calendar-events', (req, res) => {
      // Load Google Calendar client secrets and authorize the client
      fs.readFile('./credentials.json', (err, content) => {
        if (err) {
          console.error('Error loading Calendar client secret file', err);
          return res.status(500).json({ error: 'Failed to load Calendar client secret file' });
        }
        const credentials = JSON.parse(content).web;
        authorize(credentials, CALENDAR_TOKEN_PATH, CALENDAR_SCOPES, GMAIL_SCOPES, (auth) => {
          console.log('Google Calendar API authorized.');
          // Fetch and return calendar events after successful authorization for Google Calendar
          fetchCalendarEvents(auth, res);
          
        });
      });
    });
  });
});