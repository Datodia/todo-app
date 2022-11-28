import './App.css';
import styled from 'styled-components';
import { useState } from 'react';
import Header from './components/Header/Header';
import { Props } from './Interface'
import { TodoList } from './components/TodoList/TodoList';



function App() {
  const [dark, setDark] = useState<boolean>(false)

  return (
    <Body dark={dark}>
      <Top dark={dark}>
        <Header setDark={setDark} dark={dark} />
        <TodoList dark={dark} />
      </Top>
    </Body>
  );
}

export default App;

const Top = styled.div<Props>`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.dark ? 'assets/bg-mobile-dark.jpg' : 'assets/bg-mobile-light.jpg'});
  transition: all .5s;
`

const Body = styled.div<Props>`
  min-height: 100vh;
  overflow: auto;
  background-color: ${props => props.dark ? '#181723' : 'white'};
  transition: all .5s;
`