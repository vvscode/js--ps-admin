

var cache = {};

export default {
  getResourcesList: function() {
    return cache['getResourcesList'] ||  ( cache['getResourcesList']=Ember.$.get('/api_mocks/resources.json') );
  },
  getRoutesList: function(from, to, depth) {
    return $.post({
      from: from,
      to: to,
      depth: depth
    }, 'json');
  },
  getResourceFieldsList: function(resourceName) {
    var cacheName = 'getResourceFieldsList_' + resourceName;
    return cache[cacheName] ||  ( cache[cacheName]=Ember.$.get('/api_mocks/fields_for_group.json') );
  }
};
