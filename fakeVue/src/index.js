import Vue from './vue';

const v = new Vue({
  data: {
    a: 1,
    b: {
      c: 3
    }
  }
});

v.$watch('a', () => {
  console.log('haha! change');
  console.log(v);
});

setTimeout(() => {
  v.a = 4;
}, 2000);

