package com.mynativemodules

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class NativeLevelHandlerPackage : TurboReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? =
        if(name == NativeLevelHandlerModule.NAME)
        {
            NativeLevelHandlerModule(reactContext)
        } else
        {
            null
        }


    override fun getReactModuleInfoProvider()= ReactModuleInfoProvider {
        mapOf(NativeLevelHandlerModule.NAME to ReactModuleInfo(
            _name = NativeLevelHandlerModule.NAME,
            _className = NativeLevelHandlerModule.NAME,
            _canOverrideExistingModule = false,
            _needsEagerInit = false,
            isCxxModule = false,
            isTurboModule = true
        )
        )
    }
}