import React, {
  Component
} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      currentNote: '',
      currentTag: '',
      viewableNote: {},
    };

    this.onNext = this.onNext.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  componentDidMount() {
    window.fetch('api/notes')
      .then(response => response.json())
      .then(notes => this.setupNotes(notes))
  }

  onNext() {
    var notes = this.state.notes;
    const formData = {
      "note": {
        "note_id": notes[0].id
      }
    }
    this.sendDatatoApi('notes/update_last_seen', formData)
    notes.push(notes.splice(0, 1)[0]);
    var viewableNote = notes[0];
    this.setState({
      notes,
      viewableNote
    })
  }

  sendDatatoApi(where,what) {
    var request = new XMLHttpRequest();
    request.open('POST', '/api/' + where, true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send(JSON.stringify(what));
  }


  handleChange(e) {
    this.setState({
      currentNote: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const formData = {
      "note": {
        "body": this.state.currentNote
      }
    }
    this.sendDatatoApi('/notes', formData)
    this.setState({
      currentNote: ""
    });
  }

  setupNotes(notes) {
    var viewableNote = notes[0]
    this.setState({
      notes,
      viewableNote
    });

  }

  render() {
    const {
      notes,
      currentNote,
      viewableNote
    } = this.state

    return (
      <div className="App">

      <Entry
        onSubmit={this.onSubmit}
        value={currentNote}
        onChange={this.handleChange}/>

      <NoteBox
        viewableNote={viewableNote}
      />

      <Button
        onClick={()=> this.onNext()}
        >Next</Button>

     </div>
    );
  }
}

const Entry = ({
    onChange,
    value,
    onSubmit
  }) =>
  <form onSubmit={onSubmit}>
    <input type="textarea" value={value} onChange={onChange} />
    <button type="submit" name="submit" >Submit</button>
  </form>

const NoteBox = ({
    viewableNote,
  }) =>
  <div className="alert alert-success" role="alert">
        <div key={viewableNote.id}>
          <span>
            <p>{viewableNote.body}</p>
          </span>
        </div>
      </div>

const Button = ({
    onClick,
    children
  }) =>
  <span>
        <button
          onClick={onClick}
          type="button">
            {children}
        </button>
      </span>

export default App;
