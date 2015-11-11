var setProperties = Ember.setProperties, set = Ember.set;

export default Ember.Controller.extend({
  isGeneralPermissionActive: false,
  isDefaultStaticPermissionActive: false,
  isAllDataStaticPermissionActive: false,
  isAdminStaticPermissionActive: false,
  isVirtualGalleriesStaticPermissionActive: false,
  isPredefinedRolesActive: false,

  isStaticPermissionActive: false,
  activeStaticPermissionName: '',

  resetActivePage: function() {
    setProperties(this, {
      isGeneralPermissionActive: false,
      isDefaultStaticPermissionActive: false,
      isAllDataStaticPermissionActive: false,
      isAdminStaticPermissionActive: false,
      isVirtualGalleriesStaticPermissionActive: false,
      isPredefinedRolesActive: false,

      isStaticPermissionActive: false,
      activeStaticPermissionName: '',
    });
  },

  actions: {
    openGeneralPermissions: function() {
      this.resetActivePage();
      set(this, 'isGeneralPermissionActive', true);
    },

    openStaticPermission: function(name) {
      this.resetActivePage();
      var normilizedName = ("" + name).camelize().capitalize();
      set(this, `is${normilizedName}StaticPermissionActive`, true);
      setProperties(this, {
        isStaticPermissionActive: true,
        activeStaticPermissionName: name
      });
    },

    openPredefinedRoles: function() {
      this.resetActivePage();
      set(this, 'isPredefinedRolesActive', true);
    }

  }
});
