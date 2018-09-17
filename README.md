# semantic-release-rancher

[![npm](https://img.shields.io/npm/v/semantic-release-rancher.svg)](https://www.npmjs.com/package/lgaticaq/semantic-release-rancher)
[![build](https://img.shields.io/travis/lgaticaq/semantic-release-rancher.svg)](https://travis-ci.org/lgaticaq/semantic-release-rancher)
[![downloads](https://img.shields.io/npm/dt/semantic-release-rancher.svg)](https://www.npmjs.com/package/semantic-release-rancher)
[![dependencies](https://img.shields.io/david/lgaticaq/semantic-release-rancher.svg)](https://david-dm.org/lgaticaq/semantic-release-rancher)
[![devDependency Status](https://img.shields.io/david/dev/lgaticaq/semantic-release-rancher.svg)](https://david-dm.org/lgaticaq/semantic-release-rancher#info=devDependencies)
[![Maintainability](https://api.codeclimate.com/v1/badges/18dc7fc52da810de5a8d/maintainability)](https://codeclimate.com/github/lgaticaq/semantic-release-rancher/maintainability)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> Set of [semantic-release](https://github.com/semantic-release/semantic-release) plugins for upgrade service in [Rancher](https://rancher.com/docs/rancher/v1.6/en/cattle/upgrading/).

```json
{
  "release": {
    "verifyConditions": "semantic-release-rancher",
    "publish": "semantic-release-rancher"
  }
}
```

## Plugins

### `verifyConditions`

Verify that all needed configuration is present.

### `publish`

Upgrade new version in Rancher.

## Example .gitlab-ci.yml

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

## License

[MIT](https://tldrlegal.com/license/mit-license)
