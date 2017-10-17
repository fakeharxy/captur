import * as React from 'react';

const Sidebar =({}) =>

<nav id="sidebar">
      <div className="sidebar-header">
          <h3>Tags</h3>
      </div>

      <ul className="list-unstyled components">
          <li><a href="#">#welcome</a></li>
          <li><a href="#">#remember</a></li>

          <li>
              <a href="#">#thoughts</a>
          </li>

          <li><a href="#">#portfolio</a></li>
          <li><a href="#">#react</a></li>
      </ul>
</nav>

export default Sidebar
