import React, {
  Component
} from 'react';
// import logo from './logo.svg';
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
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
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


  handleNoteChange(e) {
    this.setState({
      currentNote: e.target.value,
    })
  }

  handleTagChange(e) {
    this.setState({
      currentTag: e.target.value,
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const formData = {
      "note": {
        "body": this.state.currentNote,
        "all_tags": this.state.currentTag
      }
    }
    this.sendDatatoApi('/notes', formData)
    this.setState({
      currentNote: "",
      currentTag: ""
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
      currentTag,
      currentNote,
      viewableNote
    } = this.state

    return (
      <div className="App">

      <Entry
        onSubmit={this.onSubmit}
        currentNote={currentNote}
        currentTag={currentTag}
        onNoteChange={this.handleNoteChange}
        onTagChange={this.handleTagChange}/>

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
    onNoteChange,
    onTagChange,
    currentTag,
    currentNote,
    onSubmit
  }) =>
  <form onSubmit={onSubmit}>
    <input type="textarea" value={currentNote} onChange={onNoteChange} />
    <input type="text" value={currentTag} onChange={onTagChange} />
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
