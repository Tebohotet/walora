/* global google */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withFirestore } from 'react-redux-firebase';
import { Grid, Header, Segment, Form, Button } from 'semantic-ui-react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
// import Script from 'react-load-script';

import TextInput from '../../../app/common/form/TextInput';
import TeaxtArea from '../../../app/common/form/TextArea';
// import SelectInput from '../../../app/common/form/SelectInput';
// import DateInput from '../../../app/common/form/DateInput';
// import PlaceInput from '../../../app/common/form/PlaceInput';
// import { category } from '../../../app/data/sampleData';
import { createFeed, updateFeed, cancelToggle } from '../feedActions';
import { validate } from '../../../app/common/form/formvalidate';
// import { googleApiKey } from '../../../app/config/keys';

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

  handleScriptLoad = () => this.setState({ scriptLoaded: true });

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLatLng: latlng
        });
      })
      .then(() => {
        this.props.change('city', selectedCity);
      });
  };

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          venueLatLng: latlng
        });
      })
      .then(() => {
        this.props.change('venue', selectedVenue);
      });
  };

  onFormSubmit = async values => {
    const { initialValues, createFeed, updateFeed, history, feed } = this.props;
    values.venueLatLng = this.state.venueLatLng;

    if (initialValues.id) {
      if (Object.keys(values.venueLatLng).length === 0) {
        values.venueLatLng = feed.venueLatLng;
      }
      await updateFeed(values);
      history.goBack();
    } else {
      createFeed(values);
      history.push('/feeds');
    }
  };

  render() {
    const {
      invalid,
      submitting,
      pristine,
      // feed,
      // cancelToggle,
      loading
    } = this.props;
    return (
      <Grid>
        {/* <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`}
          onLoad={this.handleScriptLoad}
        /> */}
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Feed Details' />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name='title'
                type='text'
                component={TextInput}
                placeholder='Give your feed a name'
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
                rows={3}
                component={TeaxtArea}
                placeholder='Tell us about your feed'
              />
              {/* <Header sub color='teal' content='Feed Location Details' />
              <Field
                name='city'
                type='text'
                component={PlaceInput}
                options={{ type: ['(cities)'] }}
                placeholder='Feed City'
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
                    type: ['establishments']
                  }}
                  placeholder='Feed Venue'
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
                placeholder='Feed Date'
              /> */}
              <Button
                positive
                type='submit'
                loading={loading}
                disabled={invalid || submitting || pristine}
              >
                Submit
              </Button>
              <Button
                disabled={loading}
                type='button'
                onClick={this.props.history.goBack}
              >
                Cancel
              </Button>
              {/* {feed && (
                <Button
                  onClick={() => cancelToggle(!feed.cancelled, feed.id)}
                  type='button'
                  color={feed.cancelled ? 'green' : 'red'}
                  content={feed.cancelled ? 'Reactivate Feed' : 'Cancel Feed'}
                  floated='right'
                />
              )} */}
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = ({ firestore: { ordered }, async: { loading } }) => {
  let feed = {};
  if (ordered.feeds) {
    feed = ordered.feeds[0];
  }

  return {
    // "initialValues" provides the redux-form the initial data to populate with
    initialValues: feed,
    loading,
    feed
  };
};

export default withFirestore(
  connect(
    mapStateToProps,
    { createFeed, updateFeed, cancelToggle }
  )(
    reduxForm({ form: 'feedForm', enableReinitialize: true, validate })(
      FeedForm
    )
  )
);
