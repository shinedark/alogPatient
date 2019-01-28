import React, { Component } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { CardSection } from './common';
import { Text , Content , Card, Container} from 'native-base';

import API, { graphqlOperation  } from '@aws-amplify/api';




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
  constructor(props){
    super(props);
      this.state = {
        mood: '',
        date: '',
        meds: '',
        description: '',
        log: '',
        logs:[],
        refreshing: false,
      }
    }


  // async componentWillMount() {
  //   this. _onRefresh()
  //   }

  async _onRefresh () {
      try{
         const allLogs = await API.graphql(graphqlOperation(listLogs))
         console.log(allLogs)
         this.setState({ logs: allLogs.data.listLogs.items , refreshing: true})
       } catch(err){
         console.log('refreshed', err)
         this.setState({refreshing: false})
       }
    }

  render() {
    return (
      <Container>
        <Content>
            <ScrollView
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh()}
                      />
                    }
            >
            {
              this.state.logs.map((logsAdded, index) => (
                <Card key={index}>
                  <CardSection><Text>Description: {logsAdded.description}</Text></CardSection>
                  <CardSection><Text>Log: {logsAdded.log}</Text></CardSection>
                  <CardSection><Text>Did Take Meds: {logsAdded.meds.toString()}</Text></CardSection>
                  <CardSection><Text>Date: {logsAdded.date}</Text></CardSection>
                  <Card style={{backgroundColor: logsAdded.mood, padding: 10}}></Card>
                </Card>
              ))
            }
            </ScrollView>
        </Content>
      </Container>
    );
  }
}

