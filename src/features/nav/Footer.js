import React from 'react';
import { Container, Segment } from 'semantic-ui-react';

export default () => {
  return (
    <Segment
      inverted
      vertical
      style={{ margin: '5em 0em 0em', padding: '1em 0em' }}
    >
      <Container textAlign='center'>
        Copyright &copy; {new Date().getFullYear()} WALORA IGNITING DREAMS
        <br />
        Developer: Teboho Ea Teisi
      </Container>
    </Segment>
  );
};
