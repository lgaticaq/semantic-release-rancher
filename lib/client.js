const { URL } = require('url')
const Rancher = require('@eclass/rancher-for-ci')

/** @typedef {import('@eclass/rancher-for-ci')} Rancher */
/**
 * @param {string} environmentId -
 * @param {string} rancherUrl -
 * @param {string} accessKey -
 * @param {string} secretKey -
 * @param {boolean} [dryRun=false] -
 * @returns {Rancher} -
 * @example
 * const rancher = client('environmentId', 'https://rancher.example.com', accessKey, secretKey)
 */
module.exports = (
  environmentId,
  rancherUrl,
  accessKey,
  secretKey,
  dryRun = false
) => {
  const url = new URL(`/v1/projects/${environmentId}`, rancherUrl)
  return new Rancher({ url: url.href, accessKey, secretKey, dryRun })
}
