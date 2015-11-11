import Ember from 'ember';

export default Ember.Component.extend({
  resourceList: null,
  classNames: ['list-of-resources'],

  actions: {
    goToResource(resourceName) {
      const $resElement = Ember.$(`#resource-${resourceName}`);
      Ember.$(window).scrollTop($resElement.position().top);
    }
  }
});
