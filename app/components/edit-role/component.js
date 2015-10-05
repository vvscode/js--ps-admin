var get = Ember.get;

export default Ember.Component.extend({
  permissionsList: null,
  role: null,

  groups: function() {
    var rolePermissions = get(this, 'role.permissions') || [];
    var groupNames = rolePermissions.mapBy('group').uniq();
    return groupNames.map( (groupName) => {
      return {
        name: groupName,
        permissions: rolePermissions.filterBy('group', groupName)
      };
    });
  }.property('role', 'role.permissions')
});
