const SemanticReleaseError = require('@semantic-release/error')

const envVars = [
  {
    env: 'RANCHER_URL',
    code: 'ENORANCHERURL',
    details: 'Set RANCHER_URL. Example: https://rancher.domain.com'
  },
  {
    env: 'RANCHER_ENVIRONMENT',
    code: 'ENORANCHERURL',
    details: 'Set RANCHER_ENVIRONMENT. Example: 1a11'
  },
  {
    env: 'RANCHER_ACCESS_KEY',
    code: 'ENORANCHERACCESSTOKEN',
    details: 'Set RANCHER_ACCESS_KEY'
  },
  {
    env: 'RANCHER_SECRET_KEY',
    code: 'ENORANCHERSECRETKEY',
    details: 'Set RANCHER_SECRET_KEY'
  },
  {
    env: 'RANCHER_STACK',
    code: 'ENORANCHERSTACK',
    details: 'Set RANCHER_STACK. Example my-stack'
  },
  {
    env: 'RANCHER_SERVICE',
    code: 'ENORANCHERSERVICE',
    details: 'Set RANCHER_SERVICE. Example my-service'
  }
]

module.exports = async () => {
  envVars.forEach(envVar => {
    if (!process.env[envVar.env]) {
      throw new SemanticReleaseError(
        `Environment variable ${envVar.env} is not set`,
        envVar.code,
        envVar.details
      )
    }
  })
}
