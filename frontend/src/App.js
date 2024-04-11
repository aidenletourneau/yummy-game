import './App.css'
import Title from './components/Title'
import Game from './components/Game'
import {useState} from 'react'

function App() {


  //false is title screen, true is the game
  const [state, setState] = useState(false)


  if(!state){
    return (
      <div className="App">
        <Title appState={setState}/>
      </div>
    );
  }
  return (
    <div className="App">
      <Game appState={setState}/>
    </div>

  );
}

export default App;
