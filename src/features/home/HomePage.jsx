import React from 'react';

const HomePage = ({ history }) => {
  return (
    <div>
      <div className='ui inverted vertical masthead center aligned segment'>
        <div className='ui text container'>
          {' '}
          <h1 className='ui inverted stackable header' />
          <img
            className='ui centered medium circular image'
            src='/assets/logo.png'
            alt='logo'
          />
          <div
            onClick={() => history.push('/about')}
            className='ui huge white inverted button'
          >
            Get Started
            <i className='right arrow icon' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
