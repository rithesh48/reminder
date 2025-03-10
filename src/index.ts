import { v4 as uuidv4 } from 'uuid';

type Reminder = {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
};

class ReminderDatabase {
  private reminders: Map<string, Reminder>;

  constructor() {
    this.reminders = new Map();
  }

  createReminder(title: string, description?: string, dueDate?: Date): string {
    const id = uuidv4();
    this.reminders.set(id, { id, title, description, dueDate });
    console.log(`Reminder '${title}' created successfully with ID '${id}'.`);
    return id;
  }

  exists(id: string): boolean {
    return this.reminders.has(id);
  }

  getAllReminders(): Reminder[] {
    const allReminders = Array.from(this.reminders.values());
    console.log("All Reminders:", allReminders);
    return allReminders;
  }

  getReminder(id: string): Reminder | null {
    const reminder = this.reminders.get(id) || null;
    console.log(reminder ? `Reminder Found: ${JSON.stringify(reminder)}` : `No reminder found with ID '${id}'.`);
    return reminder;
  }

  removeReminder(id: string): boolean {
    if (this.reminders.delete(id)) {
      console.log(`Reminder with ID '${id}' removed successfully.`);
      return true;
    }
    console.log(`No reminder found with ID '${id}'.`);
    return false;
  }

  updateReminder(id: string, title?: string, description?: string, dueDate?: Date): boolean {
    if (!this.reminders.has(id)) {
      console.log(`No reminder found with ID '${id}' to update.`);
      return false;
    }
    const existingReminder = this.reminders.get(id)!;
    this.reminders.set(id, {
      id,
      title: title ?? existingReminder.title,
      description: description ?? existingReminder.description,
      dueDate: dueDate ?? existingReminder.dueDate,
    });
    console.log(`Reminder with ID '${id}' updated successfully.`);
    return true;
  }
}
 export default ReminderDatabase;  