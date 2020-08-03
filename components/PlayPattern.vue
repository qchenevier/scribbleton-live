<template lang="html">
  <div class="column is-narrow" style="padding-left: 1px;">
    <div class="box" style="margin-left: 0px;">
      <div class="level" style="margin-top: 0; margin-bottom: 0;">
        <div class="title is-6">
          Play {{ isPlayPattern ? 'pattern' : 'clip' }}
        </div>
        <div class="level" style="font-size: 0.75rem;">
          Pattern &nbsp;
          <b-switch
            type="is-link"
            passive-type="is-link"
            size="is-small"
            :value="!isPlayPattern"
            @input="$emit('toggleVariable', 'isPlayPattern')"
          >
            Clip</b-switch
          >
        </div>
      </div>

      <b-collapse
        class="div"
        animation="slide"
        :open="isPlayPattern"
        :style="!isPlayPattern ? 'text-decoration: line-through' : ''"
        @open="$emit('toggleVariable', 'isPlayPattern')"
        @close="$emit('toggleVariable', 'isPlayPattern')"
      >
        <div
          slot="trigger"
          slot-scope="props"
          role="button"
          class="subtitle is-6"
        >
          Pattern
          <b-icon size="is-small" :icon="props.open ? 'menu-down' : 'menu-up'">
          </b-icon>
        </div>
        <ParamsEditor
          :key="playPatternId"
          :value="playPattern"
          @input="(v) => $emit('playPattern', v)"
          height="260px"
        />
      </b-collapse>

      <b-collapse
        class="div"
        animation="slide"
        :open="!isPlayPattern"
        :style="isPlayPattern ? 'text-decoration: line-through' : ''"
        @open="$emit('toggleVariable', 'isPlayPattern')"
        @close="$emit('toggleVariable', 'isPlayPattern')"
      >
        <div
          slot="trigger"
          slot-scope="props"
          role="button"
          class="subtitle is-6"
          style=""
        >
          Clip
          <b-icon size="is-small" :icon="props.open ? 'menu-down' : 'menu-up'">
          </b-icon>
        </div>
        <b-input
          size="is-small"
          :value="rowNumberToPlay"
          @change.native="$emit('rowNumberToPlay', $event.target.value)"
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

<style scoped></style>
