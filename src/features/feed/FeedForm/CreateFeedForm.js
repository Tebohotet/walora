import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withFirestore } from 'react-redux-firebase';
import Script from 'react-load-script';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from 'revalidate';
import { createFeed, updateFeed, cancelToggle } from '../feedActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
// import SelectInput from '../../../app/common/form/SelectInput';
// import DateInput from '../../../app/common/form/DateInput';
// import PlaceInput from '../../../app/common/form/PlaceInput';

const mapState = (state, ownProps) => {
  let feed = {};

  if (state.firestore.ordered.feeds && state.firestore.ordered.feeds[0]) {
    feed = state.firestore.ordered.feeds[0];
  }

  return {
    initialValues: feed,
    feed,
    loading: state.async.loading
  };
};

const actions = {
  createFeed,
  updateFeed,
  cancelToggle
};

// const category = [
//   { key: 'drinks', text: 'Drinks', value: 'drinks' },
//   { key: 'culture', text: 'Culture', value: 'culture' },
//   { key: 'film', text: 'Film', value: 'film' },
//   { key: 'food', text: 'Food', value: 'food' },
//   { key: 'music', text: 'Music', value: 'music' },
//   { key: 'travel', text: 'Travel', value: 'travel' }
// ];

const validate = combineValidators({
  title: isRequired({ message: 'The feed title is required' }),
  category: isRequired({ message: 'Please provide a category' }),
  description: composeValidators(
    isRequired({ message: 'Please enter a description' }),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters'
    })
  )()
});

class FeedForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  };

  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`feeds/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`feeds/${match.params.id}`);
  }

  handleScriptLoaded = () => this.setState({ scriptLoaded: true });

  onFormSubmit = values => {
    values.venueLatLng = this.state.venueLatLng;
    if (this.props.initialValues.id) {
      if (Object.keys(values.venueLatLng).length === 0) {
        values.venueLatLng = this.props.feed.venueLatLng;
      }
      this.props.updateFeed(values);
      this.props.history.goBack();
    } else {
      this.props.createFeed(values);
      this.props.history.push('/feeds');
    }
  };

  render() {
    const {
      invalid,
      submitting,
      pristine,

      loading
    } = this.props;
    return (
      <Grid>
        {/* <Script
          url='https://maps.googleapis.com/maps/api/js?key=AIzaSyA6bN-lNWLR7NNVgJYcZIh8AbJ2rwCU9tM&libraries=places'
          onLoad={this.handleScriptLoaded}
        /> */}
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Feed Details' />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name='title'
                type='text'
                component={TextInput}
                placeholder='Give your feed a Tittle'
              />
              {/* <Field
                name='category'
                type='text'
                component={SelectInput}
                options={category}
                placeholder='What is your feed about'
              /> */}
              <Field
                name='description'
                type='text'
                component={TextArea}
                rows={3}
                placeholder='Tell us about your feed'
              />
              {/* <Header sub color='teal' content='Feed Location details' />
              <Field
                name='city'
                type='text'
                component={PlaceInput}
                options={{ types: ['(cities)'] }}
                placeholder='Feed city'
                onSelect={this.handleCitySelect}
              />
              {this.state.scriptLoaded && (
                <Field
                  name='venue'
                  type='text'
                  component={PlaceInput}
                  options={{
                    location: new google.maps.LatLng(this.state.cityLatLng),
                    radius: 1000,
                    types: ['establishment']
                  }}
                  placeholder='Feed venue'
                  onSelect={this.handleVenueSelect}
                />
              )}
              <Field
                name='date'
                type='text'
                component={DateInput}
                dateFormat='YYYY-MM-DD HH:mm'
                timeFormat='HH:mm'
                showTimeSelect
                placeholder='Date and time of feed'
              /> */}
              <Button
                loading={loading}
                disabled={invalid || submitting || pristine}
                positive
                type='submit'
              >
                Submit
              </Button>
              <Button
                disabled={loading}
                onClick={this.props.history.goBack}
                type='button'
              >
                Cancel
              </Button>
              {/* <Button
                onClick={() => cancelToggle(!feed.cancelled, feed.id)}
                type='button'
                color={feed.cancelled ? 'green' : 'red'}
                floated='right'
                content={feed.cancelled ? 'Reactivate Feed' : 'Cancel Feed'}
              /> */}
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(
  connect(
    mapState,
    actions
  )(
    reduxForm({ form: 'feedForm', enableReinitialize: true, validate })(
      FeedForm
    )
  )
);
