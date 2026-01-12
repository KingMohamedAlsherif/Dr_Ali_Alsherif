const config = {
  extends: ['next/core-web-vitals']
};

try {
  require.resolve('eslint-config-next/typescript');
  config.extends.push('next/typescript');
} catch {
  // Optional in environments where eslint-config-next doesn't ship the typescript preset.
}

module.exports = config;
