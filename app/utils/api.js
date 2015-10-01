

var cache = {

};

export default {
  getResourcesList: function() {
    return cache['resourcesList'] ||  ( cache['resourcesList']=Ember.$.get('/api_mocks/resources.json') );
  },
  getRoutesList: function() {

  },
  getResourceFieldsList: function(resourceName) {
    return cache['resourcesList'] ||  ( cache['resourcesList']=Ember.$.get('/api_mocks/fields_for_group.json') );
  }
};
