var get = Ember.get;

export default Ember.Controller.extend({

  getPermissionsList: function() {
    return [];
  },

  actions: {
    addRoleTemplate: function(){
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
    }
  }
});
