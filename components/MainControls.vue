<template>
  <div>
    <KeyPress
      key-event="keydown"
      :key-code="32"
      :modifiers="['shiftKey']"
      @success="$emit('toggleVariable', 'isPlaying')"
    />
    <div class="level">
      <div class="level-left container is-fluid" style="padding-left: 0.5rem;">
        <b-tooltip
          class="custom-tooltip"
          position="is-bottom"
          :label="'Play/Pause\n(shift+space)'"
          :delay="1000"
          type="is-link"
          multilined
          size="is-small"
        >
          <b-button
            rounded
            :type="this.isPlaying ? 'is-dark' : 'is-link'"
            @click="$emit('toggleVariable', 'isPlaying')"
            :loading="this.isRendering"
            :icon-left="this.isPlaying ? 'pause' : 'play'"
          />
        </b-tooltip>
        <b-tooltip
          position="is-bottom"
          label="Auto-replay after prerender"
          :delay="1000"
          type="is-link"
          multilined
          size="is-small"
        >
          <b-button
            rounded
            :type="this.isAutoReplay ? 'is-link' : ''"
            @click="$emit('toggleVariable', 'isAutoReplay')"
            outlined
            icon-left="step-forward"
          />
        </b-tooltip>
        <b-button rounded icon-left="plus" @click="$emit('addChannel')">
          Add channel
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import KeyPress from 'vue-keypress'

export default {
  components: { KeyPress },
  props: {
    isPlaying: { default: false },
    isRendering: { default: false },
    isAutoReplay: { default: false },
  },
}
</script>

<style></style>
