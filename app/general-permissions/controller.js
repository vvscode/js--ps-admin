const { get } = Ember;

export default Ember.Controller.extend({
  actions: {
    addGeneralPermission: function () {
      var modelData = {
        title: 'New General Permission' +  Date.now(),
        resources: [],
        routes: []
      };
      return this.API.createGroup(modelData).then((group) => {
        get(this, 'model').addObject(group);
      })
    },

    removeGroup(model) {
      return this.API.deleteGroup(model.id).then(() => {
        return get(this, 'model').removeObject(model)
      });
    }
  }
});
