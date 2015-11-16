//import config from './../config/environment';
const CACHE = {};
const $ = Ember.$;
const BASE_URL = '';

var defer = function(data) {
  var defer = $.Deferred();
  defer.resolve(data);
  return defer.promise();
};

var post = function(url, data = '', method = 'POST') {
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

var put = function(url, data) {
  return post(url, data, 'PUT');
};

var get = function(url) {
  return $.get(url);
};


export default {
  getGroups() {
    return get(`${BASE_URL}/groups/`);
  },

  getGroup(id) {
    return get(`${BASE_URL}/groups/${id}/`);
  },

  createGroup(data) {
    return post(`${BASE_URL}/groups/`, data).then(function(resp) {
      data.id = resp.id;
      return defer(data);
    });
  },

  deleteGroup(id) {
    return post(`${BASE_URL}/groups/${id}/delete/`);
  },

  updateGroup(id, data) {
    return put(`${BASE_URL}/groups/${id}/`, data);
  },

  getResources() {
    CACHE.resources = CACHE.resources || get(`${BASE_URL}/resources/`).then((resources) => {
        return resources.sort();
      });
    return CACHE.resources;
  },

  getDefaultResource() {
    return this.getResources().then((resources)=> {
      return resources[0];
    });
  },

  getResourceFields(resourceName) {
    if (!resourceName) {
      return defer([]);
    }
    return get(`${BASE_URL}/resource_fields/${resourceName}/`);
  },

  getRoutesList(from, to, depth) {
    return get(`${BASE_URL}/make_routes/${from}/${to}/${depth}/`);
  },

  getFlagPermissions() {
    return get(`${BASE_URL}/flag_permissions/`).then((permissions) => {
      if (permissions.length === 0) {
        permissions = permissions.concat([
          { "flag": "is_all_data", "resources": [], "routes": [] },
          { "flag": "is_admin", "resources": [], "routes": [] },
          { "flag": "is_sharing", "resources": [], "routes": [] },
          { "flag": "default", "resources": [], "routes": [] }
        ]);
      }
      return permissions;
    });
  },

  updateFlagPermissions(data) {
    return post(`${BASE_URL}/flag_permissions/`, data);
  },

  createPermission(data) {
    return post(`${BASE_URL}/permissions/`, data).then((resp) => {
      data.id = resp.id;
      return data;
    });
  },

  getPermission(id) {
    return get(`${BASE_URL}/permissions/${id}/`);
  },

  updatePermission(id, data) {
    return put(`${BASE_URL}/permissions/${id}/`, data);
  },

  deletePermission(id) {
    return post(`${BASE_URL}/permissions/${id}/delete/`);
  },

  getTemplates() {
    return get(`${BASE_URL}/templates/`);
  },

  createTemplate(data){
    return post(`${BASE_URL}/templates/`, data).then((resp) => {
      return this.getTemplate(resp.id);
    });
  },

  getTemplate(id){
    return get(`${BASE_URL}/templates/${id}/`);
  },

  updateTemplate(id, data) {
    return put(`${BASE_URL}/templates/${id}/`, data);
  },

  deleteTemplate(id) {
    return post(`${BASE_URL}/templates/${id}/delete/`);
  }
};
