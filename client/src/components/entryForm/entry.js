import * as React from 'react';

const Entry = ({
    onNoteChange,
    onTagChange,
    currentTag,
    currentNote,
    onSubmit
  }) =>
  <form onSubmit={onSubmit}>
    <input type="textarea" value={currentNote} onChange={onNoteChange} />
    <input type="text" value={currentTag} onChange={onTagChange} />
    <button type="submit" name="submit" >Submit</button>
  </form>

export default Entry
