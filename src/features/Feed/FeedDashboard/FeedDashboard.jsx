import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import cuid from 'cuid';
import FeedList from '../FeedList/FeedList';
import FeedForm from '../FeedForm/FeedForm';

const feedsDashboard = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      }
    ]
  }
];

class FeedDashboard extends Component {
  state = {
    feeds: feedsDashboard,
    isOpen: false,
    selectedfeed: null
  };

  handleFormOpen = () => {
    this.setState({
      selectedfeed: null,
      isOpen: true
    });
  };

  handleCancel = () => {
    this.setState({
      isOpen: false
    });
  };

  handleUpdateFeed = updatedFeed => {
    this.setState({
      feeds: this.state.feeds.map(feed => {
        if (feed.id === updatedFeed.id) {
          return Object.assign({}, updatedFeed);
        } else {
          return feed;
        }
      }),
      isOpen: false,
      selectedFeed: null
    });
  };

  handleOpenFeed = feedToOpen => () => {
    this.setState({
      selectedFeed: feedToOpen,
      isOpen: true
    });
  };

  handleCreateFeed = newFeed => {
    newFeed.id = cuid();
    newFeed.hostPhotoURL = '/assets/user.png';
    const updatedFeeds = [...this.state.feeds, newFeed];
    this.setState({
      feeds: updatedFeeds,
      isOpen: false
    });
  };

  handleDeleteFeed = feedId => () => {
    const updatedFeeds = this.state.feeds.filter(e => e.id !== feedId);
    this.setState({
      feeds: updatedFeeds
    });
  };

  render() {
    const { selectedFeed } = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
          <FeedList
            deleteFeed={this.handleDeleteFeed}
            feeds={this.state.feeds}
            onFeedOpen={this.handleOpenFeed}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            onClick={this.handleFormOpen}
            positive
            content='Create Feed'
          />
          {this.state.isOpen && (
            <FeedForm
              updateFeed={this.handleUpdateFeed}
              selectedFeed={selectedFeed}
              handleCancel={this.handleCancel}
              createFeed={this.handleCreateFeed}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default FeedDashboard;
