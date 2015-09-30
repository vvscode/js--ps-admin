import Ember from 'ember';

var get = Ember.get;

export default Ember.Controller.extend({
  uiSelectOptions: [
    {label: 'Forced ON', id: 'forced_true'},
    {label: 'Forced OFF', id: 'forced_false'},
    {label: 'Defined by user', id: ''},
  ]
});
