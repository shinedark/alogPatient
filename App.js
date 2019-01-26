import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text , Body, Title} from 'native-base';
import Log from './components/Log';
import Events from './components/Events';
import Progress from './components/Progress';

export default class TabsAdvancedExample extends Component {
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
          <Tab heading={ <TabHeading><Icon name="apps" /><Text>Progress</Text></TabHeading>}>
            <Progress />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}