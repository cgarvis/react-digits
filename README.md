# react-digits
[React](https://github.com/facebook/react) component for Twitter's [Digits](https://docs.fabric.io/ios/digits/digits.html)

## Usage

```javascript
import React, { Component } from 'react'
import Digits from 'react-digits';

export default class Login extends Component {
  get consumerKey() {
    return 'ENTER YOUR DIGITS CONSUMER KEY HERE'
  }
  
  handleLogin(resp) {
    console.info(resp)
  }

  render() {
    return (
      <Digits
        consumerKey={ this.consumerKey }
        onLogin={ this.handleLogin.bind(this) } />
    )
  }
}
```
