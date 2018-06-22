# react-sandbox-editor

> React components including a sandbox interpreter and editor

[![NPM](https://img.shields.io/npm/v/react-sandbox-editor.svg)](https://www.npmjs.com/package/react-sandbox-editor) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


## Install

```bash
npm install --save react-sandbox-editor
```

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'react-sandbox-editor'

class Example extends Component {
  render () {
    return (
      <MyComponent />
    )
  }
}
```

## For local development
Install nvm <br>
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

Install node 8.9.3 <br>
```bash
nvm install v8.9.3
```

Open two different terminal tabs and (assuming your pwd is the root of this repo)

In tab 1: <br>
```bash
cd src
npm link
npm install
npm start
```

In tab 2: <br>
```bash
cd example/src
npm link react-sandbox-editor
npm install
npm start
```

`src` contains the code for the react-sandbox-editor library.<br>
`example` contains a demo app that consumes the react-sandbox-editor library

## License

MIT © [malerba118](https://github.com/malerba118)
