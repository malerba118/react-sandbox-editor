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
