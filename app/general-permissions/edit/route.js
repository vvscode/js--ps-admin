import Ember from 'ember';

var get = Ember.get;

export default Ember.Route.extend({
  model: function(params) {
    var settings = get(this, 'container').lookup('settings:main');
    var generalPermissions = get(settings, 'generalPermissions');
    return generalPermissions.findBy('id', params.permission_id);
  }
});
