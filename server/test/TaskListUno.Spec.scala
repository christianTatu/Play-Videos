// import org.scalatestplus.play.PlaySpec
// import org.scalatestplus.play.guice.GuiceOneServerPerSuite
// import org.scalatestplus.play.OneBrowserPerSuite
// import org.scalatestplus.play.HtmlUnitFactory

// class TaskListUnoSpec extends PlaySpec with GuiceOneServerPerSuite with OneBrowserPerSuite with HtmlUnitFactory {
//   "Task list 3" must {
//     "create new user" in {
//     go to s"http://localhost:$port/load3"
//       pageTitle mustBe "Task List (Version 3)" 
//      click on "createName"
//       textField("createName").value = "a"
//       click on "createPass"
//       pwdField(id("createPass")).value = "b"
//       click on "CreateUserButton"
//       eventually {
//         pageTitle mustBe "Task List"
//         find(cssSelector("h2")).foreach(e => e.text mustBe "Task List")
//       }
//     }
//   }
// }

// //     click on "newTask"
// //       textField("newTask").value = "testTask"
// //     click on "addTaskButton"
  
// //       eventually {
// //         findAll(cssSelector("li")).toList.map(_.text) mustBe List("testTask")
        
// //         click on "sendAll"
// //         textField("sendAll").value = "sendAllTest" 
// //         click on "sendAllButton"
// //           eventually {
// //             findAll(cssSelector("li")).toList.map(_.text) mustBe List("testTask","sendAllTest")
// //               }
// //           }
    
// //     click on "RecieverName"
// //      textField("RecieverName").value = "web" 
// //     click on "privateMessage"
// //       textField("privateMessage").value = "TestPrivateMessage" 
// //     click on "sendPrivateMessageButton"
// //     }
// // "login and access tasks and logout" in {
// //       go to "http://localhost:$port/load3"
// //       pageTitle mustBe "Task List (Version 3)"
// //       click on "loginName"
// //       textField("loginName").value = "web"
// //       click on "loginPass"
// //       pwdField(id("loginPass")).value = "apps"
// //       eventually {
// //         find(cssSelector("h2")).foreach(e => e.text mustBe "Messages")
// //         findAll(cssSelector("li")).toList.map(_.text) mustBe List("messege from mlewis", "universal messege","sendAllTest", "TestPrivateMessage")
// //       }
// //       clickOn("logoutButtonJustForTestingHiMark")
// //       eventually {
// //         find(cssSelector("h2")).foreach(e => e.text mustBe "Login")
// //       }  
// //      }
// //     }  

