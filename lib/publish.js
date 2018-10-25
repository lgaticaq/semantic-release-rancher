const url = require('url')
const SemanticReleaseError = require('@semantic-release/error')
const Rancher = require('@eclass/rancher-for-ci')
const sequential = require('promise-sequential')

const upgrade = async (client, stack, service, version, logger) => {
  // Upgrade new version
  logger.log(`Upgrading ${stack}/${service} to v${version} in Rancher`)
  await client.upgrade(`${stack}/${service}`, version)
}

module.exports = async (_, { nextRelease: { version }, logger }) => {
  const client = new Rancher({
    url: url.resolve(
      process.env.RANCHER_URL,
      `/v1/projects/${process.env.RANCHER_URL}`
    ),
    accessKey: process.env.RANCHER_ACCESS_KEY,
    secretKey: process.env.RANCHER_SECRET_KEY
  })
  if (process.env.RANCHER_SERVICES) {
    try {
      const services = JSON.parse(process.env.RANCHER_SERVICES || '[]').reduce(
        (acc, curr) => {
          if (
            typeof curr !== 'undefined' &&
            (typeof curr.stack !== 'undefined' &&
              typeof curr.service !== 'undefined')
          ) {
            acc.push(curr)
          }
          return acc
        },
        []
      )
      if (services.length > 0) {
        await sequential(
          services.map(({ stack, service }) => {
            return () => upgrade(client, stack, service, version, logger)
          })
        )
      }
    } catch (error) {
      throw new SemanticReleaseError(
        'Environment variable RANCHER_SERVICES has wrong data',
        'ENORANCHERSERVICES',
        'Example RANCHER_SERVICES= \'[{"stack": "myStack1", "service": "myService1"},{"stack": "myStack2", "service": "myService2"}]\''
      )
    }
  } else {
    await upgrade(
      client,
      process.env.RANCHER_STACK,
      process.env.RANCHER_SERVICE,
      version,
      logger
    )
  }
}
