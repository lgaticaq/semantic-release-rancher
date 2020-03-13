/* eslint-disable sonarjs/no-duplicate-string */
// @ts-ignore
const pkg = require('../package.json')

const [homepage] = pkg.homepage.split('#')
/**
 * @param {string} file -
 * @returns {string} -
 * @example
 * const link = linkify(href)
 */
const linkify = file => `${homepage}/blob/master/${file}`

/**
 * @typedef {import('./types').Context} Context
 * @typedef {import('./types').SemanticReleaseError} SemanticReleaseError
 */

module.exports = new Map([
  [
    'ENORANCHERACCESSKEY',
    /**
     * @param {Context} ctx -
     * @returns {SemanticReleaseError} -
     */
    ctx => ({
      message: 'No rancher access key specified.',
      details: `An [rancher access key](${linkify(
        'README.md#environment-variables'
      )}) must be created and set in the \`RANCHER_ACCESS_KEY\` environment variable on your CI environment.


Please make sure to create an [rancher access key](https://rancher.com/docs/rancher/v1.6/en/api/v1/api-keys/) and to set it in the \`RANCHER_ACCESS_KEY\` environment variable on your CI environment. The api key must allow to the environment.`
    })
  ],
  [
    'ENORANCHERSECRETKEY',
    /**
     * @param {Context} ctx -
     * @returns {SemanticReleaseError} -
     */
    ctx => ({
      message: 'No rancher secret key specified.',
      details: `An [rancher secret key](${linkify(
        'README.md#environment-variables'
      )}) must be created and set in the \`RANCHER_SECRET_KEY\` environment variable on your CI environment.

Please make sure to create an [rancher secret key](https://rancher.com/docs/rancher/v1.6/en/api/v1/api-keys/) and to set it in the \`RANCHER_SECRET_KEY\` environment variable on your CI environment. The api key must allow to the environment.`
    })
  ],
  [
    'ENORANCHERURL',
    /**
     * @param {Context} ctx -
     * @returns {SemanticReleaseError} -
     */
    ctx => ({
      message: 'No rancher url specified.',
      details: `An [rancher url](${linkify(
        'README.md#environment-variables'
      )}) must be created and set in the \`RANCHER_URL\` environment variable on your CI environment or set \`rancherUrl\` in plugin config.`
    })
  ],
  [
    'ENORANCHERENVIRONMENT',
    /**
     * @param {Context} ctx -
     * @returns {SemanticReleaseError} -
     */
    ctx => ({
      message: 'No rancher environment specified.',
      details: `An [rancher environment](${linkify(
        'README.md#environment-variables'
      )}) must be created and set in the \`RANCHER_ENVIRONMENT\` environment variable on your CI environment or set \`rancherEnvironment\` in plugin config.`
    })
  ],
  [
    'ENORANCHERSERVICES',
    /**
     * @param {Context} ctx -
     * @returns {SemanticReleaseError} -
     */
    ctx => ({
      message: 'No rancher services specified.',
      details: `An [rancher services](${linkify(
        'README.md#options'
      )}) must be set \`services\` object with \`stack\` and \`service\` properties in plugin config.`
    })
  ],
  [
    'EUNAUTHORIZED',
    /**
     * @param {Context} ctx -
     * @returns {SemanticReleaseError} -
     */
    ctx => ({
      message: 'The api key specified not valid.',
      details: `The [api key](${linkify(
        'README.md#environment-variables'
      )}) specified not valid or not allowed with current environment.`
    })
  ],
  [
    'EUNKNOWN',
    /**
     * @param {Context} ctx -
     * @returns {SemanticReleaseError} -
     */
    ctx => ({
      message: ctx.message,
      details: ''
    })
  ],
  [
    'ERANCHERDEPLOY',
    /**
     * @param {Context} ctx -
     * @returns {SemanticReleaseError} -
     */
    ctx => ({
      message: 'Error in new deploy.',
      details: 'Check the status of rancher server'
    })
  ]
])
/* eslint-enable sonarjs/no-duplicate-string */
