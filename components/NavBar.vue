<template>
  <b-navbar wrapper-class="container is-fluid" shadow>
    <template slot="brand">
      <b-navbar-item>
        <h1 class="title">
          <b-icon
            size="is-small"
            icon="music-box-multiple-outline"
            type="is-link"
            style="margin-left: 0.75rem; margin-right: 0.75rem;"
          />
          Scribbleton Live
        </h1>
      </b-navbar-item>
      <b-navbar-item>
        <Oscilloscope />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item>
        <b-tooltip
          label="Load JSON file from computer"
          :delay="1000"
          type="is-link"
          position="is-bottom"
          multilined
        >
          <b-field class="file">
            <b-upload v-model="file">
              <div class="level">
                <b-icon icon="upload" />
                <span>Load</span>
              </div>
            </b-upload>
          </b-field>
        </b-tooltip>
      </b-navbar-item>
      <b-navbar-item>
        <b-tooltip
          label="Save JSON file locally"
          :delay="1000"
          type="is-link"
          position="is-bottom"
          multilined
        >
          <div class="level" @click="saveJson">
            <b-icon icon="download" />
            <span>Save</span>
          </div>
        </b-tooltip>
      </b-navbar-item>
      <b-navbar-item>
        <b-tooltip
          label="Save application state in a permalink, easy to share"
          :delay="1000"
          type="is-link"
          position="is-bottom"
          multilined
        >
          <div class="level" @click="getLink">
            <b-icon icon="share-variant" />
            <span>Share</span>
          </div>
        </b-tooltip>
      </b-navbar-item>
      <b-navbar-item href="https://discord.gg/jJHQWd8" target="_blank">
        <b-tooltip
          label="Chat with the scribbletune & scribbleton.live community"
          :delay="1000"
          type="is-link"
          position="is-bottom"
          multilined
        >
          <div class="level">
            <b-icon icon="forum" />
            <span>Chat</span>
          </div>
        </b-tooltip>
      </b-navbar-item>
      <b-navbar-item>
        <b-tooltip
          label="Doc"
          :delay="1000"
          type="is-link"
          position="is-bottom"
          multilined
        >
          <div class="level" @click="$emit('activeDocModal')">
            <b-icon icon="help-circle-outline" />
            <span>Doc</span>
          </div>
        </b-tooltip>
      </b-navbar-item>
      <b-navbar-item>
        <b-tooltip
          label="About this site"
          :delay="1000"
          type="is-link"
          position="is-bottom"
          multilined
        >
          <div class="level" @click="$emit('activeAboutModal')">
            <b-icon icon="information-outline" />
            <span>About</span>
          </div>
        </b-tooltip>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import buffer from 'buffer'
import Oscilloscope from './Oscilloscope.vue'
import { saveAs } from 'file-saver'

export default {
  components: {
    Oscilloscope,
  },
  props: ['value'],
  data() {
    return { file: undefined }
  },
  computed: {
    valueBase64() {
      return buffer.Buffer.from(JSON.stringify(this.value)).toString('base64')
    },
  },
  methods: {
    saveJson() {
      const serializedChannels = JSON.stringify(this.value, null, 2)
      var blob = new Blob([serializedChannels], {
        type: 'text/plain;charset=utf-8',
      })
      saveAs(blob, this.value.songName + '.json' || 'scribbleton-live.json')
    },
    getLink() {
      let url =
        window.location.origin +
        window.location.pathname +
        `?state=${this.valueBase64}`
      let toast = this.$buefy.toast
      let confirmObject = {
        title: 'Use this link to share the fun !',
        size: 'is-small',
        message: `<div style="word-break:break-all">The state of the app is saved into this url:<br/><a href="${url}">${url}</a></div>`,
        confirmText: 'Paste link to clipboard',
        type: 'is-link',
        hasIcon: true,
        icon: 'content-copy',
        onConfirm: () => {
          this.$copyText(url).then(
            () => toast.open('Copied'),
            () => toast.open('Did not copy')
          )
        },
      }
      this.$buefy.dialog.confirm(confirmObject)
    },
    emitStateFromUrl() {
      if (this.$route.query.state) {
        let input = JSON.parse(
          buffer.Buffer.from(this.$route.query.state, 'base64').toString()
          //   "ascii"
          // )
        )
        this.$emit('input', input)
        this.resetUrlState()
      }
    },
    resetUrlState() {
      if (this.$route.query.state) {
        let query = Object.assign({}, this.$route.query)
        delete query.state
        this.$router.replace({ query })
      }
    },
  },
  mounted() {
    this.emitStateFromUrl()
  },
  watch: {
    file(loadedFile) {
      this.resetUrlState()
      var reader = new FileReader()
      // arrow function to access component methods from inside FileReader
      // see https://stackoverflow.com/questions/40707738/vuejs-accessing-a-method-from-another-method#comment77209572_40708474
      reader.onload = (event) => {
        let input = JSON.parse(event.target.result)
        this.$emit('input', input)
      }
      reader.readAsText(loadedFile)
    },
    '$route.query.state': {
      handler() {
        this.emitStateFromUrl()
      },
    },
  },
}
</script>

<style scoped>
/deep/ .icon {
  margin-right: 0.25em;
}
</style>
