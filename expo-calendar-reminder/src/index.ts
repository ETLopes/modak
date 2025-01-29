import ExpoCalendarReminderModule from "./ExpoCalendarReminderModule";

export function addReminder(
  title: string,
  description: string,
  startDate: Date,
  endDate: Date,
): Promise<void> {
  return ExpoCalendarReminderModule.addReminder(
    title,
    description,
    startDate.getTime(),
    endDate.getTime(),
  );
}
