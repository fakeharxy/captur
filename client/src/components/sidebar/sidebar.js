import * as React from 'react';

const Sidebar =({
  tags,
  changeTag
   }) =>

( <nav id="sidebar">
      <div className="sidebar-header">
          <h4>My Tags</h4>
      </div>
      <ul className="list-unstyled components">
  {tags.map((tag) =>
          <li className="unselectable" key={tag.id}><a onClick={() => changeTag(tag.name)}>{tag.name}</a></li>
  )} 
      </ul>
</nav>

)
export default Sidebar
