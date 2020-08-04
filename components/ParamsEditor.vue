<template lang="html">
  <div>
    <codemirror
      :ref="`editor-${id}`"
      :key="`editor-${id}`"
      v-model="input"
      @focus="setCodeMirrorBackground('#3273DC0C')"
      @blur="
        $emit('input', YAML.parse(input))
        setCodeMirrorBackground('#FFFFFF')
      "
      :options="editorOptions"
    >
    </codemirror>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/mode/yaml/yaml'

import YAML from 'yaml'
import * as Diff from 'diff'

export default {
  components: { codemirror },
  props: {
    value: {},
    editorOptions: {
      default() {
        return {
          tabSize: 2,
          mode: 'text/yaml',
          dragDrop: false,
          line: true,
          scrollbarStyle: 'overlay',
        }
      },
    },
    defaultValue: undefined,
    height: { default: '300px' },
  },
  data() {
    return {
      YAML: YAML,
      input: YAML.stringify(this.value),
      background: '#FFFFFF',
      highlightedLinesNumbers: [],
    }
  },
  computed: {
    id() {
      return this.$vnode.key.split('-')[1]
    },
  },
  methods: {
    computeHighlightedLinesNumbers() {
      let lineNumbers = []
      let iLine = 0
      if (this.defaultValue) {
        Diff.diffLines(YAML.stringify(this.defaultValue), this.input)
          .filter((line) => !line.removed)
          .forEach((line) => {
            if (line.added) {
              for (let i = 0; i < line.count; i++) {
                lineNumbers.push(i + iLine)
              }
            }
            iLine += line.count
          })
      }
      this.highlightedLinesNumbers = lineNumbers
    },
    setCodeMirrorHeight(height) {
      this.$refs[`editor-${this.id}`].$el.style.height = height
      this.$refs[`editor-${this.id}`].$el.children[1].style.height = height
    },
    setCodeMirrorBackground(background) {
      this.$refs[
        `editor-${this.id}`
      ].$el.children[1].style.background = background
    },
  },
  created() {
    this.computeHighlightedLinesNumbers()
  },
  mounted() {
    this.setCodeMirrorHeight(this.height)
    this.setCodeMirrorBackground(this.background)
  },
  watch: {
    value() {
      this.input = YAML.stringify(this.value)
      this.computeHighlightedLinesNumbers()
    },
    highlightedLinesNumbers: {
      handler(newLineNumbers, oldLineNumbers) {
        oldLineNumbers?.forEach((i) =>
          this.$refs[`editor-${this.id}`].cminstance.removeLineClass(
            i,
            'wrap',
            'highlighted'
          )
        )
        newLineNumbers.forEach((i) =>
          this.$refs[`editor-${this.id}`].cminstance.addLineClass(
            i,
            'wrap',
            'highlighted'
          )
        )
      },
    },
  },
}
</script>

<style scoped>
/deep/ .CodeMirror {
  font-size: 14px;
  direction: ltr;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
}

/deep/ .cm-s-default .cm-atom {
  color: rgba(50, 115, 220, 1);
}

/deep/ .highlighted {
  font-weight: bold;
  background-color: rgba(50, 115, 220, 0.2);
}

/deep/ .CodeMirror-overlayscroll-horizontal div {
  background: rgba(50, 115, 220, 0.8);
  border-radius: 1.5px;
}
/deep/ .CodeMirror-overlayscroll-vertical div {
  background: rgba(50, 115, 220, 0.8);
  border-radius: 1.5px;
}

/deep/ .CodeMirror-overlayscroll-horizontal {
  height: 3px;
}

/deep/ .CodeMirror-overlayscroll-vertical {
  width: 3px;
}
</style>
