import nodemailer from "nodemailer";
import env from "../../config/env";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: "gmail",
    auth: {
        user: env.email,
        pass: env.password,
    },
});

export default async function sendMail(recipient: string, OTP: number) {
    const mailOptions = {
        from: env.email,
        to: recipient,
        subject: "TASK-MANAGER Verify your account.",
        text: `Hello,

        Thank you for signing up for TASK-MANAGER!

        To complete your registration, please verify your account using the One-Time Password (OTP) provided below:

        Your OTP: ${OTP}

        You can enter this OTP in the app or use the following links to verify your account:

        http://localhost:5173/verify/${OTP}
        or
        ${env.endpoint}/v1/auth/verify/${OTP}

        If you did not create an account with TASK-MANAGER, please disregard this email.

        Best regards,
        The TASK-MANAGER Team
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("❌ Error:", error.message);
        } else {
            console.log("✅ Email sent:", info.response);
        }
    });
}
