# react-sandbox-editor

> React components including a sandbox interpreter and editor

[![NPM](https://img.shields.io/npm/v/react-sandbox-editor.svg)](https://www.npmjs.com/package/react-sandbox-editor) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


## Demo/Reference

<a href="https://malerba118.github.io/react-sandbox-editor/#/demo" target="_blank">https://malerba118.github.io/react-sandbox-editor/#/demo</a>
<br>
<a href="https://malerba118.github.io/react-sandbox-editor/#/docs/v1.0.0" target="_blank">https://malerba118.github.io/react-sandbox-editor/#/docs/v1.0.0</a>

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
      readOnly: false,
      wrapLines: false
    }}
    templateEditor={{
      defaultValue: '<div id="root"></div>',
      mode: 'html',
      readOnly: false,
      wrapLines: false
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
  'https://unpkg.com/react@latest/umd/react.development.js',
  'https://unpkg.com/react-dom@latest/umd/react-dom.development.js'
])(Sandbox)

const jsxCode = (
`const { Chip, Avatar } = window["material-ui"]

ReactDOM.render(
	<Chip
		avatar={<Avatar>MB</Avatar>}
		label="Clickable Chip"
		onClick={() => alert("Chip Clicked!")}
	/>,
	document.getElementById('root')
);`
)

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
          defaultValue: jsxCode,
          mode: 'jsx',
          readOnly: false,
          wrapLines: true
        }}
        templateEditor={{
          defaultValue: '<div id="root"></div>',
          mode: 'html',
          readOnly: false,
          wrapLines: true
        }}
        stylesheetEditor={{
          defaultValue: 'body { background: pink; }',
          mode: 'css',
          readOnly: false,
          wrapLines: true
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
        dependencies={['https://unpkg.com/@material-ui/core/umd/material-ui.development.js']}
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
