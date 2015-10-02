var cache = {};

export default {
  getResourcesList: function () {
    return cache['getResourcesList'] || ( cache['getResourcesList'] = Ember.$.get('/api_mocks/resources.json') );
  },
  getRoutesList: function (from, to, depth) {
    var url = `/make_routes/?from=${from}&to=${to}&depth=${depth}`;
    url = '/api_mocks/make_routes.json';
    return Ember.$.get(url);
  },
  getResourceFieldsList: function (resourceName) {
    var cacheName = 'getResourceFieldsList_' + resourceName;
    return cache[cacheName] || ( cache[cacheName] = Ember.$.get('/api_mocks/fields_for_group.json') );
  }
};
