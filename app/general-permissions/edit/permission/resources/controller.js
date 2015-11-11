var get = Ember.get;

export default Ember.Controller.extend({

  onModelChange: function() {
      this.send('savePermission');
  }.observes('model.length', 'model.@each.name', 'model.@each.read.length', 'model.@each.update.length'),

  actions: {
    addResource () {
      this.API.getDefaultResource().then((name) => {
        get(this, 'model').addObject({
          name: name,
          read: [],
          update: []
        });
      });
    }
  }
});
