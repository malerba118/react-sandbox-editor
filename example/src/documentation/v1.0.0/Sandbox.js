export default {
  props: {
    theme: {
      type: 'string',
      acceptedValues: [
        'monokai',
        'twilight',
        'solarized_dark',
        'solarized_light',
        'tomorrow',
        'github'
      ],
      defaultValue: 'solarized_dark',
      description: 'Defines the sandbox color theme.'
    },
    dependencies: {
      type: 'array',
      acceptedValues: ['urls'],
      defaultValue: '[]',
      description: 'Array of urls to be loaded via script tags prior to execution of editor code.'
    },
    selectedTab: {
      type: 'string',
      acceptedValues: ['templateTab', 'scriptTab', 'stylesheetTab', 'resultTab'],
      defaultValue: 'null',
      description: 'If set, overrides default tab behavior.'
    },
    displayMode: {
      type: 'string',
      acceptedValues: ['tab', 'horizontal-split'],
      defaultValue: 'null',
      description: 'If set, overrides default display mode behavior.'
    },
    executeOnEditorChange: {
      type: 'boolean',
      acceptedValues: [
        'true', 'false'
      ],
      defaultValue: 'true',
      description: 'Execute code automatically when it changes.'
    },
    executeOnEditorChangeDebounce: {
      type: 'int',
      acceptedValues: [
        'positive integer'
      ],
      defaultValue: '1000',
      description: 'Time to wait in milliseconds before automatically executing code. Only used when executeOnEditorChange is set to true.'
    },
    permissions: {
      type: 'array',
      acceptedValues: [
        'allow-forms',
        'allow-pointer-lock',
        'allow-popups',
        'allow-modals',
        'allow-same-origin',
        'allow-scripts',
        'allow-top-navigation'
      ],
      defaultValue: `[
        'allow-forms',
        'allow-pointer-lock',
        'allow-popups',
        'allow-modals',
        'allow-same-origin',
        'allow-scripts',
        'allow-top-navigation'
      ]`,
      description: 'Permissions granted to the SandboxInterpreter.'
    },
    onEditorChange: {
      type: 'function',
      acceptedValues: [`(editorName:string, editorValue:string) => {...}`],
      defaultValue: `no-op`,
      description: 'Invoked when code in any of the editors changes.'
    },
    onTabClick: {
      type: 'function',
      acceptedValues: [`(tabName:string) => {...}`],
      defaultValue: `no-op`,
      description: 'Invoked when a tab is clicked.'
    },
    onPlayButtonClick: {
      type: 'function',
      acceptedValues: [`() => {...}`],
      defaultValue: `no-op`,
      description: 'Invoked when the play button is clicked.'
    },
    onDisplayModeButtonClick: {
      type: 'function',
      acceptedValues: [`(requestedMode:string) => {...}`],
      defaultValue: `no-op`,
      description: 'Invoked when the display mode button is clicked.'
    },
    hideDisplayModeButton: {
      type: 'boolean',
      acceptedValues: ['true', 'false'],
      defaultValue: 'false',
      description: 'Hides the button to toggle the display mode.'
    },
    style: {
      type: 'object',
      acceptedValues: ['{...}'],
      defaultValue: '{}',
      description: 'Styles applied to root of sandbox.'
    },
    classes: {
      type: 'object',
      acceptedValues: [`{header,
        selectedTabIndicator,
        tab,
        selectedTab,
        iconButton,
        <theme_name>Header,
        <theme_name>SelectedTabIndicator,
        <theme_name>Tab,
        <theme_name>SelectedTab,
        <theme_name>IconButton}`
      ],
      defaultValue: '{}',
      description: 'Overrides styles globally/per theme (may need to use !important to override some).'
    },
    templateEditor: {
      type: 'object',
      acceptedValues: [
        `{
          defaultValue: string,
          mode: oneOf(['html']),
          readOnly: boolean
        }`
      ],
      defaultValue: `{
        defaultValue: '',
        mode: 'html',
        readOnly: false
      }`,
      description: 'Template editor options.'
    },
    scriptEditor: {
      type: 'object',
      acceptedValues: [
        `{
          defaultValue: string,
          mode: oneOf(['javascript', 'jsx']),
          readOnly: boolean
        }`
      ],
      defaultValue: `{
        defaultValue: '',
        mode: 'javascript',
        readOnly: false
      }`,
      description: 'Template editor options.'
    },
    stylesheetEditor: {
      type: 'object',
      acceptedValues: [
        `{
          defaultValue: string,
          mode: oneOf(['css']),
          readOnly: boolean
        }`
      ],
      defaultValue: `{
        defaultValue: '',
        mode: 'css',
        readOnly: false
      }`,
      description: 'Template editor options.'
    },
  },
  methods: {
    execute: {
      params: [],
      returnValue: '',
      description: 'Executes code'
    }
  }
}
