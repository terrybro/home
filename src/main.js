import Vue from "vue";
import App from "./App";
import * as VueGoogleMaps from "vue2-google-maps";
import babelPolyfill from 'babel-polyfill';

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAFjVonFKvMz8H6kmzQmt-HOZmOPn-r88c",
    libraries: "places" //necessary for places input
  }
});
new Vue({
  el: '#app',
  render: h => h(App),

})
