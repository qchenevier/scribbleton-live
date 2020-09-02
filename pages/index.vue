<template>
  <div>
    <NavBar
      v-model="scribbletonLiveSession"
      @activeDocModal="isDocModalActive = true"
      @activeAboutModal="isAboutModalActive = true"
    />

    <MainControls
      :isPlaying="isPlaying"
      :isLoading="isLoading"
      :isAutoReplay="isAutoReplay"
      :songName.sync="songName"
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
    <b-modal v-model="isDocModalActive">
      <MarkdownModal file="doc" />
    </b-modal>
    <b-modal v-model="isAboutModalActive">
      <MarkdownModal file="about" />
    </b-modal>
  </div>
</template>

<script>
import * as scribble from 'scribbletune'

import Channel from '~/components/Channel.vue'
import NavBar from '~/components/NavBar.vue'
import PlayPattern from '~/components/PlayPattern.vue'
import MainControls from '~/components/MainControls.vue'
import MarkdownModal from '~/components/MarkdownModal.vue'

window.scribble = scribble

function randomHash() {
  return Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0')
}

export default {
  components: {
    Channel,
    NavBar,
    PlayPattern,
    MainControls,
    MarkdownModal,
  },
  data() {
    return {
      channels: {},
      toneInstruments: {},
      toneEffects: {},
      session: undefined,
      isPlaying: false,
      isRendering: false,
      isLoadingBuffer: false,
      isAutoReplay: false,
      isPlayPattern: true,
      rowNumberToPlay: 0,
      playPatternId: randomHash(),
      playPattern: {
        clipDuration: '2:0:0',
        channelPatterns: [],
      },
      songName: undefined,
      isDocModalActive: false,
      isAboutModalActive: false,
    }
  },
  computed: {
    scribbletonLiveSession: {
      get() {
        return {
          channels: Object.values(this.channels),
          playPattern: this.playPattern,
          songName: this.songName,
        }
      },
      set(loadedLiveSession) {
        this.playPattern = loadedLiveSession.playPattern
        this.songName = loadedLiveSession.songName
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
              instrumentParams:
                c?.offlineRendering ||
                c?.instrument?.name === 'Player' ||
                c?.instrument?.name === 'Sampler'
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
        c?.offlineRendering ||
        c?.instrument?.name === 'Player' ||
        c?.instrument?.name === 'Sampler'
          ? undefined
          : c?.instrument?.params
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
    isLoading() {
      return this.isRendering || this.isLoadingBuffer
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
      this.tonePlayPause() // can't wait for the "isPlaying" watcher to be triggered, otherwise offline rendered players have a huge offset.
      Tone.Transport.cancel()
      Tone.Transport.stop()
    },
    tonePlayPause() {
      this.isPlaying ? Tone.Transport.start() : Tone.Transport.pause()
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
        this.toneInstruments[id] =
          channel.instrument.name === 'NoiseSynth'
            ? new Tone[channel.instrument.name](channel?.instrument?.params)
            : channel.instrument.name === 'Player'
            ? new Tone[channel.instrument.name](channel?.instrument?.params)
            : channel.instrument.name === 'Sampler'
            ? new Tone[channel.instrument.name](channel?.instrument?.params)
            : new Tone.PolySynth(
                Tone[channel.instrument.name],
                channel?.instrument?.params
              )
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
    initSession() {
      this.cancelToneTransport()
      this.session = new scribble.Session()
      this.toneInstruments = {}
      this.toneEffects = {}
      this.isLoadingBuffer = false
    },
    notifyError(error) {
      this.$buefy.notification.open({
        message: error.toString(),
        type: 'is-danger',
        hasIcon: true,
        indefinite: true,
        queue: false,
      })
    },
    createSession() {
      this.initSession()
      try {
        this.isLoadingBuffer = true
        Object.entries(this.channels)
          .filter(([id, channel]) => channel?.isActive)
          .forEach(this.createChannel)
        Tone.loaded().then(() => {
          this.isLoadingBuffer = false
        })
        this.createToneTransport()
      } catch (error) {
        this.initSession()
        this.notifyError(error)
      }
    },
    updateToneInstrumentsParams() {
      try {
        Object.entries(this.channels).forEach(([id, channel]) => {
          if (channel?.instrument?.params && this.toneInstruments[id]) {
            const {
              url,
              baseUrl,
              urls,
              ...paramsWithoutUrl
            } = channel.instrument.params
            if (paramsWithoutUrl) {
              this.toneInstruments[id].set(paramsWithoutUrl)
            }
          }
        })
      } catch (error) {
        this.initSession()
        this.notifyError(error)
      }
    },
    updateToneEffectsParams() {
      try {
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
      } catch (error) {
        this.initSession()
        this.notifyError(error)
      }
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
        if (!Object.keys(this.toneInstruments).length) {
          this.createSession()
        }
        this.updateToneInstrumentsParams()
      },
    },
    watchEffectParamsForUpdate: {
      deep: true,
      handler() {
        if (!Object.keys(this.toneInstruments).length) {
          this.createSession()
        }
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

@import '~bulma';
@import '~buefy/src/scss/buefy';

.box .level:first-child {
  margin-top: unset;
}
.box .level,
.box .subtitle {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}

.level .title,
.upload .level {
  margin-bottom: unset;
}

.box {
  margin: 0.25rem;
  width: 20rem;
  padding: 1rem;
}
.button.is-rounded {
  padding-left: 1em;
  padding-right: 1em;
  margin-right: 0.5em;
}
.custom-tooltip.b-tooltip:after {
  white-space: pre;
}

.disabled {
  color: $grey-light;
}
.more-top-margin {
  margin-top: unset;
  margin-top: 1rem;
}
</style>
