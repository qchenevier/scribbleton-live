<template>
  <div v-if="document.toc.length" class="column is-2 is-sticky">
    <b-menu>
      <b-menu-list :label="document.title">
        <scrollactive
          highlight-first-item
          tag="div"
          scrollContainerSelector="div.animation-content.modal-content"
          :scrollOnStart="false"
          :clickToScroll="false"
          :modifyUrl="false"
          activeClass="is-scroll-active"
        >
          <a
            v-for="link of document.toc"
            :key="link.id"
            :href="`#${link.id}`"
            :class="`scrollactive-item px-2 py-${link.depth == 3 ? 1 : 2} ml-${
              link.depth == 3 ? 2 : 0
            } is-size-${link.depth == 3 ? 6 : 5}`"
            style="pointer-events: none;"
          >
            {{ link.text }}
          </a>
        </scrollactive>
      </b-menu-list>
    </b-menu>
  </div>
</template>

<script>
export default {
  props: {
    document: {
      default() {
        return { toc: [] }
      },
    },
  },
}
</script>

<style lang="scss">
.is-sticky {
  height: 20vh;
  position: sticky;
  top: 1.5rem;
}

@import '~bulma';
.is-scroll-active {
  @extend .is-active;
}

.scrollactive-item {
  padding: 0.25em 0.5em;
}
</style>
