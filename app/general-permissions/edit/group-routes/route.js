var get = Ember.get, set = Ember.set;

export default Ember.Route.extend({
  group: null,

  beforeModel: function() {
    set(this, 'group', this.modelFor('general-permissions.edit'));
  },

  model: function() {
    return get(this, 'group.routes');
  },

  onModelSizeChange: function() {
    this.notifyPropertyChange('group.routes.length');
  }.observes('controller.model.length')

});
