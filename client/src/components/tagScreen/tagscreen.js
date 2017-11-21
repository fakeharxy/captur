import * as React from 'react';

import {
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';

import ListItem from './tagPagination.js';


class TagScreen extends React.Component {
  constructor(...args) {
    super(...args);
  }

  updateTag(id, value) {
    this.setState(this.props.tags.reduce( (current, item) => {
      if (item.id === id) {
        item.importance = value;
      }
      current.push(item);
      return current; }, []
    ) );
  }

  render() {
     return(
     <ListGroup>
        { this.props.tags.map((tag) =>
        ( <span key={tag.id}>
          <ListGroupItem className='taglist' bsStyle="success"><p>{tag.name}</p>
          <ListItem current={tag.importance} onUpdate={(...args) => this.updateTag(...args)} tagId={tag.id} />
          </ListGroupItem>
        </span>
      )
    )}
   </ListGroup>
 )

  }
}
export default TagScreen;
