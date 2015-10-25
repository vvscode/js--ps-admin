import Utils from '../../utils/utils';
import API from '../../utils/api';

var get = Ember.get, set = Ember.set;

export default Ember.Component.extend({
  resource: null,
  resourceList: null,
  listOfAllResources: null,
  readFields: null,
  updateFields: null,

  checkResourceOnInit: function () { // todo: remove/discuss after finalize developing
    if(!get(this, 'resource.read')) {
      set(this, 'resource.read', []);
    }
    if(!get(this, 'resource.update')) {
      set(this, 'resource.update', []);
    }
  }.on('init'),

  onInit: function () {
    API.getResources().then(resources => {
      set(this, 'listOfAllResources', resources.map(function (resourceName) {
        return {
          id: resourceName,
          label: Utils.humanize(resourceName).capitalize()
        };
      }));
    });
  }.on('init'),

  onResourceNameChange: function () {
    API.getResourceFields(get(this, 'resource.name')).then(fieldsNames => {
      var readFields = [];
      var updateFields = [];

      var resourceRead = get(this, 'resource.read');
      var resourceUpdate = get(this, 'resource.update');
      fieldsNames.forEach(function (fieldName) {
        readFields.addObject({
          id: fieldName,
          label: Utils.humanize(fieldName),
          checked: resourceRead.contains(fieldName)
        });
        updateFields.addObject({
          id: fieldName,
          label: Utils.humanize(fieldName),
          checked: resourceUpdate.contains(fieldName)
        });
      });

      set(this, 'readFields', readFields);
      set(this, 'updateFields', updateFields);
    });
  }.observes('resource.name').on('init'),

  readObserver: function () {
    Ember.run.once(this, this.setResourceRead);
  }.observes('readFields.@each.checked'),

  updateObserver: function () {
    Ember.run.once(this, this.setResourceUpdate);
  }.observes('updateFields.@each.checked'),

  setResourceRead: function () {
    set(this, 'resource.read', get(this, 'readFields').filterBy('checked', true).mapBy('id'));
  },

  setResourceUpdate: function () {
    set(this, 'resource.update', get(this, 'updateFields').filterBy('checked', true).mapBy('id'));
  },

  actions: {
    removeResource: function () {
      get(this, 'resourceList').removeObject(get(this, 'resource'));
    }
  }
});
