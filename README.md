# react-sandbox-editor

> React components including a sandbox interpreter and editor

[![NPM](https://img.shields.io/npm/v/react-sandbox-editor.svg)](https://www.npmjs.com/package/react-sandbox-editor) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


## Install

```bash
npm install --save react-sandbox-editor
```

## Simple Usage

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {Sandbox, withDependencies} from 'react-sandbox-editor'

const ReactSandbox = withDependencies([
  'https://fb.me/react-15.1.0.js',
  'https://fb.me/react-dom-15.1.0.js'
])(Sandbox)

let App = () => (
  <ReactSandbox
    theme="solarized_dark"
    scriptEditor={{
      defaultValue: 'ReactDOM.render(\n  <h1>Hello, world!</h1>,\n  document.getElementById(\'root\')\n);',
      mode: 'jsx',
      readOnly: false
    }}
    templateEditor={{
      defaultValue: '<div id="root"></div>',
      mode: 'html',
      readOnly: false
    }}
  />
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
```

## Complex Usage

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {Sandbox, withDependencies} from 'react-sandbox-editor'

const ReactSandbox = withDependencies([
  'https://fb.me/react-15.1.0.js',
  'https://fb.me/react-dom-15.1.0.js'
])(Sandbox)

class App extends React.Component  {

  onTabClick = (tabName) => {
    console.log(tabName)
  }

  onPlayButtonClick = () => {
    console.log('Play button clicked!')
  }

  render() {
    return (
      <ReactSandbox
        theme="solarized_dark"
        scriptEditor={{
          defaultValue: 'ReactDOM.render(\n  <h1>jQuery version: {jQuery.fn.jquery}</h1>,\n  document.getElementById(\'root\')\n);',
          mode: 'jsx',
          readOnly: false
        }}
        templateEditor={{
          defaultValue: '<div id="root"></div>',
          mode: 'html',
          readOnly: false
        }}
        stylesheetEditor={{
          value: '',
          mode: 'css',
          readOnly: false
        }}
        executeOnEditorChange={true}
        executeOnEditorChangeDebounce={1000}
        displayMode="tab"
        hideDisplayModeButton
        onTabClick={this.onTabClick}
        onPlayButtonClick={this.onPlayButtonClick}
        permissions={[
          'allow-forms',
          'allow-pointer-lock',
          'allow-popups',
          'allow-modals',
          'allow-same-origin',
          'allow-scripts',
          'allow-top-navigation'
        ]}
        dependencies={['https://code.jquery.com/jquery-3.3.1.min.js']}
      />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
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
