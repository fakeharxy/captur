import * as React from 'react';
import Entry from './entry.js';
import {Modal, Button} from 'react-bootstrap';

const EntryBox = ({
    onNoteChange,
    onTagChange,
    currentTag,
    currentNote,
    showModal,
    closeModal,
    onSubmit
}) =>
<Modal id="noteModal" show={showModal} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>Add a new note</Modal.Title>
      </Modal.Header>

      <Modal.Body>
              <Entry
              onSubmit={onSubmit}
              currentNote={currentNote}
              currentTag={currentTag}
              onNoteChange={onNoteChange}
              onTagChange={onTagChange}/>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" form="noteForm" value="Submit" onClick={closeModal}>Submit</Button>
        <Button onClick={closeModal}>Close</Button>
      </Modal.Footer>

  </Modal>

export default EntryBox
