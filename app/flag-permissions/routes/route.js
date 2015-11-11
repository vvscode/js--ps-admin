export default Ember.Route.extend({
  model: function() {
    return this.modelFor('flag-permissions').routes;
  }
});
