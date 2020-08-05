<template lang="html">
  <div class="column is-narrow" style="padding-left: 1px;">
    <div class="box" style="margin-left: 0px;">
      <div class="level">
        <div class="title is-5">
          Play {{ isPlayPattern ? 'pattern' : 'clip' }}
        </div>
      </div>
      <b-collapse
        class="div"
        animation="slide"
        :open="isPlayPattern"
        @open="$emit('toggleVariable', 'isPlayPattern')"
        @close="$emit('toggleVariable', 'isPlayPattern')"
      >
        <div
          slot="trigger"
          slot-scope="props"
          role="button"
          class="subtitle is-5"
          :class="!isPlayPattern ? 'disabled' : ''"
        >
          Pattern
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
        </div>
        <ParamsEditor
          :key="playPatternId"
          :value="playPattern"
          @input="(v) => $emit('update:playPattern', v)"
          height="260px"
        />
      </b-collapse>

      <b-collapse
        class="div"
        animation="slide"
        :open="!isPlayPattern"
        @open="$emit('toggleVariable', 'isPlayPattern')"
        @close="$emit('toggleVariable', 'isPlayPattern')"
      >
        <div
          slot="trigger"
          slot-scope="props"
          role="button"
          class="subtitle is-5"
          :class="isPlayPattern ? 'disabled' : ''"
          style=""
        >
          Clip
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
        </div>
        <b-input
          :value="rowNumberToPlay"
          @change.native="$emit('update:rowNumberToPlay', $event.target.value)"
          :disabled="isPlayPattern"
        />
      </b-collapse>
    </div>
  </div>
</template>

<script>
import ParamsEditor from '~/components/ParamsEditor.vue'

export default {
  components: { ParamsEditor },
  props: {
    isPlayPattern: { default: true },
    playPattern: { default: '' },
    playPatternId: { default: 0 },
    rowNumberToPlay: { default: 0 },
  },
}
</script>
