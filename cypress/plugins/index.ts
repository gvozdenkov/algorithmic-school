export default (_, config: Cypress.PluginConfigOptions) => {
  return {
    ...config,
    baseUrl: process.env.CYPRESS_BASE_URL || config.baseUrl,
  };
};
