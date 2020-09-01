<template lang="html">
  <div class="column is-narrow">
    <div class="box is-6">
      <div class="level">
        <!-- lazy input change for buefy component https://github.com/buefy/buefy/issues/401 -->
        <div class="title is-5">Channel</div>
        <div class="level-right">
          <b-tooltip
            label="Play/Mute channel"
            :delay="1000"
            type="is-link"
            position="is-bottom"
          >
            <b-button
              rounded
              :type="input.isActive ? '' : 'is-link'"
              @click="$set(input, 'isActive', !input.isActive)"
              outlined
              :icon-left="input.isActive ? 'pause' : 'play'"
            />
          </b-tooltip>
          <b-tooltip
            label="Prerender audio for improved performance, each time parameters are modified"
            :delay="1000"
            type="is-link"
            position="is-bottom"
            multilined
          >
            <b-button
              rounded
              :type="input.offlineRendering ? 'is-link' : ''"
              @click="$set(input, 'offlineRendering', !input.offlineRendering)"
              outlined
              icon-left="rocket-launch"
            />
          </b-tooltip>
          <b-tooltip
            label="Close"
            :delay="1000"
            type="is-link"
            position="is-bottom"
          >
            <b-button
              rounded
              icon-left="close"
              @click="$emit('close', id)"
              style="margin-right: unset;"
            />
          </b-tooltip>
        </div>
      </div>
      <div class="level">
        <b-tooltip
          label="Channel name, which is the 'channelIdx' property used in play pattern. You can group channels together by giving them the same name."
          :delay="1000"
          type="is-link"
          position="is-bottom"
          multilined
        >
          <b-input
            :value="input.idx"
            @change.native="$set(input, 'idx', $event.target.value)"
            rounded
          />
        </b-tooltip>
        <b-tooltip
          label="Add audio effect(s), applied on instrument output"
          :delay="1000"
          type="is-link"
          position="is-bottom"
          multilined
        >
          <b-button
            rounded
            icon-left="creation"
            @click="addEffect"
            style="margin-left: 0.5em; margin-right: unset;"
          >
            Add effect
          </b-button>
        </b-tooltip>
      </div>
      <div class="subtitle is-5">
        Clips
      </div>
      <Clip :key="`clip-${id}`" v-model="input.clips" />
      <div class="subtitle is-5">Instrument</div>
      <Instrument
        :key="`instrument-${id}`"
        :names="instrumentNames"
        v-model="input.instrument"
      />

      <div v-if="Object.values(input.effects).length">
        <div v-if="Object.values(input.effects).length" class="subtitle is-5">
          Effects
        </div>
        <Instrument
          class="effect"
          v-for="(effect, idEffect) in input.effects"
          :key="`effect-${idEffect}`"
          :names="effectNames"
          v-model="input.effects[idEffect]"
          :closeButton="true"
          @close="removeEffect"
          height="140px"
        />
      </div>
    </div>
  </div>
</template>

<script>
import animals from '~/components/animals.json'
import superbs from '~/components/superbs.json'

import Instrument from '~/components/Instrument.vue'
import Clip from '~/components/Clip.vue'

function randomHash() {
  return Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0')
}

export default {
  components: { Instrument, Clip },
  props: {
    value: {
      default() {
        return {
          clips: undefined,
          instrument: undefined,
          effects: {},
          offlineRendering: false,
          idx: undefined,
          isActive: true,
        }
      },
    },
  },
  data() {
    return {
      input: this.value,
      instrumentNames: [
        'AMSynth',
        'DuoSynth',
        'FMSynth',
        'MembraneSynth',
        'MetalSynth',
        'MonoSynth',
        'NoiseSynth',
        'PluckSynth',
        'Synth',
      ],
      effectNames: [
        'AutoFilter',
        'AutoPanner',
        'AutoWah',
        'BitCrusher',
        'Chebyshev',
        'Chorus',
        'Distortion',
        'FeedbackDelay',
        'Freeverb',
        'FrequencyShifter',
        'JCReverb',
        'Phaser',
        'PingPongDelay',
        'PitchShift',
        'Reverb',
        'StereoWidener',
        'Tremolo',
        'Vibrato',
        'Compressor',
      ],
      animals,
      superbs,
    }
  },
  created() {
    this.input.idx = this.value.idx || this.getRandomIdx()
  },
  computed: {
    id() {
      return this.$vnode.key.split('-')[1]
    },
  },
  methods: {
    addEffect(effect) {
      let id = randomHash()
      this.$set(this.input.effects, id, effect)
    },
    removeEffect(id) {
      this.$delete(this.input.effects, id)
    },
    getRandomIdx() {
      const shortAnimals = animals
        .filter((a) => {
          return a.name.split(' ').length == 1
        })
        .filter((a) => {
          return a.name.length <= 6
        })
      const shortSuperbs = superbs
        .filter((a) => {
          return a.split(' ').length == 1
        })
        .filter((a) => {
          return a.length <= 6
        })
      const animal =
        shortAnimals[Math.floor(Math.random() * shortAnimals.length)]
      const superb =
        shortSuperbs[Math.floor(Math.random() * shortSuperbs.length)]
      return `${animal.emoji} ${superb} ${animal.name}`
        .split(' ')
        .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
        .join(' ')
    },
  },
  watch: {
    input: {
      deep: true,
      handler() {
        this.$emit('input', this.input)
      },
    },
  },
}
</script>

<style></style>
