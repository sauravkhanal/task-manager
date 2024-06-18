import nodemailer from "nodemailer";
import env from "../../config/env";
import { ITaskWithDetails } from "../../routes/v1/tasks/types";

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

        ${env.frontendEndpoint}/verify/${OTP}
        or
        ${env.backendEndpoint}/v1/auth/verify/${OTP}

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

export async function sendTaskCreatedMail(task: ITaskWithDetails, userEmails: string[]) {
    const taskURL = `http://localhost:5173/details/${task._id}`;
    const mailOptions = {
        from: env.email,
        to: userEmails.toString(),
        subject: "TASK-MANAGER task assigned to you.",
        text: `
        Hello ,

        A new task has been created and assigned to you. Here are the details:

        Title: ${task.title}
        Description: ${task.description || "No description provided"}
        Due Date: ${task.dueDate.toDateString()}
        Priority: ${task.priority}
        Workflow Stage: ${task.workflowStage}
        Creator: ${task.creator ? task.creator.firstName : "Unknown"}

        You can view the task details and manage it by clicking on the following link:
        ${taskURL}

        Best regards,
        The TASK-MANAGER Team
    `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("❌ Error, couldn't send task created mail:", error.message);
        } else {
            console.log("✅ Task created, Email sent:", info.response);
        }
    });
}

export async function sendPasswordResetMail(userEmail: string, resetToken: string) {
    const resetURL = `http://localhost:5173/reset-password/${resetToken}`;
    const mailOptions = {
        from: env.email,
        to: userEmail,
        subject: "TASK MANAGER - Password Reset Request",
        text: `
      Hi,

      We received a request to reset your password. Please click on the link below to reset your password:

      ${resetURL}
      
      Note: The link is valid for 5 minutes only.
      If you did not request a password reset, please ignore this email or contact support if you have questions.

      Best regards,
      The TASK-MANAGER Team
    `,
        html: `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Password Reset</title>
    </head>
    <body>
        <p>Hi,</p>
        <p>We received a request to reset your password. Please click on the link below to reset your password:</p>
        <a href="${resetURL}">Click here to create new password</a>
        <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
        <p>Best regards,<br/>The TASK-MANAGER Team</p>
        <p><strong>Note:</strong> This link is valid for 5 minutes.</p>
    </body>
    </html>
    `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("❌ Error, couldn't send password reset mail:", error.message);
        } else {
            console.log("✅ Password reset email sent:", info.response);
        }
    });
}
