# debounce-input-decorator [![Build Status](https://travis-ci.org/JsCommunity/debounce-input-decorator.png?branch=master)](https://travis-ci.org/JsCommunity/debounce-input-decorator)

> Decorator to easily create debounced React inputs

## Install

Installation of the [npm package](https://npmjs.org/package/debounce-input-decorator):

```
> npm install --save debounce-input-decorator
```

## Usage

```js
import React, Component from 'react'
import debounceDecorator from 'debounce-input-decorator'
import { render } from 'react-dom'

const Input = debounceDecorator(250)('input')

class App extends Component {
  state = {
    value: ''
  }

  render () {
    return <Input
      onChange={event => this.setState({ value: event.target.value })}
      value={this.state.value}
    />
  }
}

render(App, document.body)
```

You can apply this decorator to any React component as long as it
accepts `onChange` and `value` properties.

Because you usually need a `input` or `textarea`, those are provided
directly:

```js
import { Input, Textarea } from 'debounce-input-decorator'

<Input
  debounceTimeout={300}
  // ...
/>
```

## Development

```
# Install dependencies
> yarn

# Run the tests
> yarn test

# Continuously compile
> yarn dev

# Continuously run the tests
> yarn dev-test

# Build for production (automatically called by npm install)
> yarn build

# Commit changes
> yarn cz
```

## Contributions

Contributions are *very* welcomed, either on the documentation or on
the code.

You may:

- report any [issue](https://github.com/JsCommunity/debounce-input-decorator/issues)
  you've encountered;
- fork and create a pull request.

## License

ISC © [Julien Fontanet](https://github.com/julien-f)
