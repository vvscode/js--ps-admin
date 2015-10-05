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
            _create: permission.create,
            create: false,
            _read: permission.read,
            read: false,
            _update: permission.update,
            update: false,
            _delete: permission.delete,
            delete: false
          });
        });
        model.addObject(roleTemplate);
      });
    }
  }
});
