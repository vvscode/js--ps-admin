var get = Ember.get;

export default Ember.Controller.extend({
  groupController: Ember.inject.controller('general-permissions/edit'),

  onModelSizeChange: function() {
    get(this, 'groupController').saveGroup()
  }.observes('model.length')
});
