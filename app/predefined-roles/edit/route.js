export default Ember.Route.extend({
  model: function (params) {
    return this.modelFor('predefined-roles').findBy('key', params.template_key);
  }
});
