module.exports = async (pluginConfig, { logger }) => {
  for (const envVar of ['RANCHER_URL', 'RANCHER_ACCESS_KEY', 'RANCHER_SECRET_KEY', 'PLUGIN_SERVICE']) {
    if (!process.env[envVar]) {
      throw new Error(`Environment variable ${envVar} is not set`)
    }
  }
}
