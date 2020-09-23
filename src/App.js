import React from 'react';
import './App.css';
import * as Tone from 'tone';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      submit: '',
      user_descriptor: [],
      user_noun: [],
      revisit: false
    };
this.handleChange = this.handleChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
//this.randomizedColor = this.randomizedColor.bind(this);
//this.randomNum = this.randomNum.bind(this);
//this.getSelections = this.getSelections.bind(this);
  //  this.someFunction= this.someFunction.bind(this)
  };
 // componentDidMount() {document.addEventListener("click", this.someFunction)}

componentDidMount() {
  console.log('🔰💥🔰 componentDidMount 🔰💥🔰 ')
  this.userSearch();
  this.getSelections();
  //this.getIp();

  //this.playTrack();
  
  //this.randomizedColor();
};


getSelections = () => {
  console.log('💥getSelections')
  fetch("http://localhost:5000/api/selections")
    .then(res => res.json())
    .then((result) => {
        this.setState({
          user_descriptor: result[0].user_descriptor,
          user_noun: result[0].user_noun
        });
      }
      ,(error) => {console.log('ERROR!!!')
    });
};

getIp = () => {
  console.log('💥getIp')
  fetch("http://localhost:5000/api/ip")
  .then(res => res.json())
  .then((result) => {
    this.setState({
      ip: result.ip
    });
  });
};

userSearch = () => {
  this.getIp();
  console.log('💥userSearch')
  fetch("http://localhost:5000/api/users")
  .then(res => res.json())
  .then((result) => {
    console.log(this.state.ip)
    console.log(result[0].user_ip)

      for (let i=0; i < result.length; i++) {
      console.log(result[i])
       if (result[i].user_ip === this.state.ip) {
          this.setState({
            //user_can: result[i].can,
            user_can: [this.randomizedColor(), this.randomizedName('user_descriptor'), this.randomizedName('user_noun', 0)],
            revisit: true
          });
          console.log(this.user_can)
        }
        else {
          this.setState({
            user_can: [this.randomizedColor(), this.randomizedName('user_descriptor'), this.randomizedName('user_noun', 0)],
            revisit: false
          });
        }
      };
      console.log(this.state.user_can)
  })
}

  //componentWillUnmount() {document.removeEventListener("click", this.someFunction)}

  //someFunction(event) {this.setState({example: false})}

handleChange(event) {
console.log('💥handleChange')
this.setState({
input: event.target.value
});
};

handleSubmit(event) {
console.log('💥handleSubmit')
    event.preventDefault()
    this.setState({
    submit: this.state.input
    });
};




playTrack() {
console.log('💥playTrack')
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

randomNum(min, max) {
console.log('💥randomNum')
return Math.floor(Math.random() * (max - min)) + min;
};

randomizedColor() {
let randomColor = '#'
console.log('💥randomizedColor')
for (let i=0; i < 6; i++) {
  //console.log('i= ' + i)  
  let singleNum = this.randomNum(0, 15);
  singleNum = singleNum.toString(16);
  randomColor = randomColor.concat(singleNum)
};
return randomColor
};

randomizedName(array) {
console.log('💥randomizedName')
//takes x variable - x should = user_descriptor or user_noun from mongo selections
return array[this.randomNum(0,array.length)]
};



  render () {
  console.log('🔰🔰🔰 START RENDERING 🔰🔰🔰')
  //let yourNumber = 15
  //let hexString = yourNumber.toString(16);
//console.log(hexString);

//console.log(this.randomizedColor())


//console.log(this.randomizedName(this.state.user_descriptor, 0))
let test = this.state.user_descriptor[0]
console.log(test)




  const adjOutput = this.state.user_descriptor.map(i => <option value={this.state.user_descriptor.indexOf(i)} key={i[1]}>{i[0]} {i[1]}</option>);
  const nounOutput = this.state.user_noun.map(i => <option value={this.state.user_noun.indexOf(i)} key={i[1]}>{i[0]} {i[1]}</option>);

  return (
    <div className="App">
      <h1>Leave a <span title="Note" role="img">🎵</span></h1>
        <form onSubmit={this.handleSubmit}>
         
<input type="text" value={this.state.input} onChange={this.handleChange}></input>
       
          <button type='submit'>Submit!</button>
        </form>
     
<h1>{this.state.submit}</h1>
<div id="user-box">
<p>Greetings {(this.state.revisit) ? 'old' : 'new'} user!</p>
  <p>Your IP address is <strong>{this.state.ip}</strong>, but I'm going to call you ----pal-----.</p>
  <p>You may save this designation, or edit to change your user information.</p>
  Look up stored IP - if found: Fetch color + descriptor + name - give welcome back<br/>
  if not found: give welcome - edit option + randomized name + randomized color<br/>
  <form>
  <label htmlFor="user_descriptor">User Descriptor:</label>
      <select name="user_descriptor" id="user_descriptor">{adjOutput}</select>
      <label htmlFor="user_noun">User Noun:</label>
      <select name="user_noun" id="user_noun">{nounOutput}</select>
      <label htmlFor="userColorPicker">User Color:</label>
      <input type="color" name="userColorPicker" id="userColorPicker" defaultValue={this.randomizedColor()}></input>
      <br/>
      <button>Edit</button>
      <button>Save</button>
    </form>
</div>

{/*}<p>{this.state.user_descriptor}</p>
<p>{this.state.user_noun}</p>{*/}

<p>x</p>
    <form>
<br/>
      <label htmlFor="track_adj">Track Adjective:</label>
      <select name="track_adj" id="track_adj">{adjOutput}</select>
      <label htmlFor="track_noun">Track Noun:</label>
      <select name="track_noun" id="track_noun">{nounOutput}</select>
      <label htmlFor="trackColorPicker">Track Color:</label>
      <input type="color" name="trackColorPicker" id="trackColorPicker" defaultValue={this.randomizedColor()}></input>
    </form>
    </div>
  );
}
}


export default App;