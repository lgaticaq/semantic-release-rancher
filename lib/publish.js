const getError = require('./get-error')
const rancher = require('./client')

/**
 * @typedef {import('./types').Context} Context
 * @typedef {import('./types').Config} Config
 */
/**
 * @param {Config} pluginConfig -
 * @param {Context} ctx -
 * @returns {Promise<*>} -
 * @example
 * verifyConditions(pluginConfig, ctx)
 */
module.exports = async (pluginConfig, ctx) => {
  const client = rancher(
    ctx.env.RANCHER_ENVIRONMENT || pluginConfig.rancherEnvironment,
    ctx.env.RANCHER_URL || pluginConfig.rancherUrl,
    ctx.env.RANCHER_ACCESS_KEY,
    ctx.env.RANCHER_SECRET_KEY
  )
  try {
    for (const { stack, service } of pluginConfig.services) {
      ctx.logger.log(
        `Upgrading ${stack}/${service} to v${ctx.nextRelease.version} in Rancher`
      )
      await client.upgrade(`${stack}/${service}`, ctx.nextRelease.version)
    }
  } catch (error) {
    ctx.logger.log(error)
    ctx.error = error
    throw getError('ERANCHERDEPLOY', ctx)
  }
}
