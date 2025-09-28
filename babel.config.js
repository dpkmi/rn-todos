// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@": "./src",
            "@features": "./src/features",
            "@ui": "./src/ui",
            "@lib": "./src/lib",
            "@services": "./src/services",
            "@hooks": "./src/hooks",
            "@config": "./src/config",
            "@types": "./src/types",
            "@assets": "./assets",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
