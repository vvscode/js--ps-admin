var get = Ember.get;

export default Ember.Controller.extend({
  observeChanges: function() {
    Ember.run.debounce(this, this.saveModel, 500);
  }.observes(
    'model.title',
    'model.is_admin',
    'model.is_all_data',
    'model.use_as_predefined',
    'model.is_sharing',
    'model.is_factsheet_reports',
    'model.use_as_subscription',
    'model.permissions.@each.create',
    'model.permissions.@each.read',
    'model.permissions.@each.update',
    'model.permissions.@each.delete'
  ),

  saveModel: function() {
    const model = get(this, 'model');
    this.API.updateTemplate(get(model, 'id'), model);
  }
});
