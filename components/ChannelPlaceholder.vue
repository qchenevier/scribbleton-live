<template lang="html">
  <div class="column is-narrow">
    <div class="box is-6">
      <div class="title is-5">Hey! 👋</div>
      <div class="content">
        If it's your first time here, check out those links 👇
        <ul>
          <li>
            <nuxt-link to="/?modal=documentation">Documentation</nuxt-link>
            how to use
          </li>
          <li>
            <nuxt-link to="/?modal=about">About</nuxt-link>
            why & who did this app
          </li>
        </ul>
      </div>
      <div class="content">
        Those links are also available in the <i>Help</i> menu above ⬆
      </div>
      <div class="content">
        Then click on the <i>Add channel</i> button & start making music! 🤘
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style></style>
