export default {
  props: {
    dependencies: {
      type: 'array',
      acceptedValues: ['urls'],
      defaultValue: '[]',
      description: 'Array of urls to be loaded via script tags prior to execution of template, script, and stylesheet code.'
    },
    template: {
      type: 'string',
      acceptedValues: ['any string'],
      defaultValue: "''",
      description: 'Template code to be rendered as html body.'
    },
    templateMode: {
      type: 'string',
      acceptedValues: ['html'],
      defaultValue: 'html',
      description: 'Defines how template should be proccessed.'
    },
    preScript: {
      type: 'string',
      acceptedValues: [
        'any string'
      ],
      defaultValue: `''`,
      description: `Script run before primary script. preScript code to be interpreted as type specified by scriptMode.`
    },
    script: {
      type: 'string',
      acceptedValues: ['any string'],
      defaultValue: "''",
      description: 'Script code to be interpreted as type specified by scriptMode.'
    },
    postScript: {
      type: 'string',
      acceptedValues: [
        'any string'
      ],
      defaultValue: `''`,
      description: `Script run after primary script. postScript code to be interpreted as type specified by scriptMode.`
    },
    scriptMode: {
      type: 'string',
      acceptedValues: ['javascript', 'jsx'],
      defaultValue: 'javascript',
      description: 'Defines how script should be proccessed.'
    },
    stylesheet: {
      type: 'string',
      acceptedValues: ['any string'],
      defaultValue: "''",
      description: 'Stylesheet code to be interpreted as type specified by stylesheetMode.'
    },
    stylesheetMode: {
      type: 'string',
      acceptedValues: ['css'],
      defaultValue: 'css',
      description: 'Defines how stylesheet should be proccessed.'
    },
    style: {
      type: 'object',
      acceptedValues: ['{...}'],
      defaultValue: '{}',
      description: 'Styles applied to root of the editor.'
    },
    className: {
      type: 'string',
      acceptedValues: ['Css class name'],
      defaultValue: "''",
      description: 'Css class applied to root of interpreter.'
    },
    onRef: {
      type: 'function',
      acceptedValues: [
        '(component: SandboxInterpreter) => {...}'
      ],
      defaultValue: `''`,
      description: `A way to get a component instance to call instance methods.`
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
