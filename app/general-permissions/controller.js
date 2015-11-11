const { get } = Ember;

export default Ember.Controller.extend({
  actions: {
    addGeneralPermission: function () {
      var modelData = {
        title: `Permission ${Date.now()}`,
        resources: [],
        routes: []
      };
      return this.API.createGroup(modelData).then((group) => {
        get(this, 'model').addObject(group);
      });
    },

    removeGroup(model) {
      return this.API.deleteGroup(model.id).then(() => {
        get(this, 'model').removeObject(model);
        this.transitionTo('general-permissions');
      });
    }
  }
});
