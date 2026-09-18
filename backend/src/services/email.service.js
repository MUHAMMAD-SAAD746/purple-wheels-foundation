const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASSWORD
    }
})


async function sendEmail(to, subject, text, html) {
    try {
        const info = await transporter.sendMail({
            from: `"Purple Wheel Foundation" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html
        })

        console.log('message sent : %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    catch (err) {
        console.error('error sending email: ', err)
    }
}


async function sendRegistrationEmail(userEmail, name) {
    const subject = "Welcome to Purple Wheels Foundation"
    const text = `Hello ${name},\n\n Thankyou for register at backend Ledger. We are excited to hace you on board!\n\nBest regards, \nThe Backend Ledger Team`
    const html = `<p>Hello ${name},</p><p>Thankyou for register at Backend Ledger. We're excited to have you on board!</p><p>Best regards,<br>The Backend Ledger Team</p>`


    await sendEmail(userEmail, subject, text, html)
}


async function sendotpEmail(userEmail, otp) {
    const subject = "Your Password Reset Code";

    const text = `Hello,

We received a request to reset your password.

Your verification code is: ${otp}

This code will expire in 10 minutes.

If you did not request a password reset, you can safely ignore this email.

Best regards,
The Purple Wheel Foundation Team`;

    const html = `
        <p>Hello,</p>
        <p>We received a request to reset your password.</p>
        <p>Your verification code is:</p>
        <h2>${otp}</h2>
        
        <p>This code expires in a <strong>few minutes.</strong>.</p>
        <p>If you did not request a password reset, you can safely ignore this email.</p>
        <p>Best regards,<br>The Purple Wheel Foundation Team</p>
    `;

    await sendEmail(userEmail, subject, text, html);
}

module.exports = { sendRegistrationEmail, sendotpEmail };