import EmberUploader from 'ember-uploader';
const { get, set } = Ember;

export default Ember.Controller.extend({
  file: null,

  actions: {
    uploadFile() {
      const url = '/dumps/';
      const uploader = EmberUploader.Uploader.create({
        url,
        paramName: 'filename'
      });
      const file = get(this, 'file');
      if (file) {
        return uploader.upload(file).then(() => {
          set(this, 'file', null);
        });
      }
    }
  }
});
