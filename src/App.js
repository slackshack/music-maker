import React from 'react';
import './App.css';
import * as Tone from 'tone';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      submit: '',
      user_adj: [],
      user_noun: []
    };
this.handleChange = this.handleChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
//this.getSelections = this.getSelections.bind(this);
  //  this.someFunction= this.someFunction.bind(this)
  };
 // componentDidMount() {document.addEventListener("click", this.someFunction)}

componentDidMount() {
  this.getSelections();
  //this.playTrack();
  this.getIp();
};


getSelections = () => {
  fetch("http://localhost:5000/api/selections")
    .then(res => res.json())
    .then((result) => {
console.log(result[0])
console.log(result[0].user_adj)
        this.setState({
          user_adj: result[0].user_adj,
          user_noun: result[0].user_noun
        });
      }
      ,(error) => {console.log('ERROR!!!')}
    )
}

getIp = () => {
  fetch("http://localhost:5000/api/ip")
  .then(res => res.json())
  .then((result) => {
    console.log(result.ip)
    this.setState({
      ip: result.ip
    });
 
  });
};

  //componentWillUnmount() {document.removeEventListener("click", this.someFunction)}

  //someFunction(event) {this.setState({example: false})}

handleChange(event) {
  this.setState({
    input: event.target.value
  });
};

handleSubmit(event) {
      event.preventDefault()
    this.setState({
    submit: this.state.input
    });
};

playTrack() {
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
};

  render () {
  
 
  const adjOutput = this.state.user_adj.map(i => <option value={this.state.user_adj.indexOf(i)} key={i[1]}>{i[0]} {i[1]}</option>);
  const nounOutput = this.state.user_noun.map(i => <option value={this.state.user_noun.indexOf(i)} key={i[1]}>{i[0]} {i[1]}</option>);

  return (
    <div className="App">
      <h1>Hello World!</h1>
        <form onSubmit={this.handleSubmit}>
         
<input type="text" value={this.state.input} onChange={this.handleChange}></input>
       
          <button type='submit'>Submit!</button>
        </form>
     
<h1>{this.state.submit}</h1>
<div>
  <p>Your IP address is <strong>{this.state.ip}</strong>, but I'm going to call you pal.</p>
  Look up stored user _id then IP
  Randomized Descriptor
</div>

{/*}<p>{this.state.user_adj}</p>
<p>{this.state.user_noun}</p>{*/}

<p>x</p>
    <form>
      <label htmlFor="user_adj">User Adjective:</label>
      <select name="user_adj" id="user_adj">{adjOutput}</select>
      <label htmlFor="user_noun">User Noun:</label>
      <select name="user_noun" id="user_noun">{nounOutput}</select>
      <label htmlFor="userColorPicker">User Color:</label>
      <input type="color" name="userColorPicker" id="userColorPicker" defaultValue="#00ff00"></input>
      <br/>
      <label htmlFor="track_adj">Track Adjective:</label>
      <select name="track_adj" id="track_adj">{adjOutput}</select>
      <label htmlFor="track_noun">Track Noun:</label>
      <select name="track_noun" id="track_noun">{nounOutput}</select>
      <label htmlFor="trackColorPicker">Track Color:</label>
      <input type="color" name="trackColorPicker" id="trackColorPicker" defaultValue="#00ff00"></input>
    </form>
    </div>
  );
}
}


export default App;