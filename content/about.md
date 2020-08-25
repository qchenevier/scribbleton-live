---
title: About
---

<h1> <b-icon size="is-small" icon="information-outline"></b-icon>&nbsp; About </h1>

## Music Making in Browser

### Enabling Open Music Creation

[Scribbleton Live](http://scribbleton.live) wishes to provide a simple & open way to produce & share music and enable experimentation with code & AI.

This is an experimental tool, which doesn't aim at replacing professional music creation tools, but rather enabling new forms of music creation, using code, collaboration tools.

Its name is a reference to [Ableton Live](https://www.ableton.com/en/live/), a popular music making tool on desktop, and [scribbletune](https://scribbletune.com), a javascript library to make music.

### Digital Audio Workstation

[Scribbleton Live](http://scribbleton.live) is a [Digital Audio Workstation (DAW)](https://en.wikipedia.org/wiki/Digital_audio_workstation), like [Ableton Live](https://www.ableton.com/en/live/) or [other notable DAWs](https://en.wikipedia.org/wiki/Digital_audio_workstation#List_of_notable_commercial_DAWs).

Like any DAW it enables you to:

- define a song structure in sections
- edit & produce melodies with notes, chords & rhythm patterns
- configure instruments & sound after-effects with which those melodies are synthesized

### In a web browser

Unlike most DAWs, [Scribbleton Live](http://scribbleton.live) is fully web-based, meaning that there is no installation needed, only a modern web browser.

Most DAWs have implemented their own audio synthesis engine (often in C++ for reduced latency), simulating elements of hardware synthesizers like oscillators, filter and so on. Whereas [Scribbleton Live](http://scribbleton.live) leverages the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) of web browsers to render the audio. This Web Audio API, if implemented by your web browser, provide all the building blocks of an hardware synthesizer.

The design of this API started in 2011, but it is still a [W3C draft](https://webaudio.github.io/web-audio-api/), so it may change in the future. The benefit is that [Scribbleton Live](http://scribbleton.live) leverages the built-in audio rendering engines of web browsers, which are continually improved by their wonderful development teams. The main drawback is that troubleshooting performance issues may be difficult and the amount of CPU resources dedicated to those audio rendering engines may be lower than what can be used by a fully-fledged desktop-based DAW.

## For developers

### Built with javascript

[Scribbleton Live](http://scribbleton.live) is built primarily on [scribbletune](https://scribbletune.com) which provides a minimal interface to write **melodies**, **rhythm patterns** & **song structure**. To do so, [scribbletune](https://scribbletune.com) leverages:

- [tonal](https://github.com/tonaljs/tonal) for **chords**. It translates chords notations to group of notes.
- [Tone.js](https://tonejs.github.io/) for **instruments** & **effects**. It does all the hard work of calling the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) to do the audio synthesis.

> Note: The web UI is built using [Vue.js](https://vuejs.org/), but it has nothing to do with audio synthesis using javascript.

### Free & Open source

[Scribbleton Live](http://scribbleton.live) is fully **open source**, you can [browse the code & fork the project on GitHub](https://github.com/qchenevier/scribbleton-live/). Contributions are welcome !

This is an experimental tool which doesn't , not to make a business of it, so **it is (and will always be) free**.

### Privacy by design

[Scribbleton Live](http://scribbleton.live) is **private by design**:

- it is a **statically built** single page app
- there is **no backend** or external APIs
- there is **no tracker** (e.g: Google Analytics)
- there are **no cookies**. In case of any bug, just refresh the page to have a brand new app with a clean state !

As a result, it is **fully GDPR compliant** without any annoying popups asking for your consent for whatever shady third-party extension.

### JSON music format for developers

[Scribbleton Live](http://scribbleton.live) aims at sharing & saving music in a clean JSON format. This format contains melodies & chords, rhythm patterns, instruments, sound effects & song structure.

At some point, the goal is to experiment with smart rules & statistical models (machine learning) to create semi-automatically music. This JSON format would enable an iterative creative process between machines & humans. I guess there will always be an human in the loop, someone in between an artist & a data scientist. The goal is only to help people leverage code & AI in their creative process. This starts with a clean & minimal file format to describe music.

> Note: This JSON format is not fixed yet and may evolve in future versions of [Scribbleton Live](http://scribbleton.live), as it is an experimental project for now. It's hard to [design a new standard](https://xkcd.com/927/).

## Who are we ?

Want to know who is behind this ? Find out by joining the [discord chat](https://discord.gg/jJHQWd8) 😄.

Or you can check the [repository's contributors list](https://github.com/qchenevier/scribbleton-live/graphs/contributors).
