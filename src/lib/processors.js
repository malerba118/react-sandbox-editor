import babel from '@babel/standalone';

function getScriptProcessor(mode) {
  if (mode === 'jsx') {
    return (code) => {
      return babel.transform(code, {
        "presets": [
          ["stage-0", { "decoratorsLegacy": true }],
          "react"
        ]
      }).code
    }
  }
  else {
    return (code) => {
      return code
    }
  }
}

function getStylesheetProcessor(mode) {
  if (mode === 'scss') {
    return (code) => {
      return code
    }
  }
  else if (mode === 'sass') {
    return (code) => {
      return code
    }
  }
  else {
    return (code) => {
      return code
    }
  }
}

function getTemplateProcessor(mode) {
  return (code) => {
    return code
  }
}

export default {
  getScriptProcessor,
  getStylesheetProcessor,
  getTemplateProcessor
}
