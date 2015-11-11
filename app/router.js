import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.resource('general-permissions', {path: 'general-permissions'}, function () {
    this.route('index', {path: '/'});
    this.resource('general-permissions.edit', {path: ':general_permission_id'}, function () {
      this.route('group-resources', {path: '/group-resources'});
      this.route('group-routes', {path: '/group-routes'});

      this.resource('general-permissions.edit.permission', {path: 'permission/:permission_id'}, function () {
        this.route('ui-checkboxes', {path: '/ui-checkboxes'});
        this.route('resources', {path: '/resources'});
        this.route('routes', {path: '/routes'});
      });
    });
  });
  this.resource('predefined-roles', {path: 'predefined-roles'}, function () {
    this.resource('predefined-roles.edit', {path: ':template_key'}, function() {

    });
  });
  this.resource('flag-permissions', {path: 'flag-permissions/:type_name'}, function () {
    this.route('resources', {path: '/resources'});
    this.route('routes', {path: '/routes'});
  });
});

export default Router;
