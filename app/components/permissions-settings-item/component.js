import Ember from 'ember';

const { get, set, computed } = Ember;

export default Ember.Component.extend({
  permission: null,
  action: null,

  checked: computed('permission', 'action', {
    get() {
      return get(get(this, 'permission'), get(this, 'action'));
    },
    set(key, value){
      set(get(this, 'permission'), get(this, 'action'), value);
      return value;
    }
  }),

  forcedFalse: computed('permission', 'action', function() {
    const fieldName = `${get(this, 'action')}_forced`;
    return get(get(this, 'permission'), fieldName) === -1;
  }),

  forcedTrue: computed('permission', 'action', function() {
    const fieldName = `${get(this, 'action')}_forced`;
    return get(get(this, 'permission'), fieldName) === 1;
  })
});
