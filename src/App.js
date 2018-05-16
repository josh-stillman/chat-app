import React, { Component } from 'react';
import {Header, Grid, Container, Transition, Icon, Image} from 'semantic-ui-react'
import {UserView} from './containers/UserView'
import './App.css';

class App extends Component {
  
  constructor(){
    super();
    this.state = {
      users: [{id: 1, name: "Laura", image: 'https://react.semantic-ui.com/assets/images/avatar/small/veronika.jpg'}, {id: 2, name: "Rob", image: 'https://react.semantic-ui.com/assets/images/avatar/small/matthew.png'}],
      messageId: 0,
      log: [],
      user1Typing: false,
      user2Typing: false,
      user1TypingTimeout: null,
      user2TypingTimeout: null,
    };
  }

  
  postMessage = (message, user, time) => {
    let newLog = this.state.log;
    let newMessage = {id: this.state.messageId + 1, text: message, user: user, time: time}
    newLog.push(newMessage)
    this.setState({log: newLog, messageId: this.state.messageId + 1, [`user${user.id}Typing`]: false}, console.log("new log", this.state.log))
    
    if(this.state[`user${user.id}TypingTimeout`]){
      clearTimeout(this.state[`user${user.id}TypingTimeout`])
    }
  }
  
  indicateTyping = (user) => {
    if(!this.state[`user${user.id}Typing`]){
      this.setState({[`user${user.id}Typing`]: true})
    }
    if(this.state[`user${user.id}TypingTimeout`]){
      clearTimeout(this.state[`user${user.id}TypingTimeout`])
    }
    
    this.setState({[`user${user.id}TypingTimeout`]: setTimeout(() => { if (this.state[`user${user.id}Typing`]) {this.setState({[`user${user.id}Typing`]: false})}}, 1000)})
    
    //possibly have to set a timeoutgoing key in state.  
  }
  
  
  
  render() {
    return (
      <React.Fragment>
      <Header>
        Chat App
      </Header>
      <Container>
      <Grid columns='equal' divided relaxed padded centered stretched>
        <Grid.Column>
          <UserView user={this.state.users[0]} otherUser={this.state.users[1]} log={this.state.log} postMessage={this.postMessage} otherTyping={this.state.user2Typing} indicateTyping={this.indicateTyping}/>
        </Grid.Column>
        <Grid.Column>
          <UserView user={this.state.users[1]} otherUser={this.state.users[0]} log={this.state.log} postMessage={this.postMessage} otherTyping={this.state.user1Typing} indicateTyping={this.indicateTyping}/>
        </Grid.Column>
      </Grid>
      </Container>
      </React.Fragment>
    );
  }
}

export default App;