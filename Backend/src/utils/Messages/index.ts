import env from "../../config/env";
import { WorkflowStage } from "../../routes/v1/workflowStage/types";
import { sendPasswordResetMail } from "../mail";

export const messages = {
    user: {
        creation_success: "User Created Successfully. \\n OTP has been sent to your email.",
        retrieval_success: "User retrieved successfully.",
        update: {
            update_success: "User details updates successfully.",
            deletion_success: "User deleted successfully.",
            recovery_success: "User recover successfully.",
            deactivation_success: "User deactivated successfully.",
            reactivation_success: "User reactivated successfully.",
        },
        404: "User not found.",
        /**
         *
         * @returns `The user is not authorized to ${action} the ${item}. or "The user is not authorized." if no args provided`
         */
        not_authorized: (action?: string, item?: string, extraMessage?: string) =>
            `The user is not authorized${action ? " to" : "."} ${action}${item ? " the" : "."} ${item}.${extraMessage ? " " + extraMessage : ""}`,
    },
    auth: {
        login_success: "LoggedIn Successfully.",
        invalid_account: "Invalid Password or Email.",
        token_expired: "The token has expired.",
        token_not_found: "Unauthorized user. Token not found. Please login.",
        unauthorized: "The user is not authorized.",
        passwordResetMailSent: "Password reset request received. If the mail is valid you'll receive email shortly.",
    },
    token: {
        renew_success: "Access token renewed successfully.",
        invalid_token: "The token is invalid.",
    },
    error: {
        internal_server_error: "Internal Server Error",
        404: "Resource not found",
        /**
         * @returns `The ${name} is not found.`
         */
        not_found(name: string) {
            return `The ${name} is not found.`;
        },
        /**
         *
         * @returns `The ${name} is already exists.`
         */
        already_exists(name: string) {
            return `The ${name} already exists.`;
        },
    },
    OTP: {
        email_Used: `The email is already used. Please verify the OTP sent to email at ${env.endpoint}/v1/auth/verify`,
        verification_success: "The email has been verified successfully.",
        invalid_otp: "The otp provided is invalid.",
        invalid_email: "Account with given email doesn't exist. Please create a new account.",
        regeneration_success: "New otp has been sent to your email.",
        regeneration_failed: "Couldn't generate new OTP.",
    },
    task: {
        task_not_found: "The task with given Id doesn't exist.",
    },
    workflowStage: {
        /**
         * @returns `Cannot move task directly from ${prev} to ${next} stage.`
         */
        transitionError(prev: WorkflowStage, next: WorkflowStage) {
            return `Cannot move task from ${prev} to ${next} stage.`;
        },
        /**
         * @returns `The task has been moved from ${prev} to ${next} stage.`
         */
        transitionSuccess(prev: WorkflowStage, next: WorkflowStage) {
            return `The task has been moved from ${prev} to ${next} stage.`;
        },
    },
    /**
     * @returns `The ${name}(default = task) has been ${action} successfully.`;
     */
    success(action: string, name: string = "task") {
        return `The ${name} has been ${action} successfully.`;
    },
    /**
     * @returns `An error occurred while ${action} the ${name} (default = task).`;
     */
    failure(action: string, name: string = "task") {
        return `An error occurred while ${action} the ${name}.`;
    },
};
