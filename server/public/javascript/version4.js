console.log("Running js");

const ce = React.createElement;

const csrfToken = document.getElementById("csrfToken").value;
const validateRoute = document.getElementById("validateRouteC").value;
const createRoute = document.getElementById("createUserRouteC").value;
const logoutRoute = document.getElementById("logoutRouteC").value;
const taskListRoute = document.getElementById("taskListRouteC").value;
const universalMessageRoute = document.getElementById("universalMessageRouteC").value;
const privateMessageRoute = document.getElementById("privateMessageRouteC").value;
// console.log(exercisesRoute);

const pages = {
    LOGINPAGE: "login",
    MESSAGES: "messages",
};


class ChatApp extends React.Component {
    
    
    constructor(props) {
        super(props);
        this.state = {mode: pages.LOGINPAGE};
    }
    
    changeMode(newMode) {
        switch (newMode) {
            case pages.LOGINPAGE:
                this.state.mode = pages.LOGINPAGE;
            case pages.MESSAGES:
                this.state.mode = pages.MESSAGES;
            case !pages:
                console.log("Big Errors");
        }
    }
    
    render() {
        // console.log(this.state.mode);
        switch (this.state.mode) {
            case pages.LOGINPAGE:
                return(ce(LoginComponent, {toHome: () => this.setState({mode: pages.MESSAGES})}));
            case pages.MESSAGES:
                return ce(MessagesComponent , {toHome: () => this.setState({mode: pages.LOGINPAGE})});
            case !pages:
                console.log("mode is wrong");
                return ce('div', null, 'asdf');
        }

    }
}

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props);
        this.state = {
            loginName: "",
            loginPass: "",
            createName: "",
            createPass: "",
            loginMessage: "",
            createMessage: ""
        };
    }

    render() {
        return ce('div', null,
        ce('h2', null, 'Login:'),
        ce('br'),
        'Username: ',
        ce('input', {type: "text", id: "loginName", value: this.state.loginName, onChange: e => this.changerHandler(e)}),
        ce('br'),
        'Password: ',
        ce('input', {type: "password", id: "loginPass", value: this.state.loginPass, onChange: e => this.changerHandler(e)}),
        ce('br'),
        ce('button', {onClick: e => this.login(e)}, 'Login'),
        ce('span', {id: "login-message"}, this.state.loginMessage),
        ce('h2', null, 'Create User:'),
        ce('br'),
        'Username: ',
        ce('input', {type: "text", id: "createName", value: this.state.createName, onChange: e => this.changerHandler(e)}),
        ce('br'),
        'Password: ',
        ce('input', {type: "password", id: "createPass", value: this.state.createPass, onChange: e => this.changerHandler(e)}),
        ce('br'),
        ce('button', {onClick: e => this.createUser(e)}, 'Create User'),
        ce('span', {id: "create-message"}, this.state.createMessage)//,
        // ce('img', {src: {traps}})
      );
    }

    changerHandler(e) {
        this.setState( { [e.target['id']]: e.target.value});
    }

    login(e) {
        const username = this.state.loginName;
        const password = this.state.loginPass;
        fetch(validateRoute, { 
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
        body: JSON.stringify({ username, password })
        }).then(res => res.json()).then(data => {
        if(data) {
            // console.log("no porblem");
            console.log(this.props)
            this.props.toHome();
        } else {
            this.setState({ loginMessage: "Login Failed" });
        }
        });
    }

    createUser(e) {
        const username = this.state.createName;
        const password = this.state.createPass;
        fetch(createRoute, { 
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
        body: JSON.stringify({ username, password })
        }).then(res => res.json()).then(data => {
        if(data) {
            // console.log("Hello");
            this.props.toHome();
        } else {
            this.setState({ createMessage: "User Creation Failed"});
        }
        });
    }

}

class MessagesComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inbox: [],
            universalMessage: "",
            privateMessage: "",
            reciever: ""
        };
    }
    
    componentDidMount() {
      this.loadMessages();
    }

    loadMessages(){
      fetch(taskListRoute).then(res => res.json()).then(inbox => this.setState({ inbox }));
    }

  
    render() {
      return ce('div', null, 
        'Messages',
        ce('br'),
        ce('ul', null,
          this.state.inbox.map((task, index) => ce('li', { key: index }, task))
        ),
        ce('br'),
        ce('div', null,
        "Universal Message",
          ce('input', {type: 'text', id: "universalMessage", value: this.state.universalMessage, onChange: e => this.handleChange(e) }),
          ce('button', {onClick: e => this.universalMessage(e)}, 'Add Message'),
        ),

        ce('div', null,
        "Reciever",
        ce('input', {type: 'text',id: "reciever", value: this.state.reciever, onChange: e => this.handleChange(e) }),
        ),

        ce('div', null,
        "Private Message",
          ce('input', {type: 'text',id: "privateMessage", value: this.state.privateMessage, onChange: e => this.handleChange(e) }),
          ce('button', {onClick: e => this.privateMessage(e)}, 'Send Private Message'),
        ),
        ce('br'),
        ce('button', { onClick: e => this.doLogout() }, 'Log out')
      );
    }

    doLogout() {
      fetch(logoutRoute);
      this.props.toHome();
    }

    handleChange(e) { 
      //console.log("handleChange called")
      this.setState( { [e.target['id']]: e.target.value}); }

    // changerHandler(e) {
    //     this.setState( { [e.target['id']]: e.target.value});
    // }

    universalMessage(e) {
      const message = this.state.universalMessage;
      console.log(message);
      fetch(universalMessageRoute, { 
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
      body: JSON.stringify(message)
      }).then(res => res.json()).then(data => {
      if(data) {
          this.loadMessages();
      } else {
          console.log("data = false in buildWorkout submit info ");
      }
      });
    }

    privateMessage(e) {
      const message = this.state.privateMessage;
      const reciever = this.state.reciever;
      fetch(privateMessageRoute, { 
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
      body: JSON.stringify({reciever, message})
      }).then(res => res.json()).then(data => 
      { if(data) {
          this.setState({ createMessage: "succesfull sent"}) }
        else 
        { this.setState({ createMessage: "failed 2 send"})
        }});
    }

}

ReactDOM.render(
    ce(ChatApp, null, null),
    document.getElementById("react-root")
);