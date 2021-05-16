"use strict"

const csrfToken = document.getElementById("csrfToken").value;
const validateRoute = document.getElementById("validateRoute").value;
const tasksRoute = document.getElementById("tasksRoute").value;
const createRoute = document.getElementById("createRoute").value;
const deleteRoute = document.getElementById("deleteRoute").value;
const addRoute = document.getElementById("addRoute").value;
const universalMessage = document.getElementById("sendAllRoute").value;
const privateMessageRoute = document.getElementById("privateMessageRoute").value;
const logoutRoute = document.getElementById("logoutRoute").value;

function login() {
  const username = document.getElementById("loginName").value;
  const password = document.getElementById("loginPass").value;
  fetch(validateRoute, { 
		method: 'POST',
		headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
		body: JSON.stringify({ username, password })
	}).then(res => res.json()).then(data => {
    if(data) {
      document.getElementById("login-section").hidden = true;
      document.getElementById("task-section").hidden = false;
      document.getElementById("login-message").innerHTML = "";
      document.getElementById("create-message").innerHTML = "";
      loadTasks();
    } else {
      document.getElementById("login-message").innerHTML = "Login Failed";
    }
  });
}

function createUser() {
  const username = document.getElementById("createName").value;
  const password = document.getElementById("createPass").value;
  fetch(createRoute, { 
		method: 'POST',
		headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
		body: JSON.stringify({ username, password })
	}).then(res => res.json()).then(data => {
    if(data) {
      document.getElementById("login-section").hidden = true;
      document.getElementById("task-section").hidden = false;
      document.getElementById("login-message").innerHTML = "";
      document.getElementById("create-message").innerHTML = "";
      loadTasks();
    } else {
      document.getElementById("create-message").innerHTML = "User Creation Failed";
    }
  });
}

function loadTasks() {
  const ul = document.getElementById("task-list");
  ul.innerHTML = "";
  fetch(tasksRoute).then(res => res.json()).then(tasks => {
    for (let i = 0; i < tasks.length; ++i) {
      const li = document.createElement("li");
      const text = document.createTextNode(tasks[i]);
      li.appendChild(text);
      li.onclick = e => {
        fetch(deleteRoute, { 
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
          body: JSON.stringify(i)
        }).then(res => res.json()).then(data => {
          if(data) {
            document.getElementById("task-message").innerHTML = "";
            loadTasks();
          } else {
            document.getElementById("task-message").innerHTML = "Failed to delete.";
          }
        });
      }
      ul.appendChild(li);
    }
  });
}

function addTask() {
  let task = document.getElementById("newTask").value;
  fetch(addRoute, { 
		method: 'POST',
		headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
		body: JSON.stringify(task)
	}).then(res => res.json()).then(data => {
    if(data) {
      loadTasks();
      document.getElementById("newTask").value = "";
      document.getElementById("task-message").innerHTML = "";
    } else {
      document.getElementById("task-message").innerHTML = "Failed to add.";
    }
  });
}

function sendAll() {
  let allMsg = document.getElementById("sendAll").value; 
  fetch(universalMessage, {  //might need to be new route?
		method: 'POST',
		headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
		body: JSON.stringify(allMsg)
	}).then(res => res.json()).then(data => {
    if(data) {
      loadTasks();
      document.getElementById("newTask").value = "";
      document.getElementById("task-message").innerHTML = "";
      document.getElementById("sendAll-message").innerHTML = "";
    } else {
      document.getElementById("sendAll-message").innerHTML = "Failed to add.";
    }
  });
}

function sendPrivateMessage() {
  let reciever = document.getElementById("RecieverName").value; 
  let message = document.getElementById("privateMessage").value; 
  fetch(privateMessageRoute, {  //might need to be new route?
		method: 'POST',
		headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
		body: JSON.stringify({reciever,message})
	}).then(res => res.json()).then(data => {
    if(data) {
      console.log("data true")
      loadTasks();
      document.getElementById("newTask").value = "";
      document.getElementById("task-message").innerHTML = "";
      document.getElementById("sendAll-message").innerHTML = "";
      document.getElementById("send-Private-Message").innerHTML = "";
      document.getElementById("RecieverName").innerHTML = "";
      document.getElementById("privateMessage").innerHTML = "";
    } else {
      console.log("else case data")
      document.getElementById("send-Private-Message").innerHTML = "Failed to add.";
      document.getElementById("RecieverName").innerHTML = "";
      document.getElementById("privateMessage").innerHTML = "";
    }
  });
}

function logout() {
  fetch(logoutRoute).then(res => res.json()).then(tasks => {
    document.getElementById("login-section").hidden = false;
    document.getElementById("task-section").hidden = true;
  });
}