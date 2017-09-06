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
    };
  }

  componentDidMount() {
    window.fetch('api/notes')
      .then(response => response.json())
      .then(notes => this.setupNotes(notes))
  }

  setupNotes(notes) {
    this.setState({ notes });
  }

  render() {
    const { notes } = this.state
    return (
      <div className="App">
      { notes.map(item =>
        <div key={item.id}>
          <span>
            <p>{item.body}</p>
          </span>
        </div>
      ) }

      </div>
    );
  }
}

export default App;
