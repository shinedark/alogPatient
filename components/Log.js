import React, { Component } from 'react';
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

export default class Log extends Component {
  
  constructor(props) {
      super(props);
      this.state = {
        mood: "Positive",
        date: new Date().toLocaleString(),
        meds: false,
        description: '',
        log: '',
        logs:[]
    };
  }

  onValueChange(value: string) {
      this.setState({
        mood: value
      });
    }

  medCheck = () => {
    if (!this.state.meds) {
      this.setState({meds: true});
      console.log('cheked on');
    } else {
      this.setState({meds: false});
      console.log('cheked off');
    }
  }

  onChangeText = (key, val) => {
      this.setState({ [key]: val })
    }

  createLog = async () => {
      const log = this.state
      if (log.description === '' || log.log === '') return
      const logs = [...this.state.logs, log]
      this.setState({ logs, description: '', log: '', meds: false, mood:"Positive",  date: new Date().toLocaleString() })
      try {
        // await API.graphql(graphqlOperation(createPet, pet))
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
              <Input onChangeText={val => this.onChangeText('description', val)} />
            </Item>
          </Form>
          <Form>
              <Textarea  style={{margin: 3}} rowSpan={6} bordered placeholder="Log" onChangeText={val => this.onChangeText('log', val)} />
          </Form>
          <Form>
            <Picker
              mode="dropdown"
              iosHeader="Select Mood"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.mood}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Positive" value="Positive" />
              <Picker.Item label="Negative" value="Negative" />
              <Picker.Item label="Urgent" value="Urgent" />
              <Picker.Item label="Reminder" value="Reminder" />
            </Picker>
          </Form>
          <Form>
            <ListItem>
              <CheckBox checked={this.state.meds} color="blue" onPress={this.medCheck} />
                <Body>
                  <Text>Did you take any medication?</Text>
                </Body>
            </ListItem>
          </Form>
          <H3 style={{padding: 10}}>{this.state.date}</H3>
          <Button primary  full onPress={this.createLog}>
            <Text>Save Log</Text>
          </Button>
          {
                    this.state.logs.map((log, index) => (
                      <Card key={index} >
                        <CardItem><Text>{log.description}</Text></CardItem>
                        <CardItem><Text>{log.log}</Text></CardItem>
                        <CardItem><Text>{log.meds.toString()}</Text></CardItem>
                        <CardItem><Text>{log.date}</Text></CardItem>
                        <CardItem><Text>{log.mood}</Text></CardItem>
                      </Card>
                    ))
                  }
        </Content>
      </Container>
    );
  }
}