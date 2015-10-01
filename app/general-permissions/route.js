

var get = Ember.get;

export default Ember.Route.extend({
  model: function() {
    var settings = get(this, 'container').lookup('settings:main');
    return get(settings, 'generalPermissions');
  }
});
