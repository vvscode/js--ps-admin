import Ember from 'ember';

var get = Ember.get;

export default Ember.Controller.extend({
  resourcesList: [
    {label: 'label1', id:'id1'},
    {label: 'label2', id:'id2'},
    {label: 'label3', id:'id3'},
    {label: 'label4', id:'id4'}
  ],
  actions: {
    addResource: function() {
      get(this, 'model').addObject({});
    }
  }
});
