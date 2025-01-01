package com.utils

import java.util.Calendar
import java.util.Date

class TimeUtil {
    object today
    {
        fun getStartOfToday(): java.util.Date {
            val calendar = Calendar.getInstance()
            calendar.time = Date()
            calendar.set(Calendar.HOUR_OF_DAY, 0)
            calendar.set(Calendar.MINUTE, 0)
            calendar.set(Calendar.SECOND, 0)
            calendar.set(Calendar.MILLISECOND, 0)
            return calendar.time
        }
    }
}