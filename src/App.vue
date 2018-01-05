<template>
	<div id="app">
    <h1>Hello Vue</h1>
	<error-reproduction></error-reproduction>
	</div>
</template>

<script lang='ts'>
import Vue, { VueConstructor } from 'vue'
import ErrorReproduction from './ErrorReproduction.vue'

export default Vue.extend({
  name: 'app',
  components: {
	  ErrorReproduction
  }

})
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>