import './App.css';
import styled from 'styled-components';
import { useState } from 'react';
import Header from './components/Header/Header';
import { Props } from './Interface'



function App() {
  const [dark, setDark] = useState<boolean>(false)

  return (
    <Body dark={dark}>
      <Top dark={dark}>
        <Header setDark={setDark} dark={dark} />
        <Box2 dark={dark}>
        </Box2>
        <h2>test</h2>
        <h3>Test test</h3>
        <button>hello</button>
      </Top>
    </Body>
  );
}

export default App;


const Box = styled.div<Props>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.dark ? 'red' : 'green'};
`

const Box2 = styled.div<Props>`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: ${props => props.dark ? 'red' : 'green'};
`


const Top = styled.div<Props>`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.dark ? 'assets/bg-mobile-dark.jpg' : 'assets/bg-mobile-light.jpg'});
  transition: all .5s;
`

const Body = styled.div<Props>`
  height: 100vh;
  background-color: ${props => props.dark ? '#181723' : 'white'};
  transition: all .5s;
`