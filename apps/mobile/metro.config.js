/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('expo/metro-config').MetroConfig} */
const { getDefaultConfig } = require("expo/metro-config")

const path = require("path")
const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, "../..")

const config = getDefaultConfig(__dirname)

config.watchFolders = [workspaceRoot]
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
]

config.resolver.unstable_enablePackageExports = true
config.resolver.unstable_conditionNames = ["browser", "require", "react-native"]

module.exports = config
