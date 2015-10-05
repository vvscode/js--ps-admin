var get = Ember.get, set = Ember.set;

export default Ember.Route.extend({
  model: function(params) {
    var flagName = params.type_name;
    var settings = get(this, 'container').lookup('settings:main');

    if(flagName === 'default') {
      return get(settings, 'default_permission');
    } else {
      var flags = get(settings, 'flags') || [];
      set(settings, 'flags', flags);
      var flagSettings = flags.findBy('name', flagName);
      if(!flagSettings) {
        flagSettings = {
          name: flagName,
          routes: [],
          resources: []
        };
        flags.addObject(flagSettings);
      }
      return flagSettings;
    }
  }
});
