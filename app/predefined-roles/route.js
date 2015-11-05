var get = Ember.get, set = Ember.set;

export default Ember.Route.extend({
  model: function () {
    return this.API.getTemplates();
  }
});
