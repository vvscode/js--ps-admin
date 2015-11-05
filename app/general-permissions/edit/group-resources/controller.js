var get = Ember.get;

export default Ember.Controller.extend({
  groupController: Ember.inject.controller('general-permissions/edit'),

  onModelSizeChange: function() {
    get(this, 'groupController').saveGroup();
  }.observes('model.@each.name', 'model.@each.read.length', 'model.@each.update.length'),

  actions: {
    addResource: function () {
      get(this, 'model').addObject({
        name: 'collectable',
        read: [],
        update: []
      });
    }
  }
});
