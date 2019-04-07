import React, { Component } from 'react';
import { Parallax } from 'react-parallax';

class about extends Component {
  render() {
    return (
      <div>
        {/* -----basic config-----*/}
        <Parallax
          blur={0}
          bgImage={require('./showcase.jpg')}
          bgImageAlt='the cat'
          strength={500}
        >
          {/*text here */}
          <div style={{ height: '320px' }} />
        </Parallax>
        <div className='grey lighten-3 center'>
          <h2 className='grey-text text-darken-3 center'>ABOUT US</h2>
          <h4 className=' pink-text text-darken-3 center'>Who We Are</h4>
          <blockquote>
            Walora - Igniting Dreams began as a movement which was started by
            students of the University of the Free State. Inspired by the
            legendary Nelson Rolihlahla Mandela, it seeks to honour his life and
            legacy by imparting the values that he lived by into our beloved
            society. Its objective is to break the social norm and inspire young
            South Africans to dream big and raise the bar in communities in
            changing the status quo. Doing this by focusing on a child with low
            self-esteem without sense of being and giving them experiences which
            bring about self- worth. The affiliates of this social movement are
            there to encrypt new perspective and enlighten one’s life to be a
            greater organ to promote human dignity. Fundamental change can only
            be inspired firstly through education. Mainly because we live in
            times where education is the emphasized weapon that one can use to
            free themselves, others and be of service every day.
          </blockquote>{' '}
          <br />
        </div>
        {/* -----dynamic blur-----*/}
        <Parallax
          blur={0}
          bgImage={require('./showcase.jpg')}
          bgImageAlt='the cat'
          strength={500}
        >
          {/*text here */}
          <div style={{ height: '320px' }} />
        </Parallax>

        <div className='grey lighten-3'>
          <h4 className='pink-text text-darken-3 center'>Why Choose Us?</h4>
          <blockquote>
            As a registered non-profit organisation, we collaborate with various
            individuals, other organisations and stakeholders who seek to
            enhance community development and human dignity. Our projects, with
            orphanages, schools and old age homes, rest mainly on four pillars.
            They are namely: <br />
            • Education
            <br />
            • Mentorship
            <br />
            • Community Integration
            <br />
            • Human dignity
            <br />
            We currently have a student society, Igniting Dreams UFS Chapter,
            which functions as an association on the Bloemfontein campus.
          </blockquote>
        </div>

        <Parallax
          bgImage={require('./showcase.jpg')}
          bgImageAlt='the cat'
          strength={500}
        >
          {/*text here */}
          <div style={{ height: '250px' }} />
        </Parallax>
        <div className='grey lighten-3'>
          <h4 className='pink-text text-darken-3 center'>Vision</h4>
          <blockquote>
            The movement aims to shake the boundaries of social norm, eradicate
            use of drugs in our communities and champion spirit of Ubuntu in a
            practical manner. Through integrating the movement into the society,
            it will be able to influence and impact the young generation of
            South Africa to use that likes of Mandela, Biko, Tambo and many of
            our struggles legends championed. Our vision is to make an impact in
            the world by igniting one dream at a time.
          </blockquote>
        </div>
        <Parallax
          bgImage={require('./showcase.jpg')}
          bgImageAlt='the cat'
          strength={500}
        >
          {/*text here */}
          <div style={{ height: '320px' }} />
        </Parallax>
      </div>
    );
  }
}

export default about;
// Under Construction
//https://www.npmjs.com/package/react-under-construction
