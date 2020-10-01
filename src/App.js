import React from 'react';
import './App.css';
import * as Tone from 'tone';

class App extends React.Component {
  constructor(props) {
  console.log('🔰💥🔰 constructor 🔰💥🔰 (1)'); // First
    super(props);
    this.state = {
      input: '',
      submit: '',
      user_descriptor: [],
      user_noun: [],
      ip: '',
      id: '',
      can: [],
      temp_can: [],
      revisit: false
    };
this.handleChange = this.handleChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
this.alterColor = this.alterColor.bind(this);
this.editUser = this.editUser.bind(this);
this.saveUser = this.saveUser.bind(this);
this.changeUserDesc = this.changeUserDesc.bind(this);
this.changeUserNoun = this.changeUserNoun.bind(this);
  };

  // static getDerivedStateFromProps() {console.log("🔰💥🔰 getDerivedStateFromProps 🔰💥🔰 (2)")}  // Second
  
  //Render = 3rd (3)

  componentDidMount() {
    console.log('🔰💥🔰 componentDidMount 🔰💥🔰 (4)'); // Fourth
    this.getSelections();
    this.userSearch();
  };

  shouldComponentUpdate() {
    console.log("🔰💥🔰 shouldComponentUpdate 🔰💥🔰 (5)"); // Fifth (after update)
    return true;
  }

  //Render = 6th (6) (after update)

  getSnapshotBeforeUpdate() {
    console.log("🔰💥🔰 getSnapshotBeforeUpdate 🔰💥🔰 (7)"); // Seventh (after update)
    return true;
  }

  componentDidUpdate() {
    console.log("🔰💥🔰 componentDidUpdate 🔰💥🔰 (8)"); // Eighth (after update)
  }

  componentWillUnmount() {
    console.log('🔰💥🔰 componentWillUnmount 🔰💥🔰 (9)'); //Last
  }

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
  }
  ,(error) => {console.log('ERROR!!!')
  });
};

userSearch = () => {
  console.log('💥userSearch')
  this.getIp();
  fetch("http://localhost:5000/api/users")
  .then(res => res.json())
  .then((result) => {
      for (let i=0; i < result.length; i++) {
       if (result[i].user_ip === this.state.ip) {
          this.setState({
            can: result[i].can,
            temp_can: result[i].can,
            id: result[i]._id,
            revisit: true,
            okayToRender: true
          });
        }
      };

console.log(this.state.id)

      if (this.state.revisit === false) {
        this.setState({
          can: [this.randomizedColor(), 
            this.state.user_descriptor.indexOf(this.randomizedArray(this.state.user_descriptor)), 
            this.state.user_noun.indexOf(this.randomizedArray(this.state.user_noun))],
        });
        this.setState({
          temp_can: this.state.can,
          revisit: false,
          okayToRender: true
        });
      }
  })
}

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
//console.log('💥randomNum')
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

randomizedArray(array) {console.log('💥randomizedArray'); return array[this.randomNum(0,array.length)]};



editUser () {
  console.log('💥editUser')
  if (document.getElementById("edit-user").className === 'hide') {
    document.getElementById("edit-user").className = 'show';
  }
  else {
    document.getElementById("edit-user").className = 'hide';
  }
}

saveUser () {
  console.log('💥saveUser')
  this.setState({
    can: this.state.temp_can,
    revisit: true
  })

 /* console.log(this.state.id)
  console.log(this.state.id)
  fetch("http://localhost:5000/api/users")
    .then(res => res.json())
    .then((result) => {
      for (let i=0; i < result.length; i++) {
       if (result[i].user_ip === this.state.ip) {
          this.setState({id: result[i]._id});
          console.log(this.state.id)
       }
      }
    })*/

  fetch('http://localhost:5000/api/users/add', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({
      ip: this.state.ip,
      can: this.state.temp_can,
      id: this.state.id
    })
  })
    .then(response => {console.log(response)})
    .catch(err => {console.log(err)})







}
    
   



alterColor () {
  console.log('💥alterColor')
        this.setState({
          temp_can: [document.getElementById("userColorPicker").value, this.state.temp_can[1], this.state.temp_can[2]]
        })
  }

changeUserDesc () {
  console.log('💥changeUserDesc')
  this.setState({
    temp_can: [this.state.temp_can[0], document.getElementById("user_descriptor").value, this.state.temp_can[2]]
  })
}

changeUserNoun () {
  console.log('💥changeUserNoun')
  this.setState({
    temp_can: [this.state.temp_can[0], this.state.temp_can[1], document.getElementById("user_noun").value]
  })
}


  render () {
  console.log('🔰🔰🔰 START RENDERING 🔰🔰🔰 (3) || (6)')   // Third & Sixth (after update)
  
  if (!this.state.okayToRender) {
    console.log('🛑🛑🛑 NOT OKAY TO RENDER 🛑🛑🛑')
    return <div />
  };

  console.log('🟢🟢🟢 WE ARE GO TO RENDER! 🟢🟢🟢')

//selected={(this.state.user_descriptor.indexOf(i) === this.state.can[1]) ? 'selected' : null}
  const adjOutput = this.state.user_descriptor.map(i => <option value={this.state.user_descriptor.indexOf(i)}  key={i[1]}>{i[0]} {i[1]}</option>);
  const nounOutput = this.state.user_noun.map(i => <option value={this.state.user_noun.indexOf(i)} key={i[1]}>{i[0]} {i[1]}</option>);


  return (
    <div className="App">
      <h1>Leave a <span title="Note" role="img">Note</span></h1>
        {/*}<form onSubmit={this.handleSubmit}>
         
<input type="text" value={this.state.input} onChange={this.handleChange}></input>
       
          <button type='submit'>Submit!</button>
        </form>{*/}
     
<h1>{this.state.submit}</h1>


<div id="user-box" style={{borderColor: this.state.can[0]}}>

  <div id="floating-emojii">
  {this.state.user_descriptor[this.state.can[1]][0] + '' + this.state.user_noun[this.state.can[2]][0]}
  </div>


  <div id="new-user" className={(this.state.revisit) ? 'hide' : 'show'}>
    <h2>Greetings New or Unsaved User!</h2>
    <p>Your IP address is <strong>{this.state.ip}</strong>, that's a great designation, but I'm going to call you <strong>{this.state.user_descriptor[this.state.can[1]][1] + ' ' + this.state.user_noun[this.state.can[2]][1]}</strong>.</p>
    <p>You may save this designation, or edit to change your user information.</p>
    <button type="button" onClick={this.editUser}>Edit</button>
      <button type="button" onClick={this.saveUser}>Save</button>
  </div>

  <div id="old-user" className={(this.state.revisit) ? 'show' : 'hide'}>
      <p>Hello, <strong>{this.state.user_descriptor[this.state.can[1]][1] + ' ' + this.state.user_noun[this.state.can[2]][1]}</strong> of IP address, <strong>{this.state.ip}</strong>!</p>
      <p>Are you ready to leave a note?</p>
      <button type="button" onClick={this.editUser}>Edit User Info</button>
      <button type="button">Leave a Note</button>
  </div>


</div>

<div id="edit-user" style={{borderColor: this.state.temp_can[0]}} className="hide">
<div id="floating-emojii-edit">
  {this.state.user_descriptor[this.state.temp_can[1]][0] + '' + this.state.user_noun[this.state.temp_can[2]][0]}
  </div>
  <div className="edit-X"><span onClick={this.editUser}>❌</span></div>

  <strong><u>Edit User Data</u></strong>:
      <form>
      <label htmlFor="user_descriptor">User Descriptor:</label>
          <select name="user_descriptor" id="user_descriptor" defaultValue={this.state.can[1]} onChange={this.changeUserDesc}>{adjOutput}</select>
          <br/>
          <label htmlFor="user_noun">User Noun:</label>
          <select name="user_noun" id="user_noun" defaultValue={this.state.can[2]} onChange={this.changeUserNoun}>{nounOutput}</select>
          <br/>
          <label htmlFor="userColorPicker">User Color:</label>
          <input type="color" name="userColorPicker" id="userColorPicker" defaultValue={this.state.can[0]} onChange={this.alterColor}></input>
          <br/>
          <button type="button" onClick={this.saveUser}>Save</button>
        </form>
        <br/>
    </div>




{/*}<p>{this.state.user_descriptor}</p>
<p>{this.state.user_noun}</p>

<p>x</p>
    <form>
<br/>
      <label htmlFor="track_adj">Track Adjective:</label>
      <select name="track_adj" id="track_adj">{adjOutput}</select>
      <label htmlFor="track_noun">Track Noun:</label>
      <select name="track_noun" id="track_noun">{nounOutput}</select>
      <label htmlFor="trackColorPicker">Track Color:</label>
      <input type="color" name="trackColorPicker" id="trackColorPicker"></input>
    </form>{*/}
    </div>
  );
}
}


export default App;