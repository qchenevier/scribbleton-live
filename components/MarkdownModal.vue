<template>
  <div class="box columns" style="width: unset;">
    <MarkdownToc :document="document" :key="tocKey" />
    <nuxt-content class="column content" :document="document" />
  </div>
</template>

<script>
import MarkdownToc from '~/components/MarkdownToc.vue'

export default {
  components: { MarkdownToc },
  props: {
    file: { default: 'default' },
  },
  data() {
    return { document: undefined, tocKey: 0 }
  },
  async mounted() {
    this.document = await this.$content(this.file).fetch()
  },
}
</script>

<style>
.nuxt-content {
  margin: 15px;
}
.icon.icon-link {
  display: none;
}
</style>
