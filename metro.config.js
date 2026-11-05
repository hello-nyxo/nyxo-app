const path = require('node:path');
const { getDefaultConfig } = require('expo/metro-config');
const { withNativewind } = require('nativewind/metro');

// Inlined variables break platformColor() in src/global.css.
const config = withNativewind(getDefaultConfig(__dirname), { inlineVariables: false });

// The className polyfill swaps `react-native` for a shim that lacks newer exports
// (AssetRegistry, used by expo-asset). Only app code uses className, so libraries keep the real one.
const resolveWithCss = config.resolver.resolveRequest;
const libraries = `${path.sep}node_modules${path.sep}`;
config.resolver.resolveRequest = (context, moduleName, platform) =>
  moduleName === 'react-native' && context.originModulePath.includes(libraries)
    ? context.resolveRequest(context, moduleName, platform)
    : resolveWithCss(context, moduleName, platform);

module.exports = config;
