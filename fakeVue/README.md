# fakeVue

仿 Vue 式 MVVM 框架，我的实现

使用 Typescript

## 构造

- [X] Observer
- [X] Watcher
- [ ] Compile
- [ ] 更多 ......

## Demo

```html
<div id="app">
  <h2>{{ greeting }}</h2>
  <input type="text" v-model="greeting">
  <button v-on:click="reset">reset</button>
</div>
<script type="text/javascript" src="./fake-vue.js"></script>
<script>
  var v = new fakeVue({
    el: '#app',
    data: {
      greeting: 'Hello World!',
    },
    methods: {
      reset () {
        this.greeting = 'Hello World!';
      }
    }
  });
</script>
```
