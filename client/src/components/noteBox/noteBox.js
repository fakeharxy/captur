import * as React from 'react';
import Button from './button.js'

const NoteBox = ({
    viewableNote,
    onNext,
    clearSeen,
    selectedTag
  }) =>
  ( viewableNote ? <div key={viewableNote.id} className="panel panel-default">
    <h4 className="panel-heading">{selectedTag}</h4>
    <p className="panel-body">{viewableNote.body}</p>
      <Button
        onClick={onNext}
        >Seen it!</Button>
  </div> : 
    <div>
    <h5> No notes for today... </h5>
    <Button 
       onClick={clearSeen}
    > Reset! </Button>
    </div>
  )

export default NoteBox;
