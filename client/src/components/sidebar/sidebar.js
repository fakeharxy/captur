import * as React from 'react';

const Sidebar =({
  tags,
  changeTag
   }) =>

<nav id="sidebar">
      <div className="sidebar-header">
          <h3>Tags</h3>
      </div>

      <ul className="list-unstyled components">
  {tags.map((tag) =>
          <li key={tag.id}><a onClick={() => changeTag(tag.name)}>#{tag.name}</a></li>
  )} 
      </ul>
</nav>

export default Sidebar
