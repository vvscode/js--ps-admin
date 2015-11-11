const { get } = Ember;

export default Ember.Controller.extend({
  flagController: Ember.inject.controller('flag-permissions'),

  onModelSizeChange: function() {
    get(this, 'flagController').saveFlagPermissions();
  }.observes('model.@each.name', 'model.@each.read.length', 'model.@each.update.length'),

  actions: {
    addResource: function() {
      this.API.getDefaultResource()
        .then((defaultPersmission) => {
          get(this, 'model').addObject({
            name: defaultPersmission,
            read: [],
            update: []
          });
        });
    }
  }
});
