import { configure } from '@storybook/vue';

import Vue from 'vue';
// import Vuex from 'vuex'; // Vue plugins

// Import your custom components.
// import Mybutton from '../src/stories/Button.vue';

// Install Vue plugins.
// Vue.use(Vuex);

// Register custom components.
// Vue.component('hello', {
//   template: '<h1>Hello Vue Storybook!</h1>',
// });

function loadStories() {
  // You can require as many stories as you need.
  require('./stories');
}

configure(loadStories, module);
