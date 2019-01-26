import React, { Component } from 'react';
import { Container,Content, Form, Item, Input, Label } from 'native-base';

export default class Events extends Component {
  render() {
    return (
      <Container>
        
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}