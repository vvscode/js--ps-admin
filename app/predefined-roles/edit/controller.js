import API from 'ps-admin/utils/api';
var get = Ember.get;

export default Ember.Controller.extend({
  observeChanges: function() {
    Ember.run.debounce(this, this.saveModel, 500);
  }.observes(
    'model.name',
    'model.is_admin',
    'model.is_all_data',
    'model.is_predefined',
    'model.is_sharing'
  ),

  saveModel: function() {
    API.saveRole(get(this, 'model'));
  }
});
