package models

import collection.mutable

object TaskListInMemoryModel {
  private val users = mutable.Map[String, String]("mlewis" -> "prof","web" -> "apps")
  private val tasks = mutable.Map[String, List[String]]("mlewis" -> List("universal messege"), ("web") -> List("messege from mlewis", "universal messege"))
  
  def validateUser(username: String, password: String): Boolean = {
    users.get(username).map(_ == password).getOrElse(false)
  }
  
  def createUser(username: String, password: String): Boolean = {
    if (users.contains(username)) false else {
      users(username) = password
      true
    }
  }
  
  def getTasks(username: String): Seq[String] = {
    tasks.get(username).getOrElse(Nil)
  }
  
  def addTask(username: String, task: String): Unit = {
    tasks(username) = task :: tasks.get(username).getOrElse(Nil)
     println(tasks)
  }

  def universalMessege(sender: String, messege: String): Unit = {
    val msgSender = ""+sender+": "+messege
    println("before")
    println("adding extra text please print UM in TLMM")
    println(users)
    println(tasks)
    for(user <- tasks.keys){
      addTask(user,msgSender)
    }
    println("after")
    println(users)
    println(tasks)
    //tasks(username) = task :: tasks.get(username).getOrElse(Nil)
  }

    def privateMessage(sender: String, message: String, reciever: String): Unit = {
      val msgSender = "PRIVATE MESSAGE:"+sender+": "+message
      println("private message before")
      println(users)
      println(tasks)
      for(user <- tasks.keys){
         println("sender user ="+user)
         println("reciever = "+reciever)
        if(user == reciever){
          println("if statement hits")
          addTask(user,msgSender)
        }
      }
      println("private message after")
      println(users)
      println(tasks)
    //tasks(username) = task :: tasks.get(username).getOrElse(Nil)
  }
  
  def removeTask(username: String, index: Int): Boolean = {
    if (index < 0 || tasks.get(username).isEmpty || index >= tasks(username).length) false 
    else {
      tasks(username) = tasks(username).patch(index, Nil, 1)
      true
    }
  }
}