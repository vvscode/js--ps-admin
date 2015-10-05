import config from './../config/environment';

var $ = Ember.$;
var USE_MOCKS = !! config.APP.USE_MOCKS;
var cache = {};
var storageKey = 'settingsMain';

export default {
  getResourcesList: function () {
    var url = USE_MOCKS? '/api_mocks/resources.json' : '/resources/';
    return cache['getResourcesList'] || ( cache['getResourcesList'] = $.get(url) );
  },
  getRoutesList: function (from, to, depth) {
    var url = USE_MOCKS? '/api_mocks/make_routes.json': `/make_routes/?from=${from}&to=${to}&depth=${depth}`;
    return $.get(url);
  },
  getResourceFieldsList: function (resourceName) {
    var cacheName = 'getResourceFieldsList_' + resourceName;
    var url = USE_MOCKS? '/api_mocks/fields_for_group.json' : '/resource_fields/?resource=' + resourceName;
    return cache[cacheName] || ( cache[cacheName] = $.get(url) );
  },
  loadData: function() {
    if(USE_MOCKS) {
      var savedData = localStorage.getItem(storageKey);
      var data;
      try { data = JSON.parse(savedData); } catch (e) {}
      var dfd = $.Deferred();
      setTimeout(() => {
        dfd.resolve(data || {});
      }, 1000);
      return dfd.promise();
    } else {
      var url = '/general_permissions/';
      return $.get(url).then(function(data) {
        return {
          generalPermissions: data
        };
      });
    }
  },
  saveData: function(data) {
    if(USE_MOCKS) {
      var dfd = $.Deferred();
      setTimeout(() => {
        var dataToSave = JSON.stringify(data);
        localStorage.setItem(storageKey, dataToSave);
        dfd.resolve();
      }, 1000);
      return dfd.promise();
    } else {
      var dataToSave = data.generalPermissions;
      return $.post('/general_persmissions/', dataToSave, 'json');
    }
  }
};
