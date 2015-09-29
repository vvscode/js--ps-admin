import Ember from 'ember';

var setProperties = Ember.setProperties, set = Ember.set, get = Ember.get;

export default Ember.Controller.extend({
  isGeneralPermissionActive: false,
  isDefaultStaticPermissionActive: false,
  isAllDataStaticPermissionActive: false,
  isAdminStaticPermissionActive: false,
  isVirtualGalleriesStaticPermissionActive: false,
  isPredefinedRolesActive: false,

  resetActivePage: function() {
    setProperties(this, {
      isGeneralPermissionActive: false,
      isDefaultStaticPermissionActive: false,
      isAllDataStaticPermissionActive: false,
      isAdminStaticPermissionActive: false,
      isVirtualGalleriesStaticPermissionActive: false,
      isPredefinedRolesActive: false
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
    },

    openPredefinedRoles: function() {
      this.resetActivePage();
      set(this, 'isPredefinedRolesActive', true);
    }

  }
});
