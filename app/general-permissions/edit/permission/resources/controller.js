var get = Ember.get;

export default Ember.Controller.extend({

  onModelChange: function() {
    if(get(this, 'model.length')) {
      this.send('savePermission');
    }
  }.observes('model.length', 'model.@each.name', 'model.@each.read.length', 'model.@each.update.length'),

  actions: {
    addResource: function () {
      get(this, 'model').addObject({
        name: '',
        read: [],
        update: []
      });
    }
  }
});
