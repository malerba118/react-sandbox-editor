import Sandbox from './Sandbox'
import StatelessSandbox from './StatelessSandbox'
import TemplateEditor from './TemplateEditor'
import ScriptEditor from './ScriptEditor'
import StylesheetEditor from './StylesheetEditor'
import SandboxInterpreter from './SandboxInterpreter'
import withDependencies from './withDependencies'


export default {
  "components": {
    Sandbox,
    StatelessSandbox,
    TemplateEditor,
    ScriptEditor,
    StylesheetEditor,
    SandboxInterpreter
  },
  "hoc": {
    withDependencies
  }
}
