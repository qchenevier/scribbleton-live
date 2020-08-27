---
title: Documentation
---

<h1> <b-icon size="is-small" icon="help-circle-outline"></b-icon>&nbsp; Documentation </h1>

## Foreword

### Useful references

#### Technical docs

[Scribbleton Live](http://scribbleton.live) is built primarily on [scribbletune](https://scribbletune.com) which provides a minimal interface to write **melodies**, **rhythm patterns** & **song structure**. To do so, [scribbletune](https://scribbletune.com) leverages:

- [tonal](https://github.com/tonaljs/tonal) for **chords**. It translates chords notations to group of notes.
- [Tone.js](https://tonejs.github.io/) for **instruments** & **effects**. It does all the hard work of calling the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) to do the audio synthesis.

It is highly recommended to experiment with each of those libraries, or at least to skim through their examples & documentation before using [Scribbleton Live](http://scribbleton.live). Here are a few pages of interest you will often use:

- scribbletune [doc](https://scribbletune.com/documentation/)
- Tone.js [doc](https://tonejs.github.io/docs) and [examples](https://tonejs.github.io/examples/)
- tonal [chord doc](https://github.com/tonaljs/tonal/tree/master/packages/chord) and [list of chords](https://github.com/tonaljs/tonal/blob/master/packages/chord-type/data.ts)

#### Music courses

Ableton has designed very cool in-browser tutorials:

- [Learning Synths](https://learningsynths.ableton.com/) to get familiar with the concepts used in Tone.js instrument parameters. It's fun because all the in-browser demos are coded with Tone.js !
- [Learn Music](https://learningmusic.ableton.com/) gives a broad overview of all aspects of composing music with a computer.

[Nathan Speller](https://nathanspeller.com/) has made a really nice in-browser music theory course called [LightNote](https://www.lightnote.co/). The section about [diatonic chords](https://www.lightnote.co/music-theory/diatonic) is one of the best. _The first seven lessons are free, but I can't tell if the premium lessons are worth it because I didn't test it._

### Application layout

The application is built around this layout:

<table class="table is-bordered has-text-centered">
  <tbody>
    <tr>
      <td colspan="5"> Navigation Bar </td>
    </tr>
    <tr>
      <td colspan="2"> Song Controls </td>
    </tr>
    <tr>
      <td> <br/><br/> Play Pattern <br/><br/><br/> </td>
      <td> <br/><br/> Channel 1 <br/><br/><br/> </td>
      <td> <br/><br/> Channel ... <br/><br/><br/> </td>
      <td style="border-right:unset; border-top:unset; border-bottom:unset">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
    </tr>
  </tbody>
</table>

We'll refer to those sections in the follow-up of the documentation:

- Navigation Bar
- Song Controls
- Play Pattern
- Channel(s)

### Tooltips

<div class="level">
  <div class="level-item">
    <b-tooltip label="This is a tooltip" size="is-small" type="is-link" >
      <b-button :active="false" rounded>Hover me please !</b-button
    </b-tooltip>
  </div>
</div>

Most elements of the application have tooltips, i.e. small help dialogs displayed when hovering an element. To activate it just put your mouse over an element for more than 1 second.

This is the primary way to find help in the application.

### YAML Parameter Editors

Parameters of the song are serialized in JSON: i.e. play pattern and channel clips, instrument & effects parameters. For readability, we chose to provide a YAML editor to visualize & edit those parameters.

- To edit: click inside an editor.
- To save: click outside the editor. The app updates its state accordingly & the YAML is beautified.

For channel instruments & effects, the editor highlights the lines which have been modified from the default parameters, provided by [Tone.js](https://tonejs.github.io/). This is useful when you have modified many parameters from the default state & you don't remember which one you have modified.

> Note: More info on the [YAML parser/stringifier](https://github.com/eemeli/yaml) and the [Codemirror editor](https://codemirror.net/mode/yaml/index.html).

## Navigation Bar

### Oscilloscope

An oscilloscope is showing the waveform of the audio at the foreground & the spectrogram of the audio in the background.

It is computationally intensive as it is refreshed frequently. If you wish to save some battery for your laptop, you may disable it by clicking on it, a grey rectangle placeholder will appear. Click again to re-enable it.

### File

This menu enables input & output of the song in JSON format or even as a (huge) link.

To save your song in a JSON format, the file name for saving is computed from the song name.

To save your song in a link, the song JSON object is saved in `base64` format and put into an URL parameter. This makes a pretty long url, but this is an straightforward way to share a song, without needing to save & send a file.

### Chat

Join the [discord chat](https://discord.gg/jJHQWd8) to share your experiments & ask questions ! As there are no trackers in the app, we need your feedbacks ! There is no other way for us to know what is going right or wrong with the app.

### Help

This help menu contains the app documentation & information about the app.

## Song Controls

### Song Name

To give a name to your song. Used in filename save.

### Play/Pause

To play or pause the song. Keyboard shortcut: <kbd>shift</kbd>+<kbd>space</kbd>.

When offline rendering is enabled for some channels, this button is in a "loading" state until rendering is finished.

### Auto-replay

When updating parameters on a channel with offline rendering enabled, it will pause the audio & wait for the rendering to finish. Auto-replay automatically replays the song after rendering is finished. Useful when working iteratively on a clip, instrument or effect parameters.

### Add Channel

To add a channel, with a default name, default chords & pattern and an instrument. The play pattern is updated with the new channel name and the audio is paused.

## Play pattern

This module on the left allows 2 types of playing the [scribbletune](https://scribbletune.com) session containing the channels:

- play a pattern using the `scribble.Session.play` method
- play a clip using the `scribble.Session.startRow` method

### Pattern

#### Clip duration

As each clip in each channel may have a different duration (given per each pattern length), we need to specify the duration of each step in the pattern, using the `clipDuration` parameter. This duration is given as a string using the [Tone.js time notation](https://github.com/Tonejs/Tone.js/wiki/Time#transport-time) in the form `BARS:QUARTERS:SIXTEENTHS`. Example: to play each clip for 2 bars, you specify `clipDuration: "2:0:0"`.

#### Channel pattern

An object specifying a pattern for each channel, with 2 properties:

- `channelIdx`: the string identifier of the channel. Several channel can have the same identifier, so that they can be controlled at the same time.

  When a new channel is created, a new object with the corresponding `channelIdx` is inserted in the play pattern.

  When a channel is deleted, any "orphan" object in the play pattern, i.e. without any corresponding channel, is deleted from the pattern.

- `pattern`: the pattern specifying when to start and stop each clip of the channel.

  The `pattern` language uses 12 different characters:

  - a 1-char figure between `0` and `9` = which clip to play for the given `clipDuration`. So you can't have more than 10 clips in a channel to use the play pattern, as you would need more than 1 character to use the 11th clip.
  - the underscore `_` = extend the last clip for 1 step. Example: `0___` is equivalent to `0000`.
  - the hypen `-` char = silence. `----0___` means _wait for 4 times the `clipDuration` before playing the clip number `0` for 4 times the `clipDuration`_.

An example of a channel pattern in YAML would be:

```yaml
channelIdx: bassline
pattern: --0_1_0_
```

which means:

_For bassline channel:_

- _silence for 2 steps_
- _play clip `0` for 2 steps_
- _play clip `1` for 2 steps_
- _play clip `0` for 2 steps_

An example of a complete play pattern for 3 channels in YAML would be:

```yaml
clipDuration: '2:0:0'
channelPattern:
  - channelIdx: bassline
    pattern: ----0___
  - channelIdx: melody
    pattern: 0___1___
  - channelIdx: kick
    pattern: --0_____
```

### Clip

A simple number giving the clip index to play in each channel, in an infinite loop.

It is especially useful when working on a particular clip: mute all the channels except the one you are working on and activate this mode to loop over the clip you are modifiying iteratively.

## Channel

### Controls

#### Play/Mute

Toggle playing or not the audio of this channel.

#### Prerendering

Very important feature to improve performance, when you hear "clicks" in the audio. However enabling this feature will reduce interactivity: each time you modify any parameters, the channel is re-rendered and so the audio is paused.

When working on a clip using prerendering, it is often used in combination with Autoreplay.

#### Close

To close the channel.

#### Channel Name

A default name (using animals names) is given by default to each new channel created. This name serves for the play pattern (the `channelIdx` parameter) and it doesn't need to be unique. Several channels with the same name (e.g: "beats", "bassline") will be played at the same time by the play pattern, using the same pattern. In other words, you can **group** together several channels by giving them the **same name**.

Beware, upon closing, the play pattern is updated to remove any orphan pattern.

### Clips

This element is based on the [scribbletune](https://scribbletune.com) clip, so it is strongly advised to read the corresponding documentation: scribbletune's [clip doc](https://scribbletune.com/documentation/core/clip) and [browser clip doc](https://scribbletune.com/documentation/browser/browser-clip).

#### Notes

The notes in the clip are specified either as a string or as an array of strings in the `notes` parameter:

- `'C3 C3 D3 E3'`
- `['C3', 'C4', 'D3']`

All instruments are wrapped in `Tone.PolySynth` objects so that they can play chords, instead of single-voice melodies. That means you can write chords instead of notes in the melody, and they will be converted into notes arrays by scribbletune. A chord can be given either as a string or as an array of notes.

You can find all the chords string notation supported by scribbletune in the tonal [list of chords](https://github.com/tonaljs/tonal/blob/master/packages/chord-type/data.ts).

Example, those 3 notations are equivalent:

- `'C3 CM-3 Em-3'`
- `['C3', 'CM-3, 'Dm-3']`
- `['C3', ['C3', 'E3', 'G3'], ['D3', 'F3', 'A3']]`

Using the same notes & chords notation, you can also specify a `randomNotes` list which will be used if you want to introduce some random notes in your melody.

#### Pattern

The pattern uses 4 characters to tell what to play for each quarter note:

- `x`: one quarter note
- `-`: one quarter silence
- `_`: extend previous note for one quarter. So `x_` means playing a note for 2 quarters, i.e. half a bar.
- `R`: a random quarter note, chosen in the `randomNotes` list of notes & chords.

Additionally, you can use brackets to split the quarter note into a sub pattern.

- `[x-]` means an 8th note
- `x[_-]` means a quarter dotted (extended by half) note

Example:

- play 4 quarter notes with `xxxx`
- play 4 notes in a more "picky" way using shorter notes with `[x---][x---][x---][x---]`

### Instrument

Every Tone.js instrument in Scribbleton.live is wrapped in a `Tone.PolySynth` in order to play chords seamlessly.

The available `Tone.js` instruments are all the synths:

For melodies & chords:

- `Synth`: 1 oscillator, 1 envelope
- `AMSynth`: Amplitude Modulation synth using a LFO oscillator
- `FMSynth`: Frequency Modulation synth using a LFO oscillator
- `MonoSynth`: 1 oscillator, 1 filter, 2 envelopes
- `DuoSynth`: 2 `Monosynths` combined
- `PluckSynth`: string instrument sound using Karplus-Strong synthesis
- `MetalSynth`: metallophone sound

For beats:

- `MembraneSynth`: kick sound
- `NoiseSynth`: snare sound. It cannot play any note so it will ignore the notes given in the pattern.

It is highly recommended to check the Tone.js [doc](https://tonejs.github.io/docs) and [examples](https://tonejs.github.io/examples/) for each instrument before using it.

Tips on which Tone.js instruments parameters are interesting to try first:

- play with ADSR parameters `attack`, `decay`, `sustain`, `release`.
- play with oscillator `type` parameter: basic values can be: `sine`, `triangle`, `square`, `sawtooth`. You can find in the [Tone.js OscillatorInterface code](https://github.com/Tonejs/Tone.js/blob/ed0d3b0/Tone/source/oscillator/OscillatorInterface.ts) more oscillator types to try.
- play with frequency parameter if available: it's often the LFO frequency.

### Effects

It is very important to add various sound effects, otherwise your synthesizers will sound cheap ! The most basic ones are reverb effects, but you can try them all.

All the Tone.js effects are available. It is highly recommended to check the Tone.js [doc](https://tonejs.github.io/docs) and [examples](https://tonejs.github.io/examples/) for each effect before using it.

Here are some video examples of why effects are important to give more deepness to your synthesized audio:

- [popping a balloon in a lobby vs in an anechoic chamber](https://twitter.com/page_eco/status/1297160309459709954)
- [popping a balloon in a reverberation room vs in an anechoic chamber](https://www.youtube.com/watch?v=zq07ZFMvo-c) and [the spectrogram of this video](https://www.youtube.com/watch?v=jwYR3v9Sj2w)
- [popping a balloon at various locations in a cylindric tunnel](https://www.youtube.com/watch?v=OEueqNilkLs)
