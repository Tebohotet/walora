import React, { Component } from 'react';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import FeedListAttendee from './FeedListAttendee';

class FeedListItem extends Component {
  render() {
    const { feed, onFeedOpen, deleteFeed } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' circular src={feed.hostPhotoURL} />
              <Item.Content>
                <Item.Header as='a'>{feed.title}</Item.Header>
                <Item.Description>
                  Hosted by <a>{feed.hostedBy}</a>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name='clock' /> {feed.date}|
            <Icon name='marker' /> {feed.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {feed.attendees &&
              feed.attendees.map(attendee => (
                <feedListAttendee key={attendee.id} attendee={attendee} />
              ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{feed.description}</span>
          <Button
            onClick={deleteFeed(feed.id)}
            as='a'
            color='red'
            floated='right'
            content='Delete'
          />
          <Button
            onClick={onFeedOpen(feed)}
            as='a'
            color='teal'
            floated='right'
            content='View'
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default FeedListItem;
