import ReminderDatabase from "./index";
const db = new ReminderDatabase();

// Creating reminders
db.createReminder("1", "Buy groceries", "Milk, Eggs, Bread", new Date("2025-03-15"));
db.createReminder("2", "Doctor Appointment", "Visit Dr. Smith at 5 PM");

// Fetching all reminders
db.getAllReminders();

// Fetching a specific reminder
db.getReminder("1");

// Updating a reminder
db.updateReminder("1", "Buy groceries and fruits", "Milk, Eggs, Bread, Apples");

// Checking if a reminder exists
console.log("Reminder with ID '2' exists:", db.exists("2"));

// Removing a reminder
db.removeReminder("2");

// Fetching all reminders after deletion
db.getAllReminders();

