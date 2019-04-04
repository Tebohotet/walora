import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

const emptyFeed = {
  title: '',
  date: '',
  city: '',
  venue: '',
  hostedBy: ''
};

class FeedForm extends Component {
  state = {
    feed: emptyFeed
  };

  componentDidMount() {
    if (this.props.selectedFeed !== null) {
      this.setState({
        feed: this.props.selectedFeed
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedFeed !== this.props.selectedFeed) {
      this.setState({
        feed: nextProps.selectedFeed || emptyFeed
      });
    }
  }

  onFormSubmit = evt => {
    evt.preventDefault();
    if (this.state.feed.id) {
      this.props.updateFeed(this.state.feed);
    } else {
      this.props.createFeed(this.state.feed);
    }
  };

  onInputChange = evt => {
    const newFeed = this.state.feed;
    newFeed[evt.target.name] = evt.target.value;
    this.setState({
      feed: newFeed
    });
  };

  render() {
    const { handleCancel } = this.props;
    const { feed } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>Feed Title</label>
            <input
              name='title'
              onChange={this.onInputChange}
              value={feed.title}
              placeholder='Feed Title'
            />
          </Form.Field>
          <Form.Field>
            <label>Feed Date</label>
            <input
              name='date'
              onChange={this.onInputChange}
              value={feed.date}
              type='date'
              placeholder='Feed Date'
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              name='city'
              onChange={this.onInputChange}
              value={feed.city}
              placeholder='City feed is taking place'
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              name='venue'
              onChange={this.onInputChange}
              value={feed.venue}
              placeholder='Enter the Venue of the feed'
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              name='hostedBy'
              onChange={this.onInputChange}
              value={feed.hostedBy}
              placeholder='Enter the name of person hosting'
            />
          </Form.Field>
          <Button positive type='submit'>
            Submit
          </Button>
          <Button onClick={handleCancel} type='button'>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default FeedForm;
