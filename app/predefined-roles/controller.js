const { get } = Ember;

export default Ember.Controller.extend({
  actions: {
    addRoleTemplate(){
      var model = get(this, 'model');
      var roleTemplate = {
        title: `Template_name${Date.now()}`,
        permissions: [],
        is_admin : false,
        is_all_data: false,
        is_sharing: false,
        is_factsheet_reports: false,
        use_as_predefined: false,
        use_as_subscription: false
      };
      this.API.createTemplate(roleTemplate).then((data) => {
        model.addObject(data);
      });
    },

    remove(role) {
      this.API.deleteTemplate(get(role, 'id')).always(() => {
        get(this, 'model').removeObject(role);
        this.transitionTo('predefined-roles');
      });
    }
  }
});
