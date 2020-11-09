const { URL } = require('url')
const AggregateError = require('aggregate-error')
const getError = require('./get-error')
const rancher = require('./client')

/**
 * @param {string} url -
 * @returns {boolean} -
 * @example
 * verifyConditions(pluginConfig, ctx)
 */
const isValidUrl = url => {
  try {
    // eslint-disable-next-line no-unused-vars
    const { href } = new URL(url)
    return true
  } catch (err) {
    return false
  }
}

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
// eslint-disable-next-line sonarjs/cognitive-complexity
module.exports = async (pluginConfig, ctx) => {
  try {
    const errors = []
    if (!ctx.env.RANCHER_ACCESS_KEY) {
      errors.push(getError('ENORANCHERACCESSKEY', ctx))
    }
    if (!ctx.env.RANCHER_SECRET_KEY) {
      errors.push(getError('ENORANCHERSECRETKEY', ctx))
    }
    const rancherUrl = ctx.env.RANCHER_URL || pluginConfig.rancherUrl
    if (!rancherUrl) {
      errors.push(getError('ENORANCHERURL', ctx))
    } else if (!isValidUrl(rancherUrl)) {
      errors.push(getError('EINVALIDRANCHERURL', ctx))
    }
    const rancherEnvironment =
      ctx.env.RANCHER_ENVIRONMENT || pluginConfig.rancherEnvironment
    if (!rancherEnvironment) {
      errors.push(getError('ENORANCHERENVIRONMENT', ctx))
    }
    if (!pluginConfig.services || pluginConfig.services.length === 0) {
      errors.push(getError('ENORANCHERSERVICES', ctx))
    }
    const client = rancher(
      rancherEnvironment,
      rancherUrl,
      ctx.env.RANCHER_ACCESS_KEY,
      ctx.env.RANCHER_SECRET_KEY,
      true
    )
    const { isValid, errorCode } = await client.validate()
    if (!isValid) {
      if (errorCode === 'NOT_FOUND_ENVIRONMENT') {
        ctx.message = rancherEnvironment
        errors.push(getError('ENORANCHERENVIRONMENT', ctx))
      } else if (errorCode === 'UNAUTHORIZED') {
        errors.push(getError('EUNAUTHORIZED', ctx))
      } else {
        ctx.message = 'Got error when get validate environment and api keys'
        errors.push(getError('EUNKNOWN', ctx))
      }
    }
    for (const { service, stack, startFirst = true } of pluginConfig.services) {
      if (!service || !stack) {
        errors.push(getError('ENORANCHERSERVICES', ctx))
        continue
      }
      let version = 'latest'
      if (ctx.lastRelease && ctx.lastRelease.version) {
        version = ctx.lastRelease.version
      }
      await client.upgrade(`${stack}/${service}`, version, null, startFirst)
    }
    if (errors.length > 0) {
      throw new AggregateError(errors)
    }
  } catch (err) {
    ctx.logger.log(err)
    if (err instanceof AggregateError) {
      throw err
    } else {
      ctx.message = 'Got error when get validate environment and api keys'
      ctx.error = err
      throw getError('EUNKNOWN', ctx)
    }
  }
}
