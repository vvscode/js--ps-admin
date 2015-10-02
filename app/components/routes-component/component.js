import API from '../../utils/api';
import Utils from '../../utils/utils';

var get = Ember.get, set = Ember.set;

export default Ember.Component.extend({
  routes: null,
  listOfAllLoadedRoutes: null,
  listOfAllResources: null,
  listedRoutes: null,

  oneToAdd: null,
  multipleAddFrom: null,
  multipleAddTo: null,
  addMultipleDepth: 1,

  addOneMode: null,
  addMultipleMode: null,

  onInit: function () {
    API.getResourcesList().then(resources => {
      set(this, 'listOfAllResources', resources.map(function (resourceName) {
        return {
          id: resourceName,
          label: Utils.humanize(resourceName).capitalize()
        };
      }));
    });

    var listOfAllLoadedRoutes = [];
    listOfAllLoadedRoutes.addObjects(get(this, 'routes'));
    set(this, 'listOfAllLoadedRoutes', listOfAllLoadedRoutes);
  }.on('init'),

  listedRoutesObserver: function () {
    var routes = get(this, 'routes');
    set(this, 'listedRoutes', (get(this, 'listOfAllLoadedRoutes') || []).map(function (item) {
      return {
        id: item,
        label: item,
        checked: routes.contains(item)
      };
    }));
  }.observes('listOfAllLoadedRoutes.length').on('init'),

  updateRoutes: function () {
    var routes = get(this, 'routes');
    var newRoutes = get(this, 'listedRoutes').filterBy('checked', true).mapBy('id');
    routes.clear().addObjects(newRoutes);
  },

  checkedRoutesObserver: function () {
    Ember.run.once(this, this.updateRoutes);
  }.observes('listedRoutes.@each.checked'),

  addRoute: function (name, checked) {
    get(this, 'routes').addObject(name);
    get(this, 'listedRoutes').addObject({
      id: name,
      label: name,
      checked: checked
    });
  },

  resetAddForms: function () {
    set(this, 'addOneMode', null);
    set(this, 'oneToAdd', null);
    set(this, 'addMultipleMode', null);
    set(this, 'multipleAddFrom', null);
    set(this, 'multipleAddTo', null);
    set(this, 'addMultipleDepth', 1);
  },

  actions: {
    addMultiple: function () {
      API
        .getRoutesList(get(this, 'multipleAddFrom'), get(this, 'multipleAddTo'), get(this, 'addMultipleDepth'))
        .then(routes => {
          this.resetAddForms();
          routes.forEach(routeName => {
            this.addRoute(routeName, false);
          });
        });
    },
    addOne: function () {
      var oneToAdd = get(this, 'oneToAdd');
      if(!oneToAdd) {
        return;
      }
      this.addRoute(oneToAdd, true);
      this.resetAddForms();
    },
    setMultipleAddMode: function () {
      set(this, 'addOneMode', false);
      set(this, 'addMultipleMode', true);
    },
    setOneAddMode: function () {
      set(this, 'addMultipleMode', false);
      set(this, 'addOneMode', true);
    }
  }
});
