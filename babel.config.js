module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            '@md': './src',
            '@screens': './src/screens',
            '@components': './src/components',
          },
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.ios.js',
            '.android.js',
            '.json',
            '.png',
            '.jpg',
            '.webp',
            '.gif',
            '.svg',
            '.ttf',
            '.mp3',
            '.mp4',
          ],
        },
      ],
    ],
  };
};
