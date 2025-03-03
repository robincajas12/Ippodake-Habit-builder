package com.database

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Upsert

@Dao
interface LocalStorageDao {
    /*@Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(localStorage: LocalStorage) : Long*/
    @Query("SELECT * FROM LocalStorage where `key` = :key")
    fun getByKey(key : String) : List<LocalStorage>
    @Upsert
    fun upsert(localStorage: LocalStorage) : Long
    @Query("delete from LocalStorage where `key` = :key")
    fun deleteById(key: String) : Int
}