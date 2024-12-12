const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const person1Number = process.env.PERSON1_NUMBER;
const person2Number = process.env.PERSON2_NUMBER;

app.post('/update-slot', (req, res) => {
    const { recipient, newSlot, date, url } = req.body;

    if (!recipient || !newSlot || !date || !url) {
        return res.status(400).json({ success: false, error: 'Invalid request data' });
    }

    const toNotify = recipient === 'John Doe' ? person2Number : person1Number;
    const messageBody = `${recipient} has successfully updated their time slot to ${newSlot.replace('-', ' to ')} on ${date}.`;

    client.messages
        .create({
            body: messageBody,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: toNotify,
        })
        .then((message) => {
            console.log(`Message sent: SID ${message.sid}`);
            res.json({ success: true, sid: message.sid });
        })
        .catch((error) => {
            console.error('Twilio Error:', error.message);
            res.status(500).json({ success: false, error: error.message });
        });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});