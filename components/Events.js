import React, { Component } from 'react';
import { View} from 'react-native';
import { CardSection } from './common';
import { Text , Content , Card, Container} from 'native-base';

import API, { graphqlOperation } from '@aws-amplify/api';


const listLogs = `
  query Logs{
    listLogs{
      items{
        id
        log
        description
        mood
        date
        meds
      }
    }
  }`

export default class Events extends Component {
  
 state = {
        mood: '',
        date: '',
        meds: '',
        description: '',
        log: '',
        logs:[]
    }


  async componentDidMount() {
      try {
        const graphqldata = await API.graphql(graphqlOperation(listLogs))
        console.log('graphqldata:', graphqldata)
        this.setState({ logs: graphqldata.data.listLogs.items })
      } catch (err) {
        console.log('error: ', err)
      }
    }

  render() {
    return (
      <Container>
        <Content>
          {
            this.state.logs.map((logsAdded, index) => (
              <Card key={index}>
                <CardSection><Text>{logsAdded.description}</Text></CardSection>
                <CardSection><Text>{logsAdded.log}</Text></CardSection>
                <CardSection><Text>{logsAdded.meds.toString()}</Text></CardSection>
                <CardSection><Text>{logsAdded.date}</Text></CardSection>
                <Card style={{backgroundColor: logsAdded.mood, padding: 10}}></Card>
              </Card>
            ))
          }
        </Content>
      </Container>
    );
  }
}
