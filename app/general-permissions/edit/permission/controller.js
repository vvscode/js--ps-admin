import API from 'ps-admin/utils/api';
var get = Ember.get;

export default Ember.Controller.extend({
  observeChanges: function() {
    Ember.run.debounce(this, this.saveModel, 500);
  }.observes('model.field', 'model.key', 'model.is_custom_field', 'model.for_sharing'),

  saveModel: function() {
    API.savePermission(get(this, 'model'));
  }
});
