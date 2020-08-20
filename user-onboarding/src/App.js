import React from 'react';
import './App.css';
import Form from './Components/Form';
import styled from 'styled-components';

function App() {
  return (
    <StyledDiv className="App">
      <h1> User On-Boarding</h1>
      <Form/>
    </StyledDiv>
  );
}

export default App;

const StyledDiv = styled.div`
h1 {
  color:lightgreen;
  font-size:4rem;
}
`;