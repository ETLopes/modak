package expo.modules.calendarreminder

import android.content.ContentValues
import android.provider.CalendarContract
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.util.TimeZone

class ExpoCalendarReminderModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoCalendarReminder")

    Function("addReminder") { title: String, description: String, startDate: Double, endDate: Double
      ->
      val contentResolver = appContext.reactContext?.contentResolver
      val calendarId = getPrimaryCalendarId()

      if (calendarId == null) {
        throw Exception("No calendar found.")
      }

      val eventValues =
              ContentValues().apply {
                put(CalendarContract.Events.DTSTART, startDate.toLong())
                put(CalendarContract.Events.DTEND, endDate.toLong())
                put(CalendarContract.Events.TITLE, title)
                put(CalendarContract.Events.DESCRIPTION, description)
                put(CalendarContract.Events.CALENDAR_ID, calendarId)
                put(CalendarContract.Events.EVENT_TIMEZONE, TimeZone.getDefault().id)
              }

      val uri = contentResolver?.insert(CalendarContract.Events.CONTENT_URI, eventValues)

      if (uri == null) {
        throw Exception("Failed to add event to calendar.")
      }
    }
  }

  private fun getPrimaryCalendarId(): String? {
    val projection = arrayOf(CalendarContract.Calendars._ID, CalendarContract.Calendars.IS_PRIMARY)

    val contentResolver = appContext.reactContext?.contentResolver

    val cursor =
            contentResolver?.query(
                    CalendarContract.Calendars.CONTENT_URI,
                    projection,
                    null,
                    null,
                    null
            )

    cursor.use {
      if (it != null) {
        while (it.moveToNext()) {
          val id = it.getString(it.getColumnIndexOrThrow(CalendarContract.Calendars._ID))
          val isPrimary = it.getInt(it.getColumnIndexOrThrow(CalendarContract.Calendars.IS_PRIMARY))
          if (isPrimary == 1) {
            return id
          }
        }
        if (it.moveToFirst()) {
          // Return the first calendar if no primary found
          return it.getString(it.getColumnIndexOrThrow(CalendarContract.Calendars._ID))
        }
      }
    }
    return null
  }
}
