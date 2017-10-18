import React, {
  Component
} from 'react';
// import logo from './logo.svg';
import './App.css';
import NoteBox from './components/noteBox/noteBox.js';
import Sidebar from './components/sidebar/sidebar.js';
import EntryBox from './components/entryForm/entryBox.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      notes: [],
      currentNote: '',
      currentTag: '',
      selectedTag: 'Note',
      viewableNote: {},
      tags: [],
    };

    this.changeTag = this.changeTag.bind(this);
    this.onNext = this.onNext.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    window.fetch('api/notes')
      .then(response => response.json())
      .then(notes => this.setupNotes(notes));
    window.fetch('api/tags/get_all')
      .then(response => response.json())
      .then(tags => this.setupTags(tags));
  }

  setupNotes(notes) {
    var viewableNote = notes[0]
    this.setState({
      notes,
      viewableNote
    });
  }

  setupTags(tags) {
    this.setState({
      tags,
    });
  }

  changeTag(selectedTag) {
    this.setState({selectedTag});
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
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


  render() {
    const {
      currentTag,
      currentNote,
      tags,
      viewableNote,
      showModal,
      selectedTag
    } = this.state

    return (
      <div className="wrapper">
      <Sidebar 
       tags={tags}
       changeTag={this.changeTag}
      />
    <div id='content'>
          <EntryBox
            showModal={showModal}
            closeModal={this.closeModal}
            onSubmit={this.onSubmit}
            currentNote={currentNote}
            currentTag={currentTag}
            onNoteChange={this.handleNoteChange}
            onTagChange={this.handleTagChange}/>

          <NoteBox
            viewableNote={viewableNote}
            onNext={this.onNext}
            selectedTag={selectedTag}
          />
      <button onClick={this.openModal}> Add New </button>
      </div>
      </div>
    );
  }
}

export default App;
