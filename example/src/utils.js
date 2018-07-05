import reactElementToJSXString from 'react-element-to-jsx-string';

function getReactSandboxUsage(component) {
  let componentString = reactElementToJSXString(component, {
    displayName: (component) => 'ReactSandbox',
    filterProps: ['onEditorChange'],
    tabStop: 2
  })
  return (
    `import {Sandbox, withDependencies} from 'react-sandbox-editor'

const ReactSandbox = withDependencies([
  'https://fb.me/react-15.1.0.js',
  'https://fb.me/react-dom-15.1.0.js'
])(Sandbox)

${componentString}`
  )
}

export {
  getReactSandboxUsage
}
