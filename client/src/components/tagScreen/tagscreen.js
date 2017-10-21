import * as React from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap'


const TagScreen = ({tags}) =>
 ( <ListGroup>
  {tags.map((tag) =>
    <ListGroupItem key={tag.id} className='taglist' bsStyle="success">{tag.name}</ListGroupItem>
  )}
  </ListGroup>
  )

export default TagScreen;
