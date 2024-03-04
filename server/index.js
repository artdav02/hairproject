// Import necessary libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const mysql = require('mysql');

// dedrfpsizcxxcfwo



// Initialize Express
const app = express();
const port = 3001; // Make sure this matches the port you're calling from your frontend

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = mysql.createConnection({
    host: 'localhost', // Database host
    user: 'root', // Your database user
    password: '4865550100', // Your database password
    database: 'comments' // Your database name
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('An error occurred while connecting to the DB', err);
        return;
    }
    console.log('Connected to the database successfully!');
});

// Add a route to get comments

app.post('/api/db', (req, res) => {
    console.log('Received data:', req.body);
    const { username, rating, comment, masterId } = req.body;

    // Properly parameterize the query to prevent SQL injection
    const userInsertQuery = 'INSERT INTO users (username) VALUES (?)';

    // Insert the user
    console.log('Inserting user:', username);
    db.query(userInsertQuery, [username], (err, result) => {
        if (err) {
            console.error('An error occurred while inserting the user', err);
            res.status(500).send('An error occurred while inserting the user');
            return;
        }

        // Get the ID of the inserted user
        const userId = result.insertId;

        // Now insert the comment with the obtained userID
        const commentInsertQuery = 'INSERT INTO comments (userID, masterID, comment, rating) VALUES (?, ?, ?, ?)';

        // Properly parameterize this query as well
        db.query(commentInsertQuery, [userId, masterId, comment, rating], (err, result) => {
            if (err) {
                console.error('An error occurred while inserting the comment', err);
                res.status(500).send('An error occurred while inserting the comment');
                return;
            }

            // Send a successful response back
            res.send('User and comment inserted successfully');
        });
    });
});

app.get('/api/comments', (req, res) => {

    const { masterId } = req.query
    const commentGetQuery = 'SELECT m.masterName, u.username, c.comment, c.rating, c.created_at FROM comments c JOIN masters m ON c.masterID = m.masterID JOIN users u ON c.userID = u.userID WHERE c.masterID = (?) ORDER BY c.created_at DESC;'

    db.query(commentGetQuery, [masterId], (err, results) =>{
        if (err) {
            console.error('An error occurred while fetching comments', err);
            res.status(500).send('An error occurred while fetching comments');
            return;
        }
        res.json(results);
    });
});


// Configure Google OAuth2 client
const { OAuth2 } = google.auth;
const oAuth2Client = new OAuth2(
    '136203566277-raota2ncipr4pfnhb36todgh95m1f1id.apps.googleusercontent.com', // Replace with your Google Client ID
    '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' // Replace with your Google Client Secret
);

// Set refresh token
oAuth2Client.setCredentials({
    refresh_token: '1//043gzlOgUV3hxCgYIARAAGAQSNwF-L9Iry_-ck4j2Zs2Mr5Kz73roF-SysUHN-HKRX2wg0qMhoZaZgybdyab77FMMIyn3-3qAkQI' // Replace with your refresh token
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
    const { date, serviceName, duration, masterName, email, phone, info, userName, userSurname } = req.body;

    // Convert the received date to JavaScript Date objects
    const eventStartTime = new Date(date);
    const eventDuration = parseInt(duration);
    const eventEndTime = new Date(date);
    eventEndTime.setMinutes(eventEndTime.getMinutes() + eventDuration); // Adjust duration as needed

    // Define the calendar event
    const event = {
        summary: serviceName,
        location: 'Online',
        description: `Service by: ${masterName}\nKliendi andmed: ${userName} ${userSurname}\nTelefoni number: ${phone}\nE-mail: ${email}\nLisa info: ${info}`,
        start: {
            dateTime: eventStartTime.toISOString(),
            timeZone: 'Europe/Tallinn', // Adjust time zone if necessary
        },
        end: {
            dateTime: eventEndTime.toISOString(),
            timeZone: 'Europe/Tallinn', // Adjust time zone if necessary
        },
    };

    // Check calendar availability and create event logic follows
    calendar.freebusy.query({
        resource: {
            timeMin: eventStartTime.toISOString(),
            timeMax: eventEndTime.toISOString(),
            timeZone: 'Europe/Tallinn',
            items: [{ id: 'primary' }],
        },
    }, (err, resp) => {
        if (err) {
            console.error('Free Busy Query Error: ', err);
            return res.status(500).send('Error checking calendar availability');
        }

        const eventsArr = resp.data.calendars.primary.busy;
        if (eventsArr.length === 0) {
            // If time slot is free, create a new calendar event
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
            // If time slot is busy, respond accordingly
            console.log(`Sorry, I'm busy.`);
            return res.send({ message: "Sorry, I'm busy." });
        }
    });
});

const fs = require('fs').promises;
app.post('/api/send-email', async (req, res) => {
    const { date, serviceName, duration, masterName, email, phone, info, userName, userSurname, price } = req.body;

    const parsedDate = new Date(date);

    // Format the date as DD.MM HH:MM
    const formattedDate = `${parsedDate.getDate().toString().padStart(2, '0')}.${(parsedDate.getMonth() + 1).toString().padStart(2, '0')} ${parsedDate.getHours().toString().padStart(2, '0')}:${parsedDate.getMinutes().toString().padStart(2, '0')}`;

    let htmlContent = await fs.readFile('./letter.html', 'utf8');

    htmlContent = htmlContent.replace('{{userName}}', userName)
        .replace('{{userName}}', userName)
        .replace('{{userSurname}}', userSurname)
        .replace('{{userSurname}}', userSurname)
        .replace('{{formattedDate}}', formattedDate)
        .replace('{{serviceName}}', serviceName)
        .replace('{{duration}}', duration)
        .replace('{{masterName}}', masterName)
        .replace('{{price}}', price);

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email provider
        auth: {
            user: 'artdav2706@gmail.com', // Replace with your email
            pass: 'dedrfpsizcxxcfwo', // Replace with your email password or app-specific password
        },
    });

    // Setup email data
    let mailOptions = {
        from: 'artdav2706@gmail.com', // Sender address
        to: email, // List of receivers
        subject: `Reservering  ${formattedDate}`, // Subject line
        html: htmlContent,
    };

    // Send email with defined transport object
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        res.send({ message: 'Email sent successfully!', messageId: info.messageId });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ message: 'Failed to send email', error: error });
    }
});



// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
