package playscala

import shared.SharedMessages
import org.scalajs.dom
import org.scalajs.dom.html
import slinky.web.ReactDOM
import slinky.web.html.h1

object ScalaJSExample {

  def main(args: Array[String]): Unit = {
    println("This is in Scala.js.")
    if (dom.document.getElementById("scalajsShoutOut") != null) {
      dom.document.getElementById("scalajsShoutOut").textContent = SharedMessages.itWorks
    }
  }
}
