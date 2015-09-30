var storageKey = 'settingsMain';

export default {
  name: 'load-data',
  initialize:function(container/* , application */) {
    var savedData = localStorage.getItem(storageKey);
    var data = {};
    try {
      data = JSON.parse(savedData);
    } catch(e) {}

    container.register('settings:main', data, {instantiate: false, singleton: true});

    var resources = {};
    container.register('resources:main', resources, {instantiate: false, singleton: true});
  }
};
