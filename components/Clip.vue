<template lang="html">
  <ParamsEditor
    :key="`clips-${id}`"
    :value="value"
    @input="(v) => $emit('input', v)"
    height="140px"
  />
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
            notes: 'CD-2 CDM-2 ET-1 ETM-1',
            pattern: 'x_x_x_x_',
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
