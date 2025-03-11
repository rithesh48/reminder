// // ReminderDatabase.ts

// src/ReminderDatabase.ts

export interface Reminder {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  isCompleted: boolean;
  createdAt: Date;
}

export class ReminderDatabase {
  private reminders: Map<string, Reminder>;
  private idCounter: number;

  constructor() {
      this.reminders = new Map<string, Reminder>();
      this.idCounter = 0;
  }

  private generateId(): string {
      return `${++this.idCounter}`;
  }

  createReminder(title: string, description: string, dueDate: Date): Reminder {
      const id = this.generateId();
      const reminder: Reminder = {
          id,
          title,
          description,
          dueDate,
          isCompleted: false,
          createdAt: new Date()
      };
      
      this.reminders.set(id, reminder);
      return reminder;
  }

  exists(id: string): boolean {
      return this.reminders.has(id);
  }

  markReminderAsCompleted(id: string): boolean {
      const reminder = this.reminders.get(id);
      if (!reminder) return false;
      reminder.isCompleted = true;
      this.reminders.set(id, reminder);
      return true;
  }

  unmarkReminderAsCompleted(id: string): boolean {
      const reminder = this.reminders.get(id);
      if (!reminder) return false;
      reminder.isCompleted = false;
      this.reminders.set(id, reminder);
      return true;
  }

  getAllReminders(): Reminder[] {
      return Array.from(this.reminders.values());
  }

  getReminder(id: string): Reminder | null {
      return this.reminders.get(id) || null;
  }

  getAllRemindersMarkedAsCompleted(): Reminder[] {
      return Array.from(this.reminders.values())
          .filter(reminder => reminder.isCompleted);
  }

  getAllRemindersNotMarkedAsCompleted(): Reminder[] {
      return Array.from(this.reminders.values())
          .filter(reminder => !reminder.isCompleted);
  }

  getAllRemindersDueByToday(): Reminder[] {
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      return Array.from(this.reminders.values())
          .filter(reminder => {
              const dueDate = new Date(reminder.dueDate);
              return dueDate <= today;
          });
  }

  updateReminder(id: string, updates: Partial<Pick<Reminder, 'title' | 'description' | 'dueDate'>>): boolean {
      const reminder = this.reminders.get(id);
      if (!reminder) return false;
      const updatedReminder = {
          ...reminder,
          ...updates,
          createdAt: reminder.createdAt,
          isCompleted: reminder.isCompleted
      };
      this.reminders.set(id, updatedReminder);
      return true;
  }

  removeReminder(id: string): boolean {
      return this.reminders.delete(id);
  }
}
export default ReminderDatabase;  