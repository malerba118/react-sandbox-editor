import reactElementToJSXString from 'react-element-to-jsx-string';

function getReactSandboxUsage(component) {
  let componentString = reactElementToJSXString(component, {
    displayName: (component) => 'ReactSandbox',
    filterProps: ['onCodeChange'],
    tabStop: 2
  })
  return (
    `import {Sandbox, withDependencies} from 'react-sandbox-editor'

const ReactSandbox = withDependencies([
  'https://unpkg.com/react@16.6.0/umd/react.development.js',
  'https://unpkg.com/react-dom@16.6.0/umd/react-dom.development.js'
])(Sandbox)

${componentString}`
  )
}

export {
  getReactSandboxUsage
}
