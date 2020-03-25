import React from 'react';
import Table from './components/Table/Table'
import Timer from './components/Timer/Timer';

class App extends React.Component {
  render() {
    return (
      <>
        <h1>Игра «Жизнь»</h1>
        <p>Игра «Жизнь» (англ. Conway's Game of Life) — клеточный автомат, <br/>придуманный английским математиком Джоном Конвеем в 1970 году.</p>
        <Timer />
        <Table width={600} height={600}/>
      </>
    )
  }
}

export default App;
