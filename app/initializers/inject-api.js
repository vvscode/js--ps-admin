import API from 'ps-admin/utils/api';

export function initialize(container/* , application */) {
  container.register('utils:api', API, { instantiate: false, singleton: true });
  container.injection('controller', 'API', 'utils:api');
  container.injection('route', 'API', 'utils:api');
}

export default {
  name: 'inject-api',
  initialize: initialize
};
