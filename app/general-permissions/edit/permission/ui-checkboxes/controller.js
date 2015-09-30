import Ember from 'ember';

var get = Ember.get;

export default Ember.Controller.extend({
  uiSelectOptions: [
    {label: 'Forced ON', id: 1},
    {label: 'Forced OFF', id: -1},
    {label: 'Defined by user', id: 0},
  ]
});
