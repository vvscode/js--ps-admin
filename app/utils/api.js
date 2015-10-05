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
      var loadedData = {};
      return $.get(url)
        .then(function(data) {
          loadedData.generalPermissions= data;
          return $.get('/default_permissions/');
        })
        .then(function(data) {
          loadedData.default_permission = data;
          return $.get('/flags_permissions/');
        })
        .then(function(data){
          loadedData.flags = data.flags || [];

          console.log(loadedData);
          return loadedData;
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
      // save general permisssions
      var dataToSave = { groups: data.generalPermissions };
      var url = '/general_permissions/';
      return $.ajax(url, {
        data: JSON.stringify(dataToSave),
        contentType: 'application/json',
        type: 'POST'
      })
      // save default permissions
      .then(function() {
        var dataToSave = data.default_permission;
        var url = '/default_permissions/'
        return $.ajax(url, {
          data: JSON.stringify(dataToSave),
          contentType: 'application/json',
          type: 'POST'
        });
      })
      // save flag settings
      .then(function() {
        var dataToSave = { flags: data.flags };
        var url = '/flags_permissions/';
        return $.ajax(url, {
          data: JSON.stringify(dataToSave),
          contentType: 'application/json',
          type: 'POST'
        });
      });
    }
  }
};
