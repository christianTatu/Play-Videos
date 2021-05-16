import org.scalatestplus.play._
import models._

class TaskListInMemoryModelSpec extends PlaySpec {
  "TaskListInMemoryModel" must {
    "do valid login for default user" in {
      TaskListInMemoryModel.validateUser("mlewis", "prof") mustBe (true)
    }

    "reject login with wrong password" in {
      TaskListInMemoryModel.validateUser("mlewis", "password") mustBe (false)
    }

    "reject login with wrong username" in {
      TaskListInMemoryModel.validateUser("Mike", "pass") mustBe (false)
    }

    "reject login with wrong username and password" in {
      TaskListInMemoryModel.validateUser("Mike", "password") mustBe (false)
    }

    "get correct default tasks" in {
      TaskListInMemoryModel.getTasks("mlewis") mustBe (List("universal messege"))
    }

    "create new user with no tasks" in {
      TaskListInMemoryModel.createUser("Mike", "password") mustBe (true)
      TaskListInMemoryModel.getTasks("Mike") mustBe (Nil)
    }

    "create new user with existing name" in {
      TaskListInMemoryModel.createUser("mlewis", "password") mustBe (false)
    }

    "add new task for default user" in {
      TaskListInMemoryModel.addTask("mlewis", "testing")
      TaskListInMemoryModel.getTasks("mlewis") must contain ("testing")
    }

    "add new task for new user" in {
      TaskListInMemoryModel.addTask("Mike", "testing1")
      TaskListInMemoryModel.getTasks("Mike") must contain ("testing1")
    }

    "remove task from default user" in {
      TaskListInMemoryModel.removeTask("mlewis", TaskListInMemoryModel.getTasks("mlewis").indexOf("eat"))
      TaskListInMemoryModel.getTasks("mlewis") must not contain ("eat")
    }

    "send universal Message from mlewis" in {
      TaskListInMemoryModel.universalMessege("mlewis", "test Message")
      TaskListInMemoryModel.getTasks("mlewis") must contain ("test Message")
      TaskListInMemoryModel.getTasks("web") must contain ("test Message")
    }

    "Send Private Message from mlewis to Web" in {
      TaskListInMemoryModel.privateMessage("mlewis", "test Message", "web")
      TaskListInMemoryModel.getTasks("mlewis") must contain ("test Message")
      TaskListInMemoryModel.getTasks("web") must contain ("test Message")
    }
  }
}