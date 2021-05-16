import org.scalatestplus.play.PlaySpec
import org.scalatestplus.play.guice.GuiceOneServerPerSuite
import org.scalatestplus.play.OneBrowserPerSuite
import org.scalatestplus.play.HtmlUnitFactory

class TaskList3Spec extends PlaySpec with GuiceOneServerPerSuite with OneBrowserPerSuite with HtmlUnitFactory {
  "Task list 3" must {
    "login and access functions" in {
      go to s"http://localhost:$port/load3"
      pageTitle mustBe "Task List (Version 3)"
      click on "createName"
      textField("createName").value = "a"
      click on "createPass"
      pwdField(id("password-login")).value = "b"
      submit()
      eventually {
        pageTitle mustBe "Task List"
        find(cssSelector("h2")).foreach(e => e.text mustBe "Task List")
        findAll(cssSelector("li")).toList.map(_.text) mustBe List("Make videos", "eat","sleep","code")
      }
    }
  }  
}
