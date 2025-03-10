import ReminderDatabase from "./index";
const db = new ReminderDatabase();

// Creating reminders
const id1 = db.createReminder("Buy groceries", "Milk, Eggs, Bread", new Date("2025-03-15"));
const id2 = db.createReminder("Doctor Appointment", "Visit Dr. Smith at 5 PM");

// Fetching all reminders
db.getAllReminders();

// Fetching a specific reminder
db.getReminder(id1);

// Updating a reminder
db.updateReminder(id1, "Buy groceries and fruits", "Milk, Eggs, Bread, Apples");

// Checking if a reminder exists
console.log("Reminder with ID exists:", db.exists(id2));

// Removing a reminder
db.removeReminder(id2);

// Fetching all reminders after deletion
db.getAllReminders();


