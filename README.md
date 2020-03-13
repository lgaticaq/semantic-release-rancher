# semantic-release-rancher

[![npm](https://img.shields.io/npm/v/semantic-release-rancher.svg)](https://www.npmjs.com/package/lgaticaq/semantic-release-rancher)
[![build](https://img.shields.io/travis/lgaticaq/semantic-release-rancher.svg)](https://travis-ci.org/lgaticaq/semantic-release-rancher)
[![downloads](https://img.shields.io/npm/dt/semantic-release-rancher.svg)](https://www.npmjs.com/package/semantic-release-rancher)
[![dependencies](https://img.shields.io/david/lgaticaq/semantic-release-rancher.svg)](https://david-dm.org/lgaticaq/semantic-release-rancher)
[![devDependency Status](https://img.shields.io/david/dev/lgaticaq/semantic-release-rancher.svg)](https://david-dm.org/lgaticaq/semantic-release-rancher#info=devDependencies)
[![Maintainability](https://api.codeclimate.com/v1/badges/18dc7fc52da810de5a8d/maintainability)](https://codeclimate.com/github/lgaticaq/semantic-release-rancher/maintainability)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> Set of [semantic-release](https://github.com/semantic-release/semantic-release) plugins for upgrade service in [Rancher](https://rancher.com/docs/rancher/v1.6/en/cattle/upgrading/).

| Step               | Description        |
|--------------------|--------------------|
| `verifyConditions` | Verify the presence and the validity of the rancher api key (set via [environment variables](#environment-variables)). |
| `publish`          | Upgrade a service with a new version. |

## Install

```bash
npm i -D semantic-release-rancher
```

## Usage

The plugin can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/caribou/docs/usage/configuration.md#configuration):

```json
{
  "plugins": [
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/gitlab",
    "semantic-release-gitlab-registry",
    "semantic-release-rancher"
  ]
}
```

Example .gitlab-ci.yml

```yml
stages:
  - test
  - release

test:
  image: node:alpine
  stage: test
  before_script:
    - npm i
  script:
    - npm t

release:
  image: node:alpine
  stage: release
  before_script:
    - npm i
    - docker build -t $CI_REGISTRY_IMAGE .
  script:
    - npx semantic-release
  only:
    - master
```

## Configuration

### Environment variables

| Variable              | Description                                                                   |
| --------------------- | ----------------------------------------------------------------------------- |
| `RANCHER_URL`         | **Required.** The url of rancher server. Example: https://rancher.example.com |
| `RANCHER_ENVIRONMENT` | **Required.** The environment id. Example: 1a11                               |
| `RANCHER_ACCESS_KEY`  | **Required.** The API access key.                                             |
| `RANCHER_SECRET_KEY`  | **Required.** The API secret key.                                             |
| `RANCHER_STACK`       | **Required.** The stack name.                                                 |
| `RANCHER_SERVICE`     | **Required.** The service name.                                               |
| `RANCHER_SERVICES`    | Optional JSON array with objects stack/service to upgrade multiple services. Example: `[{"stack": "myStack1", "service": "myService1"},{"stack": "myStack2", "service": "myService2"}]` |

### Options

| Variable             | Description |
| -------------------- | -------------------------------- |
| `rancherUrl`         | The url of rancher server. Example: `https://rancher.example.com` |
| `rancherEnvironment` | The environment id. Example: `1a11` |
| `services`  | Array of object services. Example: `[{"stack": "MyStack", "service": "MyService"}, {"stack": "MyStack", "service": "MyOtherService", "startFirst": false}]` |

### Examples

```json
{
  "plugins": [
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/gitlab",
    "semantic-release-gitlab-registry",
    [
      "semantic-release-rancher",
      {
        "rancherUrl": "https://rancher.example.com",
        "rancherEnvironment": "1a11",
        "services": [
          {
            "stack": "MyStack",
            "service": "MyService"
          },
          {
            "stack": "MyStack",
            "service": "MyOtherService",
            "startFirst": false
          }
        ]
      }
    ]
  ]
}
```

## License

[MIT](https://tldrlegal.com/license/mit-license)
