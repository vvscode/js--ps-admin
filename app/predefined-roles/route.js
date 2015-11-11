export default Ember.Route.extend({
  model: function() {
    return this.API.getTemplates();
  }
});
