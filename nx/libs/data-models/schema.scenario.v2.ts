export const chutneySchemaV2 = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  type: 'object',
  definitions: {
    step: {
      type: 'object',
      required: ['description'],
      properties: {
        description: {
          type: 'string',
        },
        subSteps: {
          $ref: '#/definitions/step',
        },
        implementation: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
            },
            target: {
              type: 'string',
              enum: [],
            },
            inputs: {
              type: 'object',
            },
            outputs: {
              type: 'object',
            },
          },
        },
        strategy: {
          type: 'object',
        },
      },
    },
  },
  properties: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    givens: {
      type: 'array',
      items: {
        $ref: '#/definitions/step',
      },
      default: [],
    },
    when: {
      $ref: '#/definitions/step',
    },
    thens: {
      type: 'array',
      items: {
        $ref: '#/definitions/step',
      },
      default: [],
    },
  },
  required: ['title', 'description', 'givens', 'when', 'thens'],
};