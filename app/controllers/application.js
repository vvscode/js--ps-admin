export default Ember.Controller.extend({
  actions: {
    saveSettings: function () {
      alert('Check it');
      this.API
        .saveData(this.container.lookup('settings:main'))
        .then(() => {
          alert('Data saved');
        });
    }
  }
});
