import API from './../utils/api';

export default Ember.Controller.extend({
  actions: {
    saveSettings: function () {
      API
        .saveData(this.container.lookup('settings:main'))
        .then(() => {
          alert('Data saved');
        });
    }
  }
});
