const Rancher = require('@eclass/rancher-for-ci')

module.exports = async (pluginConfig, { nextRelease: { version }, logger }) => {
  const client = new Rancher({
    url: process.env.RANCHER_URL,
    accessKey: process.env.RANCHER_ACCESS_KEY,
    secretKey: process.env.RANCHER_SECRET_KEY,
  })
  // Upgrade new version
  logger.log(`Upgrading ${process.env.PLUGIN_SERVICE} to v${version} in Rancher`)
  await client.upgrade(process.env.PLUGIN_SERVICE, version)
}
