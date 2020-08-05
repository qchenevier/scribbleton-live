<template>
  <div>
    <KeyPress
      key-event="keydown"
      :key-code="32"
      :modifiers="['shiftKey']"
      @success="$emit('toggleVariable', 'isPlaying')"
    />
    <div class="container is-fluid">
      <div class="columns" style="margin-bottom: -1.7rem;">
        <div class="column is-narrow">
          <div class="box borderless">
            <b-input
              :value="songName"
              placeholder="Song name"
              @change.native="$emit('update:songName', $event.target.value)"
              rounded
            >
            </b-input>
          </div>
        </div>
        <div class="column is-narrow">
          <div class="box borderless">
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

<style lang="scss" scoped>
/deep/ .box.borderless {
  box-shadow: unset;
  margin-left: 0;
  margin-top: 0;
  margin-bottom: 0;
  margin-right: 1.5rem;
  background-color: unset;
}
</style>
