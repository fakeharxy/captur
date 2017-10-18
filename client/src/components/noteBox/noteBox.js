import * as React from 'react';
import Button from './button.js'

const NoteBox = ({
    viewableNote,
    onNext,
    selectedTag
  }) =>
  <div key={viewableNote.id} className="panel panel-default">
    <h4 className="panel-heading">#{selectedTag}</h4>
    <p className="panel-body">{viewableNote.body}</p>
      <Button
        onClick={onNext}
        >Next</Button>
  </div>


export default NoteBox;
