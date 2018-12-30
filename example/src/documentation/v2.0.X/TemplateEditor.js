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
      description: `Defines the editor's color theme.`
    },
    onChange: {
      type: 'function',
      acceptedValues: [`(editorValue:string) => {...}`],
      defaultValue: `no-op`,
      description: 'Invoked when code in the editor changes.'
    },
    style: {
      type: 'object',
      acceptedValues: ['{...}'],
      defaultValue: '{}',
      description: 'Styles applied to root of the editor.'
    },
    classes: {
      type: 'object',
      acceptedValues: [`{root}`
      ],
      defaultValue: '{}',
      description: 'Overrides styles (may need to use !important to override some).'
    },
    value: {
      type: 'string',
      acceptedValues: ['any string'],
      defaultValue: "''",
      description: 'Value displayed in the editor.'
    },
    mode: {
      type: 'string',
      acceptedValues: ['html'],
      defaultValue: 'html',
      description: 'Syntax highlighting mode.'
    },
    readOnly: {
      type: 'boolean',
      acceptedValues: ['true', 'false'],
      defaultValue: 'false',
      description: 'Disables typing in the editor.'
    },
    wrapLines: {
      type: 'boolean',
      acceptedValues: ['true', 'false'],
      defaultValue: 'false',
      description: 'Forces lines to wrap if they overflow the editor width.'
    }
  },
  methods: {

  }
}
