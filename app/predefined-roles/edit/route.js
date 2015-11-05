export default Ember.Route.extend({
  model: function (params) {
    return this.API.getTemplate(params.template_key);
  }
});
