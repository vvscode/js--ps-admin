import Ember from 'ember';

const { get , set } = Ember;

export default Ember.View.extend({
  actions: {
    onFileSelect() {
      const controller = get(this, 'controller');
      const fileInput = this.$('input[type=file]')[0];
      set(controller, 'file', !!fileInput.value ? fileInput.files[0] : null);
    }
  }
});
