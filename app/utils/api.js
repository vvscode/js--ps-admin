import config from './../config/environment';

var $ = Ember.$;
var USE_MOCKS = !! config.APP.USE_MOCKS;
var cache = {};
var storageKey = 'settingsMain';

export default {
  getPermissions: function() {
    return this.getGeneralPermissions().then((data) => {
      var retData = [];
      (data.groups || []).forEach( (group) => {
        (group.permissions || []).forEach( (permission) => {
          retData.addObject({
            field: permission.field,
            key: permission.key,
            id: permission.id || permission.key,
            group: group.name,
            create: permission.create,
            read: permission.read,
            update: permission.update,
            delete: permission.delete
          });
        });
      });
      var dfd = $.Deferred();
      dfd.resolve({groups: retData});
      return dfd.promise();
    });
  },
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
  getGeneralPermissions: function() {
    var url = USE_MOCKS ? '/api_mocks/general_permissions.json' : '/general_permissions/';
    var cacheName = 'general_permissions';
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
      var loadedData = {};
      return this.getGeneralPermissions()
        .then(function(data) {
          loadedData.generalPermissions= data;
          return $.get('/default_permissions/');
        })
        .then(function(data) {
          loadedData.default_permission = data;
          return $.get('/flags_permissions/');
        })
        .then(function(data) {
          loadedData.flags = data.flags;
          return $.get('/role_templates/');
        })
        .then(function(data){
          loadedData.templates = data.templates || [];
          var dfd = $.Deferred();
          dfd.resolve(loadedData);
          return dfd.promise();
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
      var dataToSave = data.default_permission;
      var url = '/default_permissions/';
      return $.ajax(url, {
          data: JSON.stringify(dataToSave),
          contentType: 'application/json',
          type: 'POST'
      })
      // save flag settings
      .then(function() {
        var dataToSave = data.flags;
        var url = '/flags_permissions/';
        return $.ajax(url, {
          data: JSON.stringify(dataToSave),
          contentType: 'application/json',
          type: 'POST'
        });
      })
      .then(function() {
        var dataToSave = { templates: data.templates || []};
        var url = '/role_templates/';
        return $.ajax(url, {
          data: JSON.stringify(dataToSave),
          contentType: 'application/json',
          type: 'POST'
        });
      })
      .then(function() {
        var dataToSave = data.generalPermissions;
        var url = '/general_permissions/';
        return $.ajax(url, {
          data: JSON.stringify({ groups: dataToSave}),
          contentType: 'application/json',
          type: 'POST'
        });
      })
      .then(function() {
          var dfd = $.Deferred();
          cache = {};
          return dfd.promise();
      });
    }
  }
};
