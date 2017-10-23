import React, {
  Component
} from 'react';
// import logo from './logo.svg';
import './App.css';
import 'react-select/dist/react-select.css';
import NoteBox from './components/noteBox/noteBox.js';
import Sidebar from './components/sidebar/sidebar.js';
import EntryBox from './components/entryForm/entryBox.js';
import Navbar from './components/navbar/navbar.js';
import TagScreen from './components/tagScreen/tagscreen.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTagScreen: false,
      showNoteScreen: true,
      showModal: false,
      notes: [],
      currentNote: '',
      currentTag: '',
      selectedTag: 'Note',
      viewableNote: {},
      tags: [],
    };

    this.toggleScreen = this.toggleScreen.bind(this);
    this.changeTag = this.changeTag.bind(this);
    this.onNext = this.onNext.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.updateAllData = this.updateAllData.bind(this);
  }

  componentDidMount() {
    this.updateAllData()
  }

  updateAllData() {
    this.updateNotes();
    this.updateTags();
  }

  updateNotes() {
    window.fetch('api/notes')
      .then(response => response.json())
      .then(notes => this.setupNotes(notes));
  }

  updateTags() {
    window.fetch('api/tags/get_all')
      .then(response => response.json())
      .then(tags => this.setupTags(tags));
  }

  toggleScreen() {
    let showNoteScreen = null;
    let showTagScreen = null;
    if (this.state.showNoteScreen) {
      showNoteScreen = false;
      showTagScreen = true;
    } else {
      showNoteScreen = true;
      showTagScreen = false;
    }
    this.setState({
      showNoteScreen,
      showTagScreen
    })
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
    this.setState({
      selectedTag
    });
    window.fetch('api/notes/' + selectedTag)
      .then(response => response.json())
      .then(notes => this.setupNotes(notes));
  }

  closeModal() {
    this.setState({
      showModal: false
    });
    window.setTimeout(this.updateAllData, 1000);
  }

  openModal() {
    this.setState({
      showModal: true
    });
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

  sendDatatoApi(where, what) {
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

  buttonName() {
    if (this.state.showNoteScreen) {
      return "Topics"
    } else {
      return "Notes"
    }
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
      selectedTag,
      showNoteScreen,
      showTagScreen
    } = this.state

    let ui = null;
    if (showNoteScreen) {
      ui = <NoteBox
            viewableNote={viewableNote}
            onNext={this.onNext}
            selectedTag={selectedTag}
          />
    } else if (showTagScreen) {
      ui = <TagScreen
            tags={tags}
          />
    }

    return (
      <div>
      <Navbar
        openModal={this.openModal}
        toggleScreen={this.toggleScreen}
        buttonName={this.buttonName()}
      />
      <div className="wrapper">
      <Sidebar
         tags={tags}
         changeTag={this.changeTag}
      />
      <div id='content'>
          <EntryBox
            tags={tags}
            showModal={showModal}
            closeModal={this.closeModal}
            onSubmit={this.onSubmit}
            currentNote={currentNote}
            currentTag={currentTag}
            onNoteChange={this.handleNoteChange}
            onTagChange={this.handleTagChange}/>

      {ui}

      </div>
    </div>
      </div>
    );
  }
}

export default App;
