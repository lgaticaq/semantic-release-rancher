import { Context as SemanticReleaseContext } from 'semantic-release'
import { Config as SemanticReleaseConfig } from 'semantic-release'

export interface PluginEnvironment {
  readonly RANCHER_ACCESS_KEY?: string
  readonly RANCHER_SECRET_KEY?: string
  readonly RANCHER_URL?: string
  readonly RANCHER_ENVIRONMENT?: string
}

export interface OriginalEnvironment {
  readonly [key: string]: string
}

export interface Environment extends OriginalEnvironment, PluginEnvironment {}

export interface Context extends SemanticReleaseContext {
  readonly commits?: ReadonlyArray<SemanticRelease>
  message?: string
  error?: Error
  env: Environment
}

export interface Service {
  readonly stack: string
  readonly service: string
  readonly startFirst?: boolean = true
}

export interface Config extends SemanticReleaseConfig {
  readonly rancherUrl?: string
  readonly rancherEnvironment?: string
  readonly services?: ReadonlyArray<Service>
}

export interface SemanticReleaseError {
  message: string
  details: string
}
