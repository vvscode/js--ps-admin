//import config from './../config/environment';
let cache = {};
const $ = Ember.$;
const USE_MOCKS = false;
const storageKey = 'storageKey_for_old_api_mocks';

const BASE_URL = '';
//const BASE_URL = 'http://10.0.0.41:5550';

var defer = function(data) {
  var defer = $.Deferred();
  defer.resolve(data);
  return defer.promise();
};

var post = function (url, data = '', method = 'POST') {
  return $.ajax({
    url: url,
    data: typeof data === 'string' ? data : JSON.stringify(data),
    contentType: 'application/json',
    type: method,
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true
  });
};

var put = function (url, data) {
  return post(url, data, 'PUT');
};

var del = function (url) {
  return post(url, {}, 'DELETE');
};

var get = function (url) {
  return $.get(url);
};

export default {
  getGroups() {
    return get(BASE_URL + '/groups/');
  },

  getGroup(id) {
    return get(BASE_URL + `/groups/${id}/`);
  },

  createGroup(data) {
    return post(BASE_URL + '/groups/', data).then(function(resp) {
      data.id = resp.id;
      return data;
    });
  },

  deleteGroup(id) {
    return post(BASE_URL + `/groups/${id}//delete/`);
  },

  updateGroup(id, data) {
    return put(BASE_URL + `/groups/${id}/`, data);
  },

  getResources() {
    return get(BASE_URL + '/resources/');
  },

  getResourceFields(resourceName) {
    if(!resourceName) { return defer([]); }
    return get(BASE_URL + `/resource_fields/${resourceName}/`);
  },

  getRoutesList(from, to, depth) {
    return get(BASE_URL + `/make_routes/${from}//${to}//${depth}/`);
  },

  getFlagPermissions() {
    return get(BASE_URL + '/flag_permissions/');
  },

  createFlagPermission(data){
    return post(BASE_URL + '/flag_permissions/', data);
  },

  getPermissions() {
    alert('Check it');
  },

  createPermission(data) {
    return post(BASE_URL + '/permissions/', data);
  },

  getPermission(id) {
    return get(BASE_URL + `/permissions/${id}/`);
  },

  updatePermission(id, data) {
    return put(BASE_URL + `/permissions/${id}/`, data);
  },

  deletePermission(id) {
    return del(BASE_URL + `/permissions/${id}/`);
  },

  getTemplates() {
    return get(BASE_URL + '/templates/');
  },

  createTemplate(data){
    return post(BASE_URL + '/templates/', data);
  },

  getTemplate(id){
    return get(BASE_URL + `/templates/${id}`);
  },

  updateTemplate(id, data) {
    return put(BASE_URL + `/templates/${id}`, data);
  },

  deleteTemplate(id) {
    return del(BASE_URL + `/templates/${id}`);
  },

  // next one doesn't support more. It leaved only to simplify migration
  // TODO: remove after refactoring
  OLD_API: {
    getPermissions: function () {
      return this.getGeneralPermissions().then((data) => {
        var retData = [];
        (data.groups || []).forEach((group) => {
          (group.permissions || []).forEach((permission) => {
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
    getResources: function () {
      var url = USE_MOCKS ? '/api_mocks/resources.json' : '/resources/';
      return cache['getResources'] || ( cache['getResources'] = $.get(url) );
    },
    getRoutesList: function (from, to, depth) {
      var url = USE_MOCKS ? '/api_mocks/make_routes.json' : `/make_routes/?from=${from}&to=${to}&depth=${depth}`;
      return $.get(url);
    },
    getResourceFields: function (resourceName) {
      var cacheName = 'getResourceFieldsList_' + resourceName;
      var url = USE_MOCKS ? '/api_mocks/fields_for_group.json' : '/resource_fields/?resource=' + resourceName;
      return cache[cacheName] || ( cache[cacheName] = $.get(url) );
    },
    getGeneralPermissions: function () {
      var url = USE_MOCKS ? '/api_mocks/general_permissions.json' : '/general_permissions/';
      var cacheName = 'general_permissions';
      return cache[cacheName] || ( cache[cacheName] = $.get(url) );
    },
    loadData: function () {
      if(USE_MOCKS) {
        var savedData = localStorage.getItem(storageKey);
        var data;
        try {
          data = JSON.parse(savedData);
        } catch (e) {
        }
        var dfd = $.Deferred();
        setTimeout(() => {
          dfd.resolve(data || {});
        }, 1000);
        return dfd.promise();
      } else {
        var loadedData = {};
        return this.getGeneralPermissions()
          .then(function (data) {
            loadedData.generalPermissions = data;
            return $.get(BASE_URL + '/default_permissions/');
          })
          .then(function (data) {
            loadedData.default_permission = data;
            return $.get(BASE_URL + '/flags_permissions/');
          })
          .then(function (data) {
            loadedData.flags = data.flags;
            return $.get(BASE_URL + '/role_templates/');
          })
          .then(function (data) {
            loadedData.templates = data.templates || [];
            var dfd = $.Deferred();
            dfd.resolve(loadedData);
            return dfd.promise();
          });
      }
    },
    saveData: function (data) {
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
          .then(function () {
            var dataToSave = data.flags;
            var url = '/flags_permissions/';
            return $.ajax(url, {
              data: JSON.stringify(dataToSave),
              contentType: 'application/json',
              type: 'POST'
            });
          })
          .then(function () {
            var dataToSave = {templates: data.templates || []};
            var url = '/role_templates/';
            return $.ajax(url, {
              data: JSON.stringify(dataToSave),
              contentType: 'application/json',
              type: 'POST'
            });
          })
          .then(function () {
            var dataToSave = data.generalPermissions;
            var url = '/general_permissions/';
            return $.ajax(url, {
              data: JSON.stringify({groups: dataToSave}),
              contentType: 'application/json',
              type: 'POST'
            });
          })
          .then(function () {
            var dfd = $.Deferred();
            cache = {};
            return dfd.promise();
          });
      }
    }
  }
};
