import './App.css';
import styled from 'styled-components';

function App() {
  return (
    <div className="App">
      <h1>Hello world</h1>
      <Box></Box>
    </div>
  );
}

export default App;


const Box = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: red;
`