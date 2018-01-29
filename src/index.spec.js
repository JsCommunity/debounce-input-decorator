/* eslint-env jest */

import Adapter from 'enzyme-adapter-react-16'
import forEach from 'lodash/forEach'
import React from 'react'
import { configure, shallow } from 'enzyme'

import { Input, Textarea } from './'

configure({ adapter: new Adapter() })

forEach({ Input, Textarea }, (Component, name) => {
  it(name, () => {
    expect(shallow(React.createElement(Component, {
      debounceTimeout: 250,
      value: '',
    }))).toMatchSnapshot()
  })
})
