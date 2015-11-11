var get = Ember.get;

export default Ember.Controller.extend({
  observeChanges: function() {
    Ember.run.debounce(this, this.saveModel, 500);
  }.observes(
    'model.field',
    'model.key',
    'model.for_custom_field',
    'model.for_sharing',
    'model.routes.length',
    'model.create',
    'model.read',
    'model.update',
    'model.delete'
  ),

  saveModel() {
    const model = get(this, 'model');
    this.API.updatePermission(get(this, 'model.id'), {
      group_id: get(model, 'group_id'),
      key: get(model, 'key'),
      field: get(model, 'field'),
      for_custom_field: get(model, 'for_custom_field'),
      for_sharing: get(model, 'for_sharing'),
      resources: get(model, 'resources'),
      routes: get(model, 'routes'),
      read: get(model, 'read'),
      create: get(model, 'create'),
      update: get(model, 'update'),
      delete: get(model, 'delete'),
    });
  }
});
