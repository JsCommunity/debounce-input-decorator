import debounce from 'lodash/debounce'
import React from 'react'

const DEFAULT_DELAY = ({ debounceTimeout = 250 }) => debounceTimeout

const getEventValue = event => {
  let target, value
  return (
    event != null &&
    (target = event.target) != null &&
    (value = target.value) !== undefined
  ) ? value : event
}

const debounceInputDecorator = (delay = DEFAULT_DELAY) => Input =>
  class DebouncedInput extends React.Component {
    constructor (props) {
      super()
      this.state = { value: props.value }

      this._notify = debounce(event => {
        this.props.onChange(event)
      }, typeof delay === 'function' ? delay(props) : delay)

      this._onChange = event => {
        this.setState({ value: getEventValue(event) })

        if (event != null && typeof event.persist === 'function') {
          event.persist()
        }
        this._notify(event)
      }

      this._wrappedInstance = null
      this._onRef = ref => {
        this._wrappedInstance = ref
      }
    }

    componentWillReceiveProps ({ value }) {
      if (value !== this.props.value) {
        this._notify.cancel()
        this.setState({ value })
      }
    }

    componentWillUnmount () {
      this._notify.flush()
    }

    getWrappedInstance () {
      return this._wrappedInstance
    }

    render () {
      const props = Object.assign({}, this.props, {
        onChange: this._onChange,
        ref: this._onRef,
        value: this.state.value
      })
      delete props.debounceTimeout
      return React.createElement(Input, props)
    }
  }
export { debounceInputDecorator as default }

// common components
export const Input = debounceInputDecorator()('input')
export const Textarea = debounceInputDecorator()('textarea')
