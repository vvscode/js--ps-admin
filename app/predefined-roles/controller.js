import API from '../utils/api';
var get = Ember.get;

export default Ember.Controller.extend({

  getPermissionsList: function() {
    return [];
  },

  actions: {
    addRoleTemplate: function(){
      var model = get(this, 'model');
      var roleTemplate = {
        name: 'New RoleName',
        key: "" + Date.now(),
        is_admin: false,
        is_all_data: false,
        is_sharing: false,
        is_predefined: true,
        permissions: []
      };
      API.getPermissions().then((data) => {
        var permissions = roleTemplate.permissions;
        (data || []).forEach((permission) => {
          permissions.addObject({
            field: permission.field,
            key: permission.key,
            group: permission.group,
            create_forced: permission.create,
            create: false,
            read_forced: permission.read,
            read: false,
            update_forced: permission.update,
            update: false,
            delete_forced: permission.delete,
            delete: false
          });
        });
        model.addObject(roleTemplate);
      });
    }
  }
});
