import React from 'react';
import './App.css';
import * as Tone from 'tone';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      example: true
    };
  //  this.someFunction= this.someFunction.bind(this)
  };
 // componentDidMount() {document.addEventListener("click", this.someFunction)}
  //componentWillUnmount() {document.removeEventListener("click", this.someFunction)}

  //someFunction(event) {this.setState({example: false})}



  render () {
  
  //const mappedOutput = this.state.array.map(i => <li>{i}</li>);
  

  //create a synth and connect it to the main output (your speakers)
const synth = new Tone.Synth().toDestination();
const now = Tone.now();

//play a middle 'C' for the duration of an 8th note
synth.triggerAttackRelease("E4", "8n", now);
synth.triggerAttackRelease("E4", "8n", now + .25);
synth.triggerAttackRelease("E4", "8n", now + .5);
synth.triggerAttackRelease("C4", "8n", now + .75);
synth.triggerAttackRelease("E4", "8n", now + 1);
synth.triggerAttackRelease("G4", "8n", now + 1.25);
synth.triggerAttackRelease("G3", "8n", now + 1.75);

  return (
    <div className="App">
      <h1>Hello World!</h1>
    </div>
  );
}
}


export default App;