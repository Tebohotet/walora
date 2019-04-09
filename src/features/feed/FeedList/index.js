import React, { Component } from 'react';
import FeedListItem from './FeedListItem';
import InfiniteScroll from 'react-infinite-scroller';

class FeedList extends Component {
  render() {
    const { feeds, deleteFeed, getNextFeeds, loading, moreFeeds } = this.props;
    return (
      <div>
        {feeds && feeds.length !== 0 && (
          <InfiniteScroll
            pageStart={0}
            loadMore={getNextFeeds}
            hasMore={!loading && moreFeeds}
            initialLoad={false}
          >
            {feeds &&
              feeds.map(feed => <FeedListItem key={feed.id} feed={feed} />)}
          </InfiniteScroll>
        )}
      </div>
    );
  }
}

export default FeedList;
