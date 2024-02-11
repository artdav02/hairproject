// Import necessary libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { google } = require('googleapis');

// Initialize Express
const app = express();
const port = 3001; // Make sure this matches the port you're calling from your frontend

// Middleware
app.use(cors());

app.use(bodyParser.json());

// Configure Google OAuth2 client
const { OAuth2 } = google.auth;
const oAuth2Client = new OAuth2(
    '136203566277-raota2ncipr4pfnhb36todgh95m1f1id.apps.googleusercontent.com', // Replace with your Google Client ID
    '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' // Replace with your Google Client Secret
);

// Set refresh token
oAuth2Client.setCredentials({
    refresh_token: '1//04ugHkLLGaBrSCgYIARAAGAQSNwF-L9IrDVRvUxbUoOOtnu9mWFf1q-8XAxGETMvjGBUkRf3fchjhoimW1jaOIHO4tiuhHUaTmYY' // Replace with your refresh token
});

// Initialize Google Calendar API
const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });


app.get('/api/events', (req, res) => {
    const { date } = req.query; // Expect date in 'YYYY-MM-DD' format
    console.log(`Fetching events for date: ${date}`); // Log the date we're querying for

    // Create a date object using the provided date at midnight in the 'Europe/Tallinn' timezone
    const timeMin = new Date(`${date}T00:00:00`); // Adjust based on received format
    const timeMax = new Date(`${date}T23:59:59`);

    console.log(`Time range for query: ${timeMin.toISOString()} - ${timeMax.toISOString()}`);

    calendar.events.list({
        calendarId: 'primary',
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        timeZone: 'Europe/Tallinn',
    }, (err, response) => {
        if (err) {
            console.error('The API returned an error: ' + err);
            return res.status(500).send('Error retrieving calendar events');
        }
        const events = response.data.items.map(event => {
            const eventDetails = {
                start: event.start.dateTime || event.start.date, // 'dateTime' for specific times, 'date' for all-day events
                end: event.end.dateTime || event.end.date,
            };
            console.log(`Event found: ${JSON.stringify(eventDetails)}`); // Log each event found
            return eventDetails;
        });
        console.log(`Total events found: ${events.length}`); // Log the total number of events found
        res.json(events); // Send the events to the frontend
    });
});


// POST endpoint to book an appointment
app.post('/api/book', (req, res) => {
    const { date, serviceName, duration, masterName } = req.body;

    // Convert the received date to JavaScript Date objects
    const eventStartTime = new Date(date);
    const eventDuration = parseInt(duration);
    const eventEndTime = new Date(date);
    eventEndTime.setMinutes(eventEndTime.getMinutes() + eventDuration); // Assuming a 45-minute appointment

    // Define the calendar event
    const event = {
        summary: serviceName,
        location: 'Online',
        description: `Service by: ${masterName}`,
        start: {
            dateTime: eventStartTime.toISOString(),
            timeZone: 'Europe/Tallinn', // Adjust time zone if necessary
        },
        end: {
            dateTime: eventEndTime.toISOString(),
            timeZone: 'Europe/Tallinn', // Adjust time zone if necessary
        },
    };

    // Check calendar availability
    calendar.freebusy.query({
        resource: {
            timeMin: eventStartTime,
            timeMax: eventEndTime,
            timeZone: 'Europe/Tallinn', // Adjust time zone if necessary
            items: [{ id: 'primary' }],
        },
    }, (err, resp) => {
        if (err) {
            console.error('Free Busy Query Error: ', err);
            return res.status(500).send('Error checking calendar availability');
        }

        // Check if there are no events in the time slot
        const eventsArr = resp.data.calendars.primary.busy;
        if (eventsArr.length === 0) {
            // If not busy, create a new calendar event
            calendar.events.insert({
                calendarId: 'primary',
                resource: event,
            }, (error, eventResp) => {
                if (error) {
                    console.error('Error Creating Calendar Event:', error);
                    return res.status(500).send('Error creating calendar event');
                }
                console.log('Calendar event successfully created.');
                return res.send({ message: 'Appointment booked successfully!', event: eventResp.data });
            });
        } else {
            // If busy, respond accordingly
            console.log(`Sorry, I'm busy.`);
            return res.send({ message: "Sorry, I'm busy." });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
