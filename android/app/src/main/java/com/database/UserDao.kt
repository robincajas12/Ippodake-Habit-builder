package com.database
import androidx.room.Dao
import androidx.room.Query
import androidx.room.Insert
import androidx.room.Update
import com.database.User
@Dao
interface UserDao {
    @Query("SELECT * FROM User LIMIT 1")
    fun getAll() : List<User>

    @Update
    fun updateUser(user : User)

    @Insert
    fun createUser(user: User)

}