import React, { Component } from 'react';
import { View} from 'react-native';
import { 
  Container, 
  Content,  
  Button, 
  Form, 
  Item, 
  Input, 
  Label , 
  Textarea, 
  H3,  
  CheckBox, 
  ListItem, 
  Body, 
  Text,
  Picker,
  Icon ,
  Card,
  CardItem,

} from 'native-base';

import API, { graphqlOperation } from '@aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';


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
  
const createLog = `
  mutation($description: String, $log: String, $mood: String, $date: String , $meds: String ) {
    createLog(input: {
      log: $log
      description: $description
      mood: $mood
      date: $date
      meds: $meds
  }) {
    id
    log
    description
    mood
    date
    meds
  }
}`

export default class Log extends Component {
  
  constructor(props) {
      super(props);
      this.state = {
        mood: '',
        date: '',
        medsCheckY: false,
        medsCheckN: false,
        meds: '',
        description: '',
        log: '',
        logs:[]
    };
  }

  async componentDidMount() {
    this.setState({date : new Date().toLocaleString()})

      try {
        const graphqldata = await API.graphql(graphqlOperation(queries.listLogs))
        // console.log('graphqldata:', graphqldata)
        this.setState({ logs: graphqldata.data.listLogs.items })
      } catch (err) {
        console.log('error: ', err)
      }
    }

  // onValueChange = (value: string) {
  //     this.setState({mood: value});
  // }
  onValueChange = (value: string) => {
    this.setState({mood: value});
  }

 

  medCheckN = () => {
    if (!this.state.medsCheckN) {
      this.setState({medsCheckN: true,medsCheckY: false, meds:'No' });
      console.log('cheked on');

    } else {
      this.setState({medsCheckN: false,medsCheckY: true, meds:'Yes' });
      console.log('cheked off');
    }
  }

  

  onChangeText = (key, val) => {
      this.setState({ [key]: val})
    }

  createLog = async () => {

      const logsAdded = this.state
      if (logsAdded.description === '' || logsAdded.log === ''|| logsAdded.date === '' ||logsAdded.mood === ''||logsAdded.meds === '') return
      const logs = [...this.state.logs, logsAdded]
      this.setState({ logs, description: '', log: '',  mood:'',  date: '',  medsCheckN: false  ,medsCheckY: false  , meds: '' })
      try {
        await API.graphql(graphqlOperation(createLog, logsAdded))
        console.log('logs successfully created.')
      } catch (err) {
        console.log('error creating log..', err)
      }
    }


  render() {
    return (
      <Container>
        
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Description</Label>
              <Input onChangeText={val => this.onChangeText('description', val)} value={this.state.description} />
            </Item>
          </Form>
          <Form>
              <Textarea  style={{margin: 3}} rowSpan={6} bordered placeholder="Log" onChangeText={val => this.onChangeText('log', val)}  value={this.state.log}/>
          </Form>
          <Form>
            <Body style={{margin: 9}}>
              <Text>Mood</Text>
            </Body>
            <Picker
              mode="dropdown"
              iosHeader="Select Mood"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: 300 }}
              selectedValue={this.state.mood}
              onValueChange={this.onValueChange}
              label="What's your mood"
            >
              <Picker.Item label="Positive" value='green' />
              <Picker.Item label="Negative" value='blue' />
              <Picker.Item label="Urgent" value='red' />
              <Picker.Item label="Reminder" value='yellow' />
            </Picker>
          </Form>
          <Form>
            <Body>
              <Text>Did you take any medication?</Text>
            </Body>
            <ListItem>
              <Body>
                <Text>Yes</Text>
              </Body>
              <CheckBox checked={this.state.medsCheckN} color="blue" onPress={this.medCheckN} />
              <Body>
                <Text>No</Text>
              </Body>
              <CheckBox checked={this.state.medsCheckY} color="blue" onPress={this.medCheckN} />
                
            </ListItem>
          </Form>
          <H3 style={{padding: 10}}>{this.state.date}</H3>
          <Button primary  full onPress={this.createLog}>
            <Text>Save Log</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
