import config from './../config/environment';

var USE_MOCKS = !! config.ENV.APP.USE_MOCKS;
var cache = {};

export default {
  getResourcesList: function () {
    var url = USE_MOCKS? '/api_mocks/resources.json' : '/resources';
    return cache['getResourcesList'] || ( cache['getResourcesList'] = Ember.$.get(url) );
  },
  getRoutesList: function (from, to, depth) {
    var url = USE_MOCKS? '/api_mocks/make_routes.json': `/make_routes/?from=${from}&to=${to}&depth=${depth}`;
    return Ember.$.get(url);
  },
  getResourceFieldsList: function (resourceName) {
    var cacheName = 'getResourceFieldsList_' + resourceName;
    var url = USE_MOCKS? '/api_mocks/fields_for_group.json' : '/resources/fields';
    return cache[cacheName] || ( cache[cacheName] = Ember.$.get(url) );
  }
};
