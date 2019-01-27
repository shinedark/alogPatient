import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text , Body, Title} from 'native-base';
import Log from './components/Log';
import Events from './components/Events';



import { withAuthenticator } from 'aws-amplify-react-native';
import { Auth } from 'aws-amplify';
import Amplify from '@aws-amplify/core';
import config from './aws-exports';

Amplify.configure(config)

class App extends React.Component {
  state = {
    username: '',
    password: '',
    phone_number: '',
    email: '',
    authCode: '',
    user: {}
  }
  async signUp() {
    const { username, password, email, phone_number } = this.state
    await Auth.signUp({
      username,
      password,
      attributes: { email, phone_number }
    })
    console.log('sign up successful!')
  }
  async confirmSignUp() {
    const { username, authCode } = this.state
    await Auth.configSignignUp(username, authCode)
    console.log('confirm sign up successful!')
  }
  async signIn() {
    const { username, password  } = this.state
    const user = await Auth.signIn(username, password)
    this.setState({ user })
    console.log('sign in successful!')

  }
  async confirmSignIn() {
    const { user, authCode } = this.state
    await Auth.configSignignIn(user, authCode)
    console.log('user now successfully signed in to the app!!')
  }
  
  

  render() {
    return (
      <Container>
        <Header hasTabs>
        <Body>
          <Title>Alog Patient</Title>
        </Body>
        </Header>
        <Tabs>
          <Tab heading={ <TabHeading><Icon name="ios-paper" /><Text>Log</Text></TabHeading>}>
            <Log />
          </Tab>
          <Tab heading={ <TabHeading><Icon name="ios-calendar" /><Text>Events</Text></TabHeading>}>
            <Events />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true });

