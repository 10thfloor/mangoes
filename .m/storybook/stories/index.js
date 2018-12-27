import Vue from 'vue';

import { storiesOf } from '@storybook/vue';

Vue.component('hello', {
  template: '<h1>Hello Vue Storybook!</h1>',
});

storiesOf('Hello', module).add('story as a template', () => '<hello />');
