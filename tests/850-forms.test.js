import React from 'react';
import PropTypes from 'prop-types';
import { shallow, mount, render } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';

import KVs from '../src/components/lib/kvs';

chai.use(chaiEnzyme());
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');

global.window = jsdom.window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js'
};

const clickSpy = sinon.spy();

describe('<KVs />', () => {
  it('Empty KVs', () => {
    const wrapper = mount(<KVs />, {
      context: { store: storeFactory() },
      childContextTypes: { store: PropTypes.object }
    });
  });
});
