import React, {Component} from 'react';
import createTheme from 'spectacle/lib/themes/default';
import {
  Appear, BlockQuote, Cite, Code, CodePane, Deck, Fill, Heading, Image, Layout,
  Link, ListItem, List, Markdown, Quote, Slide, Spectacle, Text
} from 'spectacle';

import ItemListHistory from '../item_history/item_histoty';

const theme = createTheme({
  primary: '#BADA55'
}, {
  primary: 'Ubuntu'
});

export default class Presentation extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <Spectacle theme={theme}>
        <Deck transition={['slide']} progress="bar" transitionDuration={300}>
          <Slide>
            <Heading size={2} fill caps textColor="#000000">
              Functional programming for user interfaces
            </Heading>
          </Slide>
          <Slide>
            <Heading size={4} fill caps textColor="#000000">
              The problem: Mutation
            </Heading>
            <br></br>
            <Appear fid="1">
              <List>
                <ListItem>Can't avoid it</ListItem>
                <ListItem>Can abstract it</ListItem>
              </List>
            </Appear>
            <br></br>
            <Appear fid="2">
              <Text>
                 Mutating data stored inside objects using object methods.
              </Text>
            </Appear>
            <br></br>
            <Appear fid="3">
              <Text>
                 Transfroming data using functions which accept data and return new data.
              </Text>
            </Appear>
          </Slide>
          <Slide>
            <Heading size={4} fill caps textColor="#000000">
              Functional programming intro
            </Heading>
            <br></br>
            <List>
              <Appear fid="1">
                <ListItem>First class functions</ListItem>
              </Appear>
              <br></br>
              <Appear fid="2">
                <ListItem>Higher-order functions</ListItem>
              </Appear>
              <br></br>
              <Appear fid="3">
                <ListItem>Pure functions</ListItem>
              </Appear>
            </List>
          </Slide>
          <Slide>
            <Heading size={4} fill caps textColor="#000000">
              Pure functions
            </Heading>
          </Slide>
          <Slide>
            <Heading size={4} fill caps textColor="#000000">
              Immutability
            </Heading>
          </Slide>
          <Slide>
            <Heading size={4} fill caps textColor="#000000">
              State management
            </Heading>
            <br></br>
            <Appear fid="1">
              <Text>
                Combine pure functions, immutability, and add strict rules on data flow
              </Text>
            </Appear>
          </Slide>
          <Slide>
            <Heading size={4} fill caps textColor="#000000">
              Rendering
            </Heading>
            <Text>
              User interface as a function on data:
            </Text>
            <br></br>
            <Text>
              <Code>UI = f(data)</Code>
            </Text>
            <br></br>
            <Text>
              <Code>UI = f(f(x), f(y))</Code>
            </Text>
          </Slide>
          <Slide>
            <Heading size={4} fill caps textColor="#000000">
              Demo time!
            </Heading>
            <br></br>
            <div className="presentation__demo">
              <ItemListHistory />
              <ItemListHistory />
            </div>
          </Slide>
          <Slide>
            <Heading size={2} fill caps textColor="#000000">
              Thank you
            </Heading>
          </Slide>
        </Deck>
      </Spectacle>
    );
  }
}
