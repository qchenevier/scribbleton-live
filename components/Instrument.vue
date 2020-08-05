<template lang="html">
  <div>
    <div class="level">
      <b-select v-model="input.name">
        <option v-for="n in names" :value="n">{{ n }} </option>
      </b-select>
      <b-tooltip
        label="Close"
        :delay="1000"
        type="is-link"
        position="is-bottom"
      >
        <b-button
          rounded
          icon-left="close"
          v-if="closeButton"
          @click="$emit('close', id)"
        />
      </b-tooltip>
    </div>
    <ParamsEditor
      :key="`instrument-editor-${id}`"
      v-model="input.params"
      :height="height"
      :defaultValue="defaultValue"
    />
  </div>
</template>

<script>
import ParamsEditor from '~/components/ParamsEditor.vue'

export default {
  components: { ParamsEditor },
  props: {
    value: undefined,
    names: undefined,
    height: { default: '260px' },
    closeButton: { default: false },
  },
  data() {
    return {
      input: this.value,
      defaultValue: '',
    }
  },
  computed: {
    id() {
      return this.$vnode.key.split('-')[1]
    },
    cssParams() {
      return {
        fontSize: '12px',
        height: this.height,
        border: '1px solid #eee',
      }
    },
  },
  created() {
    this.input = {
      name: this.input?.name || this.names[0],
      params: this.input?.params || new Tone[this.names[0]]().get(),
    }
    this.defaultValue = new Tone[this.input.name]().get()
  },
  mounted() {
    this.$emit('input', this.input)
  },
  watch: {
    'input.name': {
      handler() {
        this.input.params = new Tone[this.input.name]().get()
        this.defaultValue = this.input.params
      },
    },
    input: {
      deep: true,
      handler() {
        this.$emit('input', this.input)
      },
    },
  },
}
</script>
