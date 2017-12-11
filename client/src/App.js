import React, {
  Component
} from 'react';
// import logo from './logo.svg';
import './App.css';
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
      currentSecondaryTag: '',
      currentPrimaryTag: '',
      selectedTag: 'Today',
      viewableNote: {},
      tags: [],
      primes: [],
    };

    this.toggleScreen = this.toggleScreen.bind(this);
    this.changeTag = this.changeTag.bind(this);
    this.onNext = this.onNext.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleSecondaryTagChange = this.handleSecondaryTagChange.bind(this);
    this.handlePrimaryTagChange = this.handlePrimaryTagChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.changeToToday = this.changeToToday.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.updateAllData = this.updateAllData.bind(this);
    this.clearSeen = this.clearSeen.bind(this);
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
    window.fetch('api/tags/primes_all')
      .then(response => response.json())
      .then(primes => this.setupPrimes(primes));
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

  changeToToday() {
    this.updateNotes();
    let selectedTag = "Today"
    let showNoteScreen = true;
    this.setState({
      selectedTag,
      showNoteScreen
    })
  }

  setupNotes(notes) {
    var viewableNote = notes[0]
    this.setState({
      notes,
      viewableNote,
    });
  }

  setupTags(tags) {
    this.setState({
      tags,
    });
  }

  setupPrimes(primes) {
    this.setState({
      primes,
    });
  }

  changeTag(selectedTag) {
    let showNoteScreen = true;
    this.setState({
      showNoteScreen,
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

  clearSeen() {
    let formData = {}
    this.sendDatatoApi('notes/clear_seen', formData)
    window.setTimeout(this.updateAllData, 1000);
  }

  onNext() {
    var notes = this.state.notes;
    const formData = {
      "note": {
        "note_id": notes[0].id
      }
    }
    this.sendDatatoApi('notes/update_last_seen', formData)
    notes.splice(0, 1);
    if (notes === []){
          this.updateNotes();
    }
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
      return "Edit Tags"
    } else {
      return "Notes"
    }
  }

  handleSecondaryTagChange(e) {
    this.setState({
      currentSecondaryTag: e.target.value,
    })
  }

  handlePrimaryTagChange(e) {
    this.setState({
      currentPrimaryTag: e.target.value,
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const formData = {
      "note": {
        "body": this.state.currentNote,
        "all_tags": this.state.currentSecondaryTag,
        "prime": this.state.currentPrimaryTag
      }
    }
    this.sendDatatoApi('/notes', formData)
    this.setState({
      currentNote: "",
      currentTag: "",
      showNoteScreen: true
    });
  }


  render() {
    const {
      currentSecondaryTag,
      currentPrimaryTag,
      currentNote,
      primes,
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
            clearSeen={this.clearSeen}
            selectedTag={selectedTag}
          />
    } else if (showTagScreen) {
      ui = <TagScreen
            tags={primes}
          />
    }

    return (
      <div>
      <Navbar
        openModal={this.openModal}
        toggleScreen={this.toggleScreen}
        buttonName={this.buttonName()}
        updateData={this.changeToToday}
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
            currentSecondaryTag={currentSecondaryTag}
            currentPrimaryTag={currentPrimaryTag}
            onNoteChange={this.handleNoteChange}
            onSecondaryTagChange={this.handleSecondaryTagChange}
            onPrimaryTagChange={this.handlePrimaryTagChange}/>

      {ui}

        </div>
      </div>
     </div>
    );
  }
}

export default App;
