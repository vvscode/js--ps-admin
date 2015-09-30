import Ember from 'ember';

var storageKey = 'settingsMain';

export default Ember.Controller.extend({
  actions: {
    saveSettings: function() {
      var settings = this.container.lookup('settings:main');
      var dataToSave = JSON.stringify(settings);
      localStorage.setItem(storageKey, dataToSave);
      alert('Data saved');
    }
  }
});
