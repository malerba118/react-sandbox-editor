# react-sandbox-editor

> React components including a sandbox interpreter and editor

[![NPM](https://img.shields.io/npm/v/react-sandbox-editor.svg)](https://www.npmjs.com/package/react-sandbox-editor) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Overview

There are many hosted web playground solutions these days (CodeSandbox, JSFiddle, CodePen).
CodeSandbox in particular has blown me away, props to Ives van Hoorne for putting it together.
However, I've yet to find a good unhosted playground solution. The intent of this library is
to provide a highly-customizable unhosted web playground solution so that in your React apps you
can include web snippets as flexible React components and not as rigid iframes with embedded content.

## Demo/Reference

<a href="https://malerba118.github.io/react-sandbox-editor/#/demo" target="_blank">https://malerba118.github.io/react-sandbox-editor/#/demo</a>
<br>
<a href="https://malerba118.github.io/react-sandbox-editor/#/docs/latest" target="_blank">https://malerba118.github.io/react-sandbox-editor/#/docs/latest</a>

### Other Examples
<a href="https://codesandbox.io/s/pw10prrqkx" target="_blank">Material UI Sandbox</a>
<br>
<a href="https://codesandbox.io/s/9znopznwko" target="_blank">Read Only Sandbox With No Header</a>
<br>
<a href="https://codesandbox.io/s/508957y704" target="_blank">Sandbox Inside Sandbox</a>
<br>
<a href="https://codesandbox.io/s/3yn607ypk6" target="_blank">Vue Sandbox</a>
<br>
<a href="https://codesandbox.io/s/xry4nlmk6o" target="_blank">TypeScript Sandbox</a>
<br>
<a href="https://codesandbox.io/s/40x2kymyr7" target="_blank">PreScript/PostScript Sandbox</a>
<br>

## Install

```bash
npm install --save react-sandbox-editor
```

## Simple Usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Sandbox, withDependencies } from "react-sandbox-editor";

const ReactSandbox = withDependencies([
  "https://unpkg.com/react@16.6.0/umd/react.development.js",
  "https://unpkg.com/react-dom@16.6.0/umd/react-dom.development.js"
])(Sandbox);

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
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

## Complex Usage

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { Sandbox, withDependencies } from "react-sandbox-editor";

const ReactSandbox = withDependencies([
  "https://unpkg.com/react@16.6.0/umd/react.development.js",
  "https://unpkg.com/react-dom@16.6.0/umd/react-dom.development.js"
])(Sandbox);

const jsxCode = `const { Chip, Avatar } = window["material-ui"]

ReactDOM.render(
	<Chip
		avatar={<Avatar>MB</Avatar>}
		label="Clickable Chip"
		onClick={() => alert("Chip Clicked!")}
	/>,
	document.getElementById('root')
);`;

class App extends React.Component {
  onTabClick = (event, tabName) => {
    console.log(tabName);
  };

  onPlayButtonClick = (event) => {
    console.log("Play button clicked!");
  };

  onCodeChange = (editorName, value) => {
    console.log(`Code in ${editorName} editor has changed: ${value}`);
  };

  render() {
    return (
      <ReactSandbox
        theme="solarized_dark"
        scriptEditor={{
          defaultValue: jsxCode,
          mode: "jsx",
          readOnly: false,
          wrapLines: true
        }}
        templateEditor={{
          defaultValue: '<div id="root"></div>',
          mode: "html",
          readOnly: false,
          wrapLines: true
        }}
        stylesheetEditor={{
          defaultValue: "body { background: pink; }",
          mode: "css",
          readOnly: false,
          wrapLines: true
        }}
        executeOnCodeChange={true}
        executeOnCodeChangeDebounce={1000}
        onTabClick={this.onTabClick}
        displayMode="horizontal-split"
        hideDisplayModeButton
        horizontalSplitOffset={60}
        onPlayButtonClick={this.onPlayButtonClick}
        onCodeChange={this.onCodeChange}
        permissions={[
          "allow-forms",
          "allow-pointer-lock",
          "allow-popups",
          "allow-modals",
          "allow-same-origin",
          "allow-scripts",
          "allow-top-navigation"
        ]}
        dependencies={[
          "https://unpkg.com/@material-ui/core@3.0.0/umd/material-ui.development.js"
        ]}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
```

## Sandbox Execution
Under the hood, code is executed in a sandboxed iframe as follows:
```
<iframe>
  <html>
    <head>
      <style>{stylesheetEditorCode}</style>
    </head>
    <body>
      {templateEditorCode}
      <script src={dependency1}></script>
      <script src={dependency2}></script>
      ...
      <script src={dependencyN}></script>
      <script>{preScript}</script>
      <script>{scriptEditorCode}</script>
      <script>{postScript}</script>
    </body>
  </html>
</iframe>
```

## Compatibility

Version 1.X.X requires react 15.X.X || 16.X.X and react-dom 15.X.X || 16.X.X

Version 2.X.X requires react >= 16.3.0 and react-dom >= 16.3.0


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
