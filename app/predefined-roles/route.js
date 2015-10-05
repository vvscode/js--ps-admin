var get = Ember.get, set = Ember.set;

export default Ember.Route.extend({
  model: function () {
    var settings = get(this, 'container').lookup('settings:main');
    var templates = get(settings, 'templates') || [];
    set(settings, 'templates', templates);
    return templates;
  }
});
