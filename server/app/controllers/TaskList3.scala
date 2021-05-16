package controllers

import javax.inject._

import play.api.mvc._
import play.api.i18n._
import models.TaskListInMemoryModel
import play.api.libs.json._
import models._

@Singleton
class TaskList3 @Inject() (cc: ControllerComponents) extends AbstractController(cc) {
  def load = Action { implicit request =>
    Ok(views.html.version3Main())
  }

  implicit val userDataReads = Json.reads[UserData]
  implicit val privMessageReads = Json.reads[PrivMessage]

  def withJsonBody[A](f: A => Result)(implicit request: Request[AnyContent], reads: Reads[A]) = {
    request.body.asJson.map { body =>
      Json.fromJson[A](body) match {
        case JsSuccess(a, path) => f(a)
        case e @ JsError(_) => 
        println("e ="+e)
        Redirect(routes.TaskList3.load())
      }
    }.getOrElse(Redirect(routes.TaskList3.load()))
  }

  def withSessionUsername(f: String => Result)(implicit request: Request[AnyContent]) = {
    request.session.get("username").map(f).getOrElse(Ok(Json.toJson(Seq.empty[String])))
  }

  def validate = Action { implicit request =>
    withJsonBody[UserData] { ud =>
      if (TaskListInMemoryModel.validateUser(ud.username, ud.password)) {
        Ok(Json.toJson(true))
          .withSession("username" -> ud.username, "csrfToken" -> play.filters.csrf.CSRF.getToken.map(_.value).getOrElse(""))
      } else {
        Ok(Json.toJson(false))
      }
    }
  }

  def createUser = Action { implicit request =>
    withJsonBody[UserData] { ud =>
      if (TaskListInMemoryModel.createUser(ud.username, ud.password)) {
        Ok(Json.toJson(true))
          .withSession("username" -> ud.username, "csrfToken" -> play.filters.csrf.CSRF.getToken.map(_.value).getOrElse(""))
      } else {
        Ok(Json.toJson(false))
      }
    }
  }

  def taskList = Action { implicit request =>
    withSessionUsername { username =>
      Ok(Json.toJson(TaskListInMemoryModel.getTasks(username)))
    }
  }

  def addTask = Action { implicit request =>
    withSessionUsername { username =>
      withJsonBody[String] { task =>
        TaskListInMemoryModel.addTask(username, task);
        Ok(Json.toJson(true))
      }
    }
  }

  def sendAll = Action { implicit request =>
    println("sending All")
    withSessionUsername { username =>
      withJsonBody[String] { allMsg =>
        TaskListInMemoryModel.universalMessege(username, allMsg);
        Ok(Json.toJson(true))
      }
    }
  }
  def privateMessage = Action { implicit request =>
    println("privateMessage Called in TL3")
    println(request.body.toString())
    withSessionUsername { username =>
      withJsonBody[PrivMessage] { privateMessage =>
        println("private message ="+privateMessage);
        TaskListInMemoryModel.privateMessage(username, privateMessage.message, privateMessage.reciever);

        Ok(Json.toJson(true))
      }
    }
  }

  def delete = Action { implicit request =>
    withSessionUsername { username =>
      withJsonBody[Int] { index =>
        TaskListInMemoryModel.removeTask(username, index)
        Ok(Json.toJson(true))
      }
    }
  }

  def logout = Action { implicit request =>
    Ok(Json.toJson(true)).withSession(request.session - "username")
  }
}