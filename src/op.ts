import { ReminderDatabase } from "./index.js";  
// main.ts
import * as readline from 'readline';

// ReminderDatabase.ts
// src/op.ts

console.log("Starting the Reminder Database application...");

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const db = new ReminderDatabase();

// Helper function to format dates
const formatDate = (date: Date): string => date.toISOString().split('T')[0];

// Main function to handle user interaction
async function main(): Promise<void> {
    console.log("Welcome to Reminder Database System!");
    
    while (true) {
        console.log("\nChoose an action:");
        console.log("1. Create reminder");
        console.log("2. Check if reminder exists");
        console.log("3. Mark reminder as completed");
        console.log("4. Unmark reminder as completed");
        console.log("5. Get all reminders");
        console.log("6. Get specific reminder");
        console.log("7. Get completed reminders");
        console.log("8. Get incompleted reminders");
        console.log("9. Get reminders due by today");
        console.log("10. Update reminder");
        console.log("11. Remove reminder");
        console.log("12. Exit");

        const choice = await askQuestion("Enter your choice (1-12): ");

        switch (choice) {
            case "1": // Create reminder
                const title = await askQuestion("Enter title: ");
                const description = await askQuestion("Enter description: ");
                const dueDateStr = await askQuestion("Enter due date (YYYY-MM-DD): ");
                
                try {
                    const dueDate = new Date(dueDateStr);
                    if (isNaN(dueDate.getTime())) throw new Error("Invalid date");
                    
                    const reminder = db.createReminder(title, description, dueDate);
                    console.log("Created reminder:", {
                        id: reminder.id,
                        title: reminder.title,
                        description: reminder.description,
                        dueDate: formatDate(reminder.dueDate)
                    });
                } catch (error: unknown) {
                    const errorMessage = error instanceof Error ? error.message : String(error);
                    console.log("Error creating reminder:", errorMessage);
                }
                break;

            case "2": // Check if exists
                const idExists = await askQuestion("Enter reminder ID to check: ");
                console.log(`Reminder ${idExists} exists:`, db.exists(idExists));
                break;

            case "3": // Mark as completed
                const idComplete = await askQuestion("Enter reminder ID to mark as completed: ");
                console.log(`Marked as completed:`, db.markReminderAsCompleted(idComplete));
                break;

            case "4": // Unmark as completed
                const idUncomplete = await askQuestion("Enter reminder ID to unmark as completed: ");
                console.log(`Unmarked as completed:`, db.unmarkReminderAsCompleted(idUncomplete));
                break;

            case "5": // Get all reminders
                const allReminders = db.getAllReminders();
                console.log("All reminders:", allReminders.map(r => ({
                    id: r.id,
                    title: r.title,
                    dueDate: formatDate(r.dueDate),
                    isCompleted: r.isCompleted
                })));
                break;

            case "6": // Get specific reminder
                const idSpecific = await askQuestion("Enter reminder ID to get: ");
                const reminder = db.getReminder(idSpecific);
                console.log("Reminder:", reminder ? {
                    id: reminder.id,
                    title: reminder.title,
                    description: reminder.description,
                    dueDate: formatDate(reminder.dueDate),
                    isCompleted: reminder.isCompleted
                } : null);
                break;

            case "7": // Get completed reminders
                const completed = db.getAllRemindersMarkedAsCompleted();
                console.log("Completed reminders:", completed.map(r => ({
                    id: r.id,
                    title: r.title,
                    dueDate: formatDate(r.dueDate)
                })));
                break;

            case "8": // Get incompleted reminders
                const incompleted = db.getAllRemindersNotMarkedAsCompleted();
                console.log("Incompleted reminders:", incompleted.map(r => ({
                    id: r.id,
                    title: r.title,
                    dueDate: formatDate(r.dueDate)
                })));
                break;

            case "9": // Get reminders due by today
                const dueToday = db.getAllRemindersDueByToday();
                console.log("Reminders due by today:", dueToday.map(r => ({
                    id: r.id,
                    title: r.title,
                    dueDate: formatDate(r.dueDate)
                })));
                break;

            case "10": // Update reminder
                const idUpdate = await askQuestion("Enter reminder ID to update: ");
                const newTitle = await askQuestion("Enter new title (press enter to skip): ");
                const newDesc = await askQuestion("Enter new description (press enter to skip): ");
                const newDueDateStr = await askQuestion("Enter new due date (YYYY-MM-DD, press enter to skip): ");

                const updates: Partial<Pick<Reminder, 'title' | 'description' | 'dueDate'>> = {};
                if (newTitle) updates.title = newTitle;
                if (newDesc) updates.description = newDesc;
                if (newDueDateStr) {
                    const newDueDate = new Date(newDueDateStr);
                    if (!isNaN(newDueDate.getTime())) updates.dueDate = newDueDate;
                }

                console.log(`Update successful:`, db.updateReminder(idUpdate, updates));
                break;

            case "11": // Remove reminder
                const idRemove = await askQuestion("Enter reminder ID to remove: ");
                console.log(`Removed successfully:`, db.removeReminder(idRemove));
                break;

            case "12": // Exit
                console.log("Goodbye!");
                rl.close();
                return;

            default:
                console.log("Invalid choice. Please try again.");
        }
    }
}

// Helper function to ask questions
function askQuestion(question: string): Promise<string> {
    return new Promise(resolve => {
        rl.question(question, (answer: string) => resolve(answer.trim()));
    });
}

// Start the program
console.log("Calling main function...");
main().catch((error: unknown) => {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("An error occurred:", errorMessage);
    rl.close();
});