import * as React from 'react';

const ListItem = ({index, active}) =>
  { var addClass = '';
      if (active) {
      addClass = "active"
    }

  return( <li className={addClass}><a href='#'>{index}</a></li> )
  }
export default ListItem;
