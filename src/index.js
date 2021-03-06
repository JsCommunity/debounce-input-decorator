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

const EMPTY_VALUE = { value: undefined }

const debounceInputDecorator = (delay = DEFAULT_DELAY) => Input =>
  class DebouncedInput extends React.Component {
    constructor (props) {
      super()
      this.state = {}

      this._notify = debounce(event => {
        this.props.onChange(event)
        this.setState(EMPTY_VALUE)
      }, typeof delay === 'function' ? delay(props) : delay)

      this._onBlur = event => {
        this._notify.flush()
        const { onBlur } = this.props
        if (onBlur !== undefined) {
          onBlur(event)
        }
      }

      this._onChange = event => {
        this.setState({ value: getEventValue(event) })

        if (event != null && typeof event.persist === 'function') {
          event.persist()
        }
        this._notify(event)
      }

      this._onKeyDown = event => {
        if (event != null && event.key === 'Enter') {
          this._notify.flush()
        }
        const { onKeyDown } = this.props
        if (onKeyDown !== undefined) {
          onKeyDown(event)
        }
      }

      this._wrappedInstance = null
      this._onRef = ref => {
        this._wrappedInstance = ref
      }
    }

    componentWillReceiveProps ({ value }) {
      if (value !== this.props.value) {
        this._notify.cancel()
        this.setState(EMPTY_VALUE)
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
        onBlur: this._onBlur,
        onChange: this._onChange,
        onKeyDown: this._onKeyDown,
        ref: this._onRef,
      })
      delete props.debounceTimeout
      const { value } = this.state
      if (value !== undefined) {
        props.value = value
      }
      return React.createElement(Input, props)
    }
  }
export { debounceInputDecorator as default }

// common components
export const Input = debounceInputDecorator()('input')
export const Textarea = debounceInputDecorator()('textarea')
