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
      noteNumber: 0,
      currentNote: '',
    };

    this.onNext = this.onNext.bind(this);
    this.onPrev = this.onPrev.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  componentDidMount() {
    window.fetch('api/notes')
      .then(response => response.json())
      .then(notes => this.setupNotes(notes))
  }

  onNext() {
    var noteNumber = this.state.noteNumber
    noteNumber++
    this.setState({
      noteNumber
    })
  }

  onPrev() {
    var noteNumber = this.state.noteNumber
    if (noteNumber > 0) {
      noteNumber--
    }
    this.setState({
      noteNumber
    })
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
    var request = new XMLHttpRequest();
    request.open('POST', '/api/notes', true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send(JSON.stringify(formData));
    this.setState({
      currentNote: ""
    });
  }

  setupNotes(notes) {
    this.setState({
      notes
    });
  }

  render() {
    const {
      notes,
      noteNumber,
      currentNote
    } = this.state
    return (
      <div className="App">
      <Entry 
      onSubmit={this.onSubmit}
      value={currentNote}
      onChange={this.handleChange}/>
      <Note
      notes={notes}
      noteNumber={noteNumber}
      />
      { noteNumber == 0 ? null :
        <Button
        onClick={()=> this.onPrev()}
        >Previous</Button>
      }
      { noteNumber == notes.length ? null :
        <Button
        onClick={()=> this.onNext()}
        >Next</Button>
      }
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

const Note = ({
    notes,
    noteNumber
  }) =>
  <div>
            { notes[noteNumber] ? (
        <div key={notes[noteNumber].id}>
          <span>
            <p>{notes[noteNumber].body}</p>
          </span>
        </div>
      ) : (
          <div> No more notes </div>
        )
      }
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
