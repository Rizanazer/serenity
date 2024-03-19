const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const twilio = require('twilio');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Twilio credentials
const accountSid = "ACc09b732d0906f9ffa434c4e71e5502ca";
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = "VA3200ba5ec6da33350c42b679a0cdf306";
const client = twilio(accountSid, authToken);

// Endpoint to send OTP
router.post('/send-otp', async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const verification = await client.verify.services(verifySid).verifications.create({ to: phoneNumber, channel: 'sms' });
    res.status(200).json({ message: 'OTP sent successfully', verification });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Endpoint to verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { phoneNumber, otpCode } = req.body;
    const verificationCheck = await client.verify.services(verifySid).verificationChecks.create({ to: phoneNumber, code: otpCode });
    res.status(200).json({ message: 'OTP verified successfully', verificationCheck });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
});

module.exports = router;
