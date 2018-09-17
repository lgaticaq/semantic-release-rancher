const SemanticReleaseError = require('@semantic-release/error')

const envVars = [
  { env: 'RANCHER_URL', code: 'ENORANCHERURL', details: 'Set RANCHER_URL. Example: https://rancher.domain.com/v1/projects/{ID}' },
  { env: 'RANCHER_ACCESS_KEY', code: 'ENORANCHERACCESSTOKEN', details: 'Set RANCHER_ACCESS_KEY' },
  { env: 'RANCHER_SECRET_KEY', code: 'ENORANCHERSECRETKEY', details: 'Set RANCHER_SECRET_KEY' },
  { env: 'PLUGIN_SERVICE', code: 'ENORANCHERSERVICE', details: 'Set PLUGIN_SERVICE. Example my-stack/my-service' }
]

module.exports = async () => {
  envVars.forEach(envVar => {
    if (!process.env[envVar.env]) {
      throw new SemanticReleaseError(`Environment variable ${envVar.env} is not set`, envVar.code, envVar.details)
    }
  })
}
