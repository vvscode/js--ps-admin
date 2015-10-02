var get = Ember.get, set = Ember.set;

export default Ember.Route.extend({
  model: function () {
    var settings = get(this, 'container').lookup('settings:main');
    var generalPermissions = get(settings, 'generalPermissions') || [];
    set(settings, 'generalPermissions', generalPermissions);
    return generalPermissions;
  }
});
