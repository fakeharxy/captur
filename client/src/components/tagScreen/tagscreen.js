import * as React from 'react';
import {
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';
import ListItem from './tagPagination.js';


const TagScreen = ({
    tags
  }) =>
{
  function getRows(tag) {
    var rows = [];
    for (var i = 1; i < 10; i++) { 
      var active = false;
      if (tag.importance === i) {
        active = true;
      }
      rows.push(<ListItem 
        key={i}
        active={active}
        index={i} />)
    }
    return rows
  }

 return(
   <ListGroup>
    { tags.sort(function(a,b) {return a.importance < b.importance}).map((tag) =>
      ( <span key={tag.id}>
          <ListGroupItem className='taglist' bsStyle="success"><p>{tag.name}</p>
            <ul className="pagination pull-right pagination-sm">
              {getRows(tag)}
            </ul>
          </ListGroupItem> 
        </span>
      )
    )}
   </ListGroup>
 )

}
export default TagScreen;
