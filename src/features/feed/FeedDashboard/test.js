import React, { Component } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { getFeedsForDashboard } from '../feedActions';
import FeedList from '../FeedList';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import FeedActivity from '../FeedActivity';

const query = [
  {
    collection: 'activity',
    orderBy: ['timestamp', 'desc'],
    limit: 5
  }
];

const mapState = state => ({
  feeds: state.feeds,
  loading: state.async.loading,
  activities: state.firestore.ordered.activity
});

const actions = {
  getFeedsForDashboard
};

class FeedDashboard extends Component {
  state = {
    morefeeds: false,
    loadingInitial: true,
    loadedFeeds: []
  };

  async componentDidMount() {
    let next = await this.props.getFeedsForDashboard();
    console.log(next);

    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreFeeds: true,
        loadingInitial: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.feeds !== nextProps.feeds) {
      this.setState({
        loadedFeeds: [...this.state.loadedFeeds, ...nextProps.feeds]
      });
    }
  }

  getNextFeeds = async () => {
    const { feeds } = this.props;
    let lastFeed = feeds && feeds[feeds.length - 1];
    console.log(lastFeed);
    let next = await this.props.getFeedsForDashboard(lastFeed);
    console.log(next);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreFeeds: false
      });
    }
  };

  render() {
    const { loading, activities } = this.props;
    const { moreFeeds, loadedFeeds } = this.state;
    if (this.state.loadingInitial) return <LoadingComponent inverted={true} />;

    return (
      <Grid>
        <Grid.Column width={10}>
          <div ref={this.handleContextRef}>
            <FeedList
              loading={loading}
              moreFeeds={moreFeeds}
              Feeds={loadedFeeds}
              getNextFeeds={this.getNextFeeds}
            />
          </div>
        </Grid.Column>
        <Grid.Column width={6}>
          <FeedActivity
            activities={activities}
            contextRef={this.state.contextRef}
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    );
  }
}
export default connect(
  mapState,
  actions
)(firestoreConnect(query)(FeedDashboard));
