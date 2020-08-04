<template>
  <div>
    <NavBar v-model="scribbletonLiveSession" />

    <MainControls
      :isPlaying="isPlaying"
      :isRendering="isRendering"
      :isAutoReplay="isAutoReplay"
      @toggleVariable="toggleVariable"
      @addChannel="addChannel"
    />

    <div class="columns container is-fluid" style="overflow-x: auto;">
      <PlayPattern
        :isPlayPattern="isPlayPattern"
        :playPatternId="playPatternId"
        :playPattern.sync="playPattern"
        :rowNumberToPlay.sync="rowNumberToPlay"
        @toggleVariable="toggleVariable"
      />
      <Channel
        v-for="(channel, id) in channels"
        :key="`channel-${id}`"
        v-model="channels[id]"
        @close="removeChannel"
      />
    </div>
  </div>
</template>

<script>
import * as scribble from 'scribbletune'

import Channel from '~/components/Channel.vue'
import NavBar from '~/components/NavBar.vue'
import PlayPattern from '~/components/PlayPattern.vue'
import MainControls from '~/components/MainControls.vue'

function randomHash() {
  return Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0')
}

scribble.addChord(['1P', '5P', '8P', '12P'], [], 'D')
scribble.addChord(['1P', '5P', '8P', '10M', '12P'], [], 'DM')
scribble.addChord(['1P', '5P', '8P', '10m', '12P'], [], 'Dm')
scribble.addChord(['1P', '5P', '8P', '12P', '15P', '19P'], [], 'T')
scribble.addChord(['1P', '5P', '8P', '12P', '15P', '17M', '19P'], [], 'TM')
scribble.addChord(['1P', '5P', '8P', '12P', '15P', '17m', '19P'], [], 'Tm')

export default {
  components: {
    Channel,
    NavBar,
    PlayPattern,
    MainControls,
  },
  data() {
    return {
      channels: {},
      toneInstruments: {},
      toneEffects: {},
      session: undefined,
      isPlaying: false,
      isRendering: false,
      isAutoReplay: false,
      isPlayPattern: true,
      rowNumberToPlay: 0,
      playPatternId: randomHash(),
      playPattern: {
        clipDuration: '2:0:0',
        channelPatterns: [],
      },
    }
  },
  computed: {
    scribbletonLiveSession: {
      get() {
        return {
          channels: Object.values(this.channels),
          playPattern: this.playPattern,
        }
      },
      set(loadedLiveSession) {
        this.playPattern = loadedLiveSession.playPattern
        this.channels = {}
        loadedLiveSession.channels.forEach(this.addChannel)
        this.updatePlayPattern()
      },
    },
    watchPropsForSessionRebuild() {
      return {
        channels: Object.values(this.channels)
          .filter((c) => c?.isActive)
          .map((c) => {
            return {
              instrumentName: c?.instrument?.name,
              effectNames: c?.effects
                ? Object.values(c.effects).map((e) => e?.name)
                : undefined,
              clips: c?.clips,
              offlineRendering: c?.offlineRendering,
              idx: c?.idx,
              instrumentParams: c?.offlineRendering
                ? c?.instrument?.params
                : undefined,
              effectParams: c?.offlineRendering
                ? c?.effects
                  ? Object.values(c.effects).map((e) => e?.params)
                  : undefined
                : undefined,
            }
          }),
        playPattern: this.isPlayPattern
          ? this.playPattern
          : this.rowNumberToPlay,
      }
    },
    channelsIdx() {
      return [
        ...new Set(
          Object.values(this.channels)
            .filter((c) => c)
            .map((c) => c.idx)
        ),
      ]
    },
    watchInstrumentParamsForUpdate() {
      return Object.values(this.channels).map((c) =>
        !c?.offlineRendering ? c?.instrument?.params : undefined
      )
    },
    watchEffectParamsForUpdate() {
      return Object.values(this.channels).map((c) =>
        !c?.offlineRendering && c?.effects
          ? undefined
          : c?.effects
          ? Object.values(c.effects).map((e) => e?.params)
          : undefined
      )
    },
  },
  methods: {
    toggleVariable(propertyName) {
      this[propertyName] = !this[propertyName]
    },
    createToneTransport() {
      this.session.channels.forEach((c) =>
        c.clips
          .filter((c) => c.name === 'Player')
          .forEach((c) => c.unsync().sync())
      )
      if (this.isPlayPattern) {
        this.session.play(this.playPattern)
      } else {
        this.session.startRow(this.rowNumberToPlay)
      }
    },
    cancelToneTransport() {
      this.isPlaying = false
      this.tonePlayPause() // can't wait for the "isPlaying" watcher to be triggered, otherwise, offline rendered player have a huge offset.
      Tone.Transport.cancel()
      Tone.Transport.stop()
    },
    tonePlayPause() {
      this.isPlaying ? Tone.Transport.start() : Tone.Transport.pause()
      // this.isPlaying ? Tone.Transport.start() : Tone.Transport.stop();
    },
    addChannel(channel) {
      let id = randomHash()
      this.$set(this.channels, id, channel)
      if (typeof channel === 'undefined') this.updatePlayPattern()
    },
    removeChannel(id) {
      this.$delete(this.channels, id)
    },
    createToneEffects(id, channel) {
      function createEffect(effectName, idFull) {
        this.toneEffects[idFull] = new Tone[effectName]()
        return this.toneEffects[idFull]
      }
      let effects = channel?.effects
        ? Object.entries(channel.effects)
            .filter(([idEffect, effect]) => effect.name)
            .map(([idEffect, effect]) =>
              effect
                ? createEffect.bind(this)(effect.name, `${id}-${idEffect}`)
                : undefined
            )
            .filter((i) => i)
        : undefined
      return effects
    },
    createChannel([id, channel]) {
      if (channel?.instrument?.name && channel?.clips) {
        this.toneInstruments[id] = new Tone.PolySynth(
          Tone[channel.instrument.name]
        )
        this.updateToneInstrumentsParams()
        const effects = this.createToneEffects(id, channel)
        this.updateToneEffectsParams()
        if (channel.offlineRendering) {
          this.isRendering = true
        }
        const channelParams = {
          idx: channel.idx || id,
          instrument: this.toneInstruments[id],
          clips: channel.clips,
          offlineRendering: channel.offlineRendering,
          offlineRenderingCallback: () => {
            this.isRendering = false
          },
          effects: effects ? effects : [],
        }
        this.session.createChannel(channelParams)
      }
    },
    createSession() {
      this.cancelToneTransport()
      this.session = new scribble.Session()
      this.toneInstruments = {}
      this.toneEffects = {}
      Object.entries(this.channels)
        .filter(([id, channel]) => channel?.isActive)
        .forEach(this.createChannel)
      this.createToneTransport()
    },
    updateToneInstrumentsParams() {
      Object.entries(this.channels).forEach(([id, channel]) => {
        if (channel?.instrument?.params && this.toneInstruments[id]) {
          this.toneInstruments[id].set(channel.instrument.params)
        }
      })
    },
    updateToneEffectsParams() {
      Object.entries(this.channels).forEach(([id, channel]) => {
        if (channel) {
          Object.entries(channel.effects).forEach(([idEffect, effect]) => {
            let idFull = `${id}-${idEffect}`
            if (effect?.params && this.toneEffects[idFull]) {
              this.toneEffects[idFull].set(effect.params)
            }
          })
        }
      })
    },
    updatePlayPattern() {
      this.$set(
        this.playPattern,
        'channelPatterns',
        this.playPattern.channelPatterns?.filter((c) =>
          this.channelsIdx.includes(c.channelIdx)
        )
      )
      const orphanChannelsIdx = this.channelsIdx.filter(
        (idx) =>
          !this.playPattern.channelPatterns
            .map((c) => c.channelIdx)
            .includes(idx)
      )
      orphanChannelsIdx.forEach((idx) =>
        this.playPattern.channelPatterns.push({
          channelIdx: idx,
          pattern: '0___',
        })
      )
      this.playPatternId = randomHash() // force update the component
    },
  },
  watch: {
    watchPropsForSessionRebuild: {
      deep: true,
      handler() {
        this.createSession()
      },
    },
    watchInstrumentParamsForUpdate: {
      deep: true,
      handler() {
        this.updateToneInstrumentsParams()
      },
    },
    watchEffectParamsForUpdate: {
      deep: true,
      handler() {
        this.updateToneEffectsParams()
      },
    },
    isPlaying() {
      this.tonePlayPause()
    },
    isRendering() {
      if (!this.isRendering && this.isAutoReplay) {
        this.isPlaying = true
      }
    },
    channelsIdx: {
      deep: true,
      handler() {
        this.updatePlayPattern()
      },
    },
  },
}
</script>

<style lang="scss">
// see https://buefy.org/documentation/customization/
@import '~bulma/sass/utilities/_all';

$box-padding: 0.75rem;

@import '~bulma';
@import '~buefy/src/scss/buefy';

.level,
.level:not(:last-child),
.subtitle,
.subtitle:not(:last-child),
.title,
.title:not(:last-child) {
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}
.box {
  margin: 0.25rem;
  width: 20rem;
}
.button.is-rounded {
  padding-left: 0.75em;
  padding-right: 0.75em;
  margin-right: 0.5em;
}
.custom-tooltip.b-tooltip:after {
  white-space: pre;
}
</style>
