import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('general-permissions',  { path: 'general-permissions' }, function() {
    this.resource('general-permissions.edit', {path: '/:permission_id'})
  });
  this.resource('predefined-roles',  { path: 'predefined-roles' }, function() {
  });
  this.resource('static-permissions',  { path: 'static-permissions/:type_name' }, function() {
  });
});

export default Router;
