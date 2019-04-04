import React, { Component } from 'react';
import FeedListItem from './FeedListItem';

class FeedList extends Component {
  render() {
    const { feeds, onFeedOpen, deleteFeed } = this.props;
    return (
      <div>
        <h1>Feed List</h1>
        {feeds.map(feed => (
          <FeedListItem
            key={feed.id}
            feed={feed}
            onFeedOpen={onFeedOpen}
            deleteFeed={deleteFeed}
          />
        ))}
      </div>
    );
  }
}

export default FeedList;
