import React from 'react';
import Table from './components/Table/Table'
import Timer from './components/Timer/Timer';

class App extends React.Component {
  render() {
    return (
      <>
        <h1>Life!!</h1>
        <Timer />
        <Table width={400} height={400}/>
      </>
    )
  }
}

export default App;
