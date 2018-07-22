import React from "react";
import ReactDOM from "react-dom";

function withDependencies(dependencies) {
  return (SandboxComponent) => (class extends React.Component {
    render() {
      let propsCopy = {...this.props}
      delete propsCopy.dependencies
      let deps = []
      if (dependencies instanceof Array) {
        deps = deps.concat(dependencies)
      }
      if (this.props.dependencies instanceof Array) {
        deps = deps.concat(this.props.dependencies)
      }
      return (
        <SandboxComponent dependencies={deps} {...propsCopy} />
      )
    }
  })
}

export {
  withDependencies,
}
