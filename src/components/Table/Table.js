import React from 'react';
import './table.css'

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table: [],
    }
    this.intervalId = 0;
    this.canv = React.createRef();
    this.length = 10;
    this.cols = Math.trunc(this.props.width / 10);
    this.rows = Math.trunc(this.props.height / 10);
  }
  componentDidMount() {
    this.setState({
      table: this.createTable(),
    });
    this.intervalId = setInterval(this.timer.bind(this), 100)
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  timer() {
    this.setState({
      table: this.lifeCicle(),
    });
    console.log(1);
  }
  countNeighbords(table, r, c) {
    let sum = 0;
    for (let i = -1; i < 2; i += 1) {
      for (let j = -1; j < 2; j += 1) {
        let col = (c + j + this.cols) % this.cols;
        let row = (r + i + this.rows) % this.rows;
        sum += table[row][col];
      }
    }
    sum -= table[r][c];
    return sum;
  }
  lifeCicle() {
    const nextTable = this.make2DArray();
    const table = this.state.table;
    for (let r = 0; r < table.length; r += 1)
      for (let c = 0; c < table[0].length; c += 1) {
        const current = table[r][c];
        const count = this.countNeighbords(table, r, c);
        if (current === 0 && count === 3) {
          nextTable[r][c] = 1;
        } else if (current === 1 && (count < 2 || count > 3)) {
          nextTable[r][c] = 0;
        } else {
          nextTable[r][c] = current;
        }
      }
    this.drawTable(nextTable);
    return nextTable;
  }
  createTable() {
    const table = this.make2DArray();
    this.drawTable(table)
    return table;
  }
  drawTable(table) {
    const l = this.length;
    let ctx = this.canv.current.getContext("2d");

    for (let r = 0; r < table.length; r += 1)
      for (let c = 0; c < table[0].length; c += 1)
        if (table[r][c] === 0) {
          ctx.fillStyle = 'white';
          ctx.fillRect(c * l, r * l, l, l);
        } else {
          ctx.fillStyle = 'black';
          ctx.fillRect(c * l, r * l, l, l);
        }
  }
  random() {
    return Math.floor(Math.random() * Math.floor(2))
  }
  make2DArray() {
    let arr = (new Array(this.rows).fill(0))
      .map(el => el = new Array(this.cols).fill(0));
    for (let r = 0; r < arr.length; r += 1)
      for (let c = 0; c < arr[0].length; c += 1)
        arr[r][c] = this.random();
    return arr;
  }
  render() {
    return (
      <canvas ref={this.canv} width={this.props.width} height={this.props.height} />
    )
  }
}

export default Table;
