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
    };

    this.onNext = this.onNext.bind(this);
    this.onPrev = this.onPrev.bind(this);
  }


  componentDidMount() {
    window.fetch('api/notes')
      .then(response => response.json())
      .then(notes => this.setupNotes(notes))
  }

  onNext() {
    var noteNumber = this.state.noteNumber
    noteNumber++
    this.setState ({ noteNumber })
  }

  onPrev() {
    var noteNumber = this.state.noteNumber
    noteNumber--
    this.setState ({ noteNumber })
  }

  setupNotes(notes) {
    this.setState({ notes });
  }

  render() {
    const { notes, noteNumber } = this.state
    return (
      <div className="App">
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
      <span>
              <button
                onClick={() => this.onPrev()}
                type="button"
> Prev
              </button>
            </span>
      <span>
              <button
                onClick={() => this.onNext()}
                type="button"
> Next
              </button>
            </span>
     </div> 
    );
  }
}

export default App;
