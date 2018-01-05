<script lang="ts">
import Vue, { VueConstructor } from 'vue'

export default Vue.extend({
  data() {
    return {
      numVal: 1234,
      stringVal: 'foo'
    }
  },
  // If you add a return-type annotation of `number` to this method, everything resolves correctly
  // Also note that `this.stringVal` works just fine unless you try to return it from the method.
  computed: {
    doubleNumber() {
      let str = this.stringVal

      return this.numVal * 2
    },
    whisperedYell() {
      return this.yellString().toLowerCase()
    },
    simpleString() {
      return 'value'
    }
  },
  methods: {
    yellString() {
      return this.stringVal.toUpperCase()
    }
  }
})
</script>