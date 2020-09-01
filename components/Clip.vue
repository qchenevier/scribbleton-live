<template lang="html">
  <b-tooltip
    label="scribbletune clip configuration in YAML, click inside to edit, click outside to save"
    :delay="1000"
    type="is-link"
    position="is-top"
    multilined
    style="width: 100%;"
  >
    <ParamsEditor
      :key="`clips-${id}`"
      :value="value"
      @input="(v) => $emit('input', v)"
      height="140px"
    />
  </b-tooltip>
</template>

<script>
import ParamsEditor from '~/components/ParamsEditor.vue'

export default {
  components: { ParamsEditor },
  props: {
    value: {
      default() {
        return [
          {
            notes: 'CM-3 Em-3 Dm-3 FM-3',
            pattern: 'x__[-x]x__[-x]',
          },
        ]
      },
    },
  },
  computed: {
    id() {
      return this.$vnode.key.split('-')[1]
    },
  },
  mounted() {
    this.$emit('input', this.value)
  },
}
</script>

<style scoped></style>
