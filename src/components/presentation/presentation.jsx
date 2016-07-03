import React, {Component} from 'react';
import createTheme from 'spectacle/lib/themes/default';
import {
  Appear, Code, Deck, Heading, ListItem, List, Slide, Spectacle, Text
} from 'spectacle';

import ItemHistory from '../item_history/item_history';

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
      <div className="presentation">
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
              <Appear>
                <Text>
                   Changing data stored inside objects using object methods.
                </Text>
              </Appear>
              <br></br>
              <Appear>
                <Text>
                   The state is stored in set of objects, which change over time,
                   and can trigger changes upon other objects.
                </Text>
              </Appear>
              <br></br>
              <Appear>
                <Text>
                  It's hard to determine exact state at given point a of time.
                  Which can lead to user interface inconsitencies, glitches.
                </Text>
              </Appear>
              <br></br>
              <Appear>
                <Text>
                  If you can't avoid it, abstract it.
                  <br></br>
                  Isolation heps as well.
                </Text>
              </Appear>
            </Slide>
            <Slide>
              <Heading size={4} fill caps textColor="#000000">
                Functional programming intro
              </Heading>
              <br></br>
              <List>
                <Appear>
                  <ListItem>
                    First class functions
                    <Text>
                      Function as first class entity, supports all operations
                      generally available to other entities.
                    </Text>
                  </ListItem>
                </Appear>
                <br></br>
                <Appear>
                  <ListItem>
                    Closures
                    <Text>
                      Function can refer to independent variables.
                    </Text>
                  </ListItem>
                </Appear>
                <br></br>
                <Appear>
                  <ListItem>
                    Higher-order functions
                    <Text>
                      Function can accept another function as an input
                      and return function as an output.
                    </Text>
                  </ListItem>
                </Appear>
                <br></br>
                <Appear>
                  <Text>composition, partial application, curry, caching</Text>
                </Appear>
              </List>
            </Slide>
            <Slide>
              <Heading size={4} fill caps textColor="#000000">
                Pure functions
              </Heading>
              <br></br>
              <Text>
                "A pure function is a function that, given the same input will always
                return the same output and does not have any observable side effect."
              </Text>
              <br></br>
              <List>
                <Appear>
                  <ListItem>No side effects</ListItem>
                </Appear>
                <Appear>
                  <ListItem>Refactoring</ListItem>
                </Appear>
                <Appear>
                  <ListItem>Testing</ListItem>
                </Appear>
                <Appear>
                  <ListItem>Portability</ListItem>
                </Appear>
              </List>
            </Slide>
            <Slide>
              <Heading size={4} fill caps textColor="#000000">
                Immutability
              </Heading>
              <br></br>
              <List>
                <Appear>
                  <ListItem>
                    Persistent data structures
                    <Text>
                      Data structure that always preserves the previous
                      version of itself when it is modified
                    </Text>
                  </ListItem>
                </Appear>
                <br></br>
                <Appear>
                  <ListItem>
                    Structural sharing
                    <Text>
                      What if we would only allocate memory for what's new
                      and reuse the rest?
                    </Text>
                  </ListItem>
                </Appear>
                <br></br>
                <Appear>
                  <ListItem>
                    Hash mapped array tries (HAMT)
                    <Text>
                      Tree data structure allowing structural sharing and is
                      optimized for retrieval.
                    </Text>
                  </ListItem>
                </Appear>
              </List>
            </Slide>
            <Slide>
              <Heading size={4} fill caps textColor="#000000">
                State management
              </Heading>
              <br></br>
              <Text>
                How to  create predictable application state?
              </Text>
              <br></br>
              <Appear>
                <Text>
                  Combine pure functions with immutability and add set of strict rules.
                </Text>
              </Appear>
              <br></br>
              <List>
                <Appear>
                  <ListItem>Single source of truth</ListItem>
                </Appear>
                <Appear>
                  <ListItem>Read-only state</ListItem>
                </Appear>
                <Appear>
                  <ListItem>State transitions as pure functions</ListItem>
                  {/* No side effect can occur during state transition */}
                </Appear>
              </List>
            </Slide>
            <Slide>
              <Heading size={4} fill caps textColor="#000000">
                Rendering
              </Heading>
              <br></br>
              <Appear>
                <Text>
                  User interface as a function on data:
                  <br></br>
                  <br></br>
                  <Code>UI = f(data)</Code>
                  {/* Root: an empty scene */}
                </Text>
              </Appear>
              <br></br>
              <Appear>
                <Text>
                  <Code>UI = f(g(x), h(y))</Code>
                </Text>
              </Appear>
              <br></br>
              <Appear>
                <Text>
                  <Code>UI = f([g, h], data)</Code>
                  {/* User interface composition just like function composition */}
                </Text>
              </Appear>
            </Slide>
            <Slide>
              <Heading size={4} fill caps textColor="#000000">
                Demo time!
              </Heading>
              <br></br>
              <div className="presentation__demo">
                <ItemHistory initialValue="dark" />
                <ItemHistory initialValue="magic" />
              </div>
            </Slide>
            <Slide>
              <Heading size={4} fill caps textColor="#000000">
                Can we go any further?
              </Heading>
              <br></br>
              <List>
                <Appear>
                  <ListItem>
                    Interactive programming
                    <Text>
                      Immidiate feedback achieved by hot-swapping program logic.
                      {/* Pure functions, immutable data, predictable state */}
                    </Text>
                  </ListItem>
                </Appear>
                <br></br>
                <Appear>
                  <ListItem>
                    Concurent programming
                    <Text>
                      Avoiding multithreading locking by using functions without
                      side effects operating on immutable data.
                    </Text>
                  </ListItem>
                </Appear>
                <br></br>
              </List>
            </Slide>
            <Slide>
              <Heading size={4} fill caps textColor="#000000">
                Drawbacks
              </Heading>
              <br></br>
              <List>
                <Appear>
                  <ListItem>
                    Thinking mindshift and different program constructs.
                    {/* composition */}
                  </ListItem>
                </Appear>
                <br></br>
                <Appear>
                  <ListItem>
                    Higher level abstraction and thinking in abstractions.
                  </ListItem>
                </Appear>
                <br></br>
                <Appear>
                  <ListItem>Can degrade performance if not used correctly.</ListItem>
                </Appear>
                <br></br>
                <Appear>
                  <ListItem>Requires discipline.</ListItem>
                </Appear>
              </List>
            </Slide>
            <Slide>
              <Heading size={2} fill caps textColor="#000000">
                Thank you
              </Heading>
            </Slide>
          </Deck>
        </Spectacle>
      </div>
    );
  }
}
