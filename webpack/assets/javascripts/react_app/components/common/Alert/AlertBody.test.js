import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import React from 'react';

import AlertBody from './AlertBody';

describe('AlertBody', () => {
  const testAleryBodyRenderer = (component) => {
    const wrapper = shallow(component);

    expect(toJson(wrapper)).toMatchSnapshot();
  };

  it('should render with title and message', () =>
    testAleryBodyRenderer(<AlertBody title="some title" message="some message" />));

  it('should render with childrens', () =>
    testAleryBodyRenderer(<AlertBody>
        <span>a Child</span>
      </AlertBody>));

  it('should render with link', () =>
    testAleryBodyRenderer(<AlertBody link={{ children: 'link text', href: '#' }} />));

  it('should render With all props', () =>
    testAleryBodyRenderer(<AlertBody
        title="some title"
        message="some message"
        link={{ children: 'link text', href: '#' }}
      >
        <span>a Child</span>
      </AlertBody>));
});
