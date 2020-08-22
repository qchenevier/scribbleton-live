<template>
  <div class="box" style="width: unset;">
    <nuxt-content class="content" :document="markdownDocument" />
  </div>
</template>

<script>
export default {
  props: {
    file: { default: 'default' },
  },
  data() {
    return { markdownDocument: undefined }
  },
  async mounted() {
    this.markdownDocument = await this.$content(this.file).fetch()
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
