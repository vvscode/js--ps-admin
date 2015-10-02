import API from '../utils/api';

export default {
  name: 'load-data',
  initialize: function (container, application) {
    application.deferReadiness();
    API.loadData().then((data) => {
      container.register('settings:main', data || {}, {instantiate: false, singleton: true});
      application.advanceReadiness();
    });
  }
};
