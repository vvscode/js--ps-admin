import EmberUploader from 'ember-uploader';
const { get, set } = Ember;

export default Ember.Controller.extend({
  file: null,

  actions: {
    uploadFile() {
      const url = '/dumps/';
      const uploader = EmberUploader.Uploader.create({ url });
      const file = get(this, 'file');
      if (file) {
        return uploader.upload(file).then((response) => {
          set(this, 'file', null);
        });
      }
    }
  }
});
