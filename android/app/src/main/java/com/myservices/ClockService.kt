package com.myservices

import android.app.Service
import android.content.Intent
import android.os.IBinder

class ClockService : Service() {

    override fun onBind(p0: Intent?): IBinder? {
        return null
    }
}