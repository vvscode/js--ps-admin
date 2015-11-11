export default Ember.Route.extend({
  model () {
    return this.modelFor('flag-permissions').resources;
  }
});
