import React, { Component } from 'react';
import { Feed } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

class FeedActivityItem extends Component {
  renderSummary = feedactivity => {
    switch (feedactivity.type) {
      case 'newFeed':
        return (
          <div>
            New Feed!{' '}
            <Feed.User
              as={Link}
              to={{ pathname: '/profile/' + feedactivity.hostUid }}
            >
              {feedactivity.hostedBy}
            </Feed.User>{' '}
            Posted{' '}
            <Link to={{ pathname: '/feed/' + feedactivity.feedId }}>
              {feedactivity.title}
            </Link>
          </div>
        );
      case 'cancelledFeed':
        return (
          <div>
            Feed Cancelled!{' '}
            <Feed.User
              as={Link}
              to={{ pathname: '/profile/' + feedactivity.hostUid }}
            >
              {feedactivity.hostedBy}
            </Feed.User>{' '}
            has cancelled{' '}
            <Link to={{ pathname: '/feed/' + feedactivity.feedId }}>
              {feedactivity.title}
            </Link>
          </div>
        );
      default:
        return;
    }
  };

  render() {
    const { feedactivity } = this.props;

    return (
      <Feed.Feed>
        <Feed.Label>
          <img src={feedactivity.photoURL || '/assets/user.png'} alt='' />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>{this.renderSummary(feedactivity)}</Feed.Summary>
          <Feed.Meta>
            <Feed.Date>
              {distanceInWordsToNow(feedactivity.timestamp.toDate())} ago
            </Feed.Date>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Feed>
    );
  }
}

export default FeedActivityItem;
