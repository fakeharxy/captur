import * as React from 'react';

const Entry = ({
    onNoteChange,
    onSecondaryTagChange,
    onPrimaryTagChange,
    currentSecondaryTag,
    currentPrimaryTag,
    currentNote,
    onSubmit
  }) =>
  <form id='noteForm' onSubmit={onSubmit}>
      <textarea className="form-control" rows="8" value={currentNote} onChange={onNoteChange} />
    <div className="input-group">
      <span className="input-group-addon" id="sizing-addon2">#</span>
      <input type="text" 
             value={currentPrimaryTag}
             onChange={onPrimaryTagChange}
             className="tagBox form-control"
             placeholder="Primary tag"
             aria-describedby="sizing-addon2"/>
      <input type="text" 
             value={currentSecondaryTag}
             onChange={onSecondaryTagChange}
             className="tagBox form-control"
             placeholder="Secondary tags"
             aria-describedby="sizing-addon2"/>
    </div>
  </form>

export default Entry
