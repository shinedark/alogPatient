import React, { Component } from 'react';
import { CardSection } from './common';
import { Text , Content , Card, Container} from 'native-base';

import API, { graphqlOperation  } from '@aws-amplify/api';
import * as queries from '../graphql/queries';
<<<<<<< HEAD
// import * as Subscription from '../graphql/subscriptions';
=======
import * as subscriptions from '../graphql/subscriptions';
>>>>>>> 4a2341de5f12914bc357b75f8195ae9a67d1c164




// const listLogs = `
//   query Logs{
//     listLogs{
//       items{
//         id
//         log
//         description
//         mood
//         date
//         meds
//       }
//     }
//   }`

 

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
      }
    }
    // const log = logData.value.data.onCreateLog;
    //       const logs = [
    //         ...this.state.logs.filter(l => {
    //           const val1 = l.log + l.description
    //           const val2 = log.log + log.description
    //           return val1 !== val2
    //         }),
    //         log
    //       ]
    //       this.setState({ logs })
        


  async componentWillMount() {
    try{
       const allLogs = await API.graphql(graphqlOperation(queries.listLogs))
<<<<<<< HEAD
       console.log(allLogs)
       this.setState({ logs: allLogs.data.listLogs.items})
=======
       // console.log(allLogs)
       this.setState({ logs: allLogs.data.listLogs.items})
       const subscription = API.graphql(
           graphqlOperation(subscriptions.onCreateLog)
       ).subscribe({
           next: (logData) => {
            console.log(logData)
            const log = logData.value.data.onCreateLog
            const logs = [
              ...this.state.logs.filter(l =>{
                const val1 = l.meds + l.description
                const val2 = log.meds + log.description
                return val1 !== val2
              }),
              log
            ]
            this.setState({logs})
          }
       });
>>>>>>> 4a2341de5f12914bc357b75f8195ae9a67d1c164
     } catch(err){
       console.log(err)
       
     }
    }


  render() {
    return (
      <Container>
        <Content>
            {
              this.state.logs.map((logsAdded, index) => (
                <Card key={index}>
                  <CardSection><Text>Description: {logsAdded.description}</Text></CardSection>
                  <CardSection><Text>Log: {logsAdded.log}</Text></CardSection>
                  <CardSection><Text>Did Take Meds: {logsAdded.meds}</Text></CardSection>
                  <CardSection><Text>Date: {logsAdded.date}</Text></CardSection>
                  <Card style={{backgroundColor: logsAdded.mood, padding: 10}}></Card>
                </Card>
              ))
            }
        </Content>
      </Container>
    );
  }
}

