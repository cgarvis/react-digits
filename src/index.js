import React, { Component } from 'react'

export default class DigitsButton extends Component {
  static propTypes = {
    consumerKey: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,
    labelSigningIn: React.PropTypes.string,
    onLoad: React.PropTypes.func,
    onLoadError: React.PropTypes.func,
    onLogin: React.PropTypes.func.isRequired,
    onLoginFailure: React.PropTypes.func,
    style: React.PropTypes.object,
  }

  static defaultProps = {
    label: 'Sign in with Phone',
    labelSigningIn: 'Signing In...',
    onLoad: () => { console.info('Digits loaded') },
    onLoadError: (err) => { console.error('Digits failed to load', err) },
    style: {},
  }

  constructor(props, context) {
    super(props, context)

    this.state = {
      loaded: false,
      signingIn: false,
    }
  }

  componentDidMount() {
    this.script = document.createElement('script')
    this.script.src = 'https://cdn.digits.com/1/sdk.js'
    this.script.async = 1

    this.script.onload = () => this.init()
    this.script.onerror = () => this.setState({ errorLoadingDigits: true })

    document.body.appendChild(this.script);
  }

  componentWillUnmount() {
    document.body.removeChild(this.script);
  }

  init() {
    Digits.init({ consumerKey: this.props.consumerKey })
      .done(this.handleLoad.bind(this))
      .fail(this.handleLoadError.bind(this))
  }

  handleLoad() {
    this.setState({ loaded: true })
    this.props.onLoad()
  }

  handleLoadError(err) {
    this.props.onLoadError(err)
  }

  handleClick() {
    this.setState({ signingIn: true })

    Digits.logIn()
      .done(this.handleLogin.bind(this))
      .fail(this.handleLoginFailure.bind(this))
  }

  handleLogin(loginResponse) {
    this.props.onLogin(loginResponse)
    this.setState({ signingIn: false })
  }

  handleLoginFailure(loginResponse) {
    this.setState({ signingIn: false })
    this.props.onLoginFailure(loginResponse)
  }

  render() {
    return (
      <button
        disabled={ !this.state.loaded || this.state.signingIn }
        onClick={() => this.handleClick()}
        style={ this.props.style }
      >
        { this.state.signingIn ? this.props.labelSigningIn : this.props.label }
      </button>
    )
  }
}
