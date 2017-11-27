import * as React from 'react';

const Entry = ({
    onNoteChange,
    onTagChange,
    currentTag,
    currentNote,
    onSubmit
  }) =>
  <form id='noteForm' onSubmit={onSubmit}>
      <textarea className="form-control" rows="8" value={currentNote} onChange={onNoteChange} />
    <div className="input-group">
      <span className="input-group-addon" id="sizing-addon2">#</span>
      <input type="text" 
             value={currentTag}
             onChange={onTagChange}
             className="tagBox form-control"
             placeholder="Max 3, separated by commas"
             aria-describedby="sizing-addon2"/>
    </div>
  </form>

export default Entry
