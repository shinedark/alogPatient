import React, { Component } from 'react';
import { View, Alert} from 'react-native';
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
        mood: 'Positive',
        date: new Date().toLocaleString(),
        medsCheck: false,
        meds: '',
        description: '',
        log: '',
        logs:[]
    };
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

  onValueChange(value: string) {
      this.setState({
        mood: value
      });
    }

  medCheck = () => {
    if (!this.state.meds) {
      this.setState({medsCheck: true, meds:'Yes' });
      console.log('cheked on');

    } else {
      this.setState({medsCheck: false, meds: 'No'});
      console.log('cheked off');
    }
  }

  onChangeText = (key, val) => {
      this.setState({ [key]: val })
    }

  createLog = async () => {
      const logsAdded = this.state
      if (logsAdded.description === '' || logsAdded.log === ''|| logsAdded.date === ''||logsAdded.meds === true) return
      const logs = [...this.state.logs, logsAdded]
      this.setState({ logs, description: '', log: '',  mood:'',  date: '',  meds: false  })
      Alert.alert('Log Saved')
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
            <Picker
              mode="dropdown"
              iosHeader="Select Mood"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: 300 }}
              selectedValue={this.state.mood}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Positive" value='Positive' />
              <Picker.Item label="Negative" value='Negative' />
              <Picker.Item label="Urgent" value='Urgent' />
              <Picker.Item label="Reminder" value='Reminder' />
            </Picker>
          </Form>
          <Form>
            <ListItem>
              <CheckBox checked={this.state.medsCheck} color="blue" onPress={this.medCheck} />
                <Body>
                  <Text>Did you take any medication?</Text>
                </Body>
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
