const { setProperties } = Ember;
export default Ember.Route.extend({
  model: function(params) {
    const id = +params.general_permission_id;
    const group = this.modelFor('general-permissions').findBy('id', id);
    return this.API.getGroup(id).then((data) => {
      setProperties(group, data);
      return group;
    });
  }
});
