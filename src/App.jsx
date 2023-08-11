import { useEffect, useState } from "react";
import useKeyboard, { KeyboardProvider } from "@moonwave99/keyfocus";
import useTone from "./hooks/useTone";
import Score from "./Score";
import IconButton from "./IconButton";
import AccentModesView from "./AccentModesView";
import { partToTone, transpose } from "./lib/utils";
import { fingers, strings, part, defaultBPM } from "./lib/data";
import * as doc from "./text.md";

const accentModes = {
  notes: {
    quarter: (_, index) => index % 4 === 0,
    even: (_, index) => index % 2 === 0,
    odd: (_, index) => index % 2 === 1,
  },
  strings: strings.reduce(
    (memo, string) => ({
      ...memo,
      [string]: (x) => x.string === string,
    }),
    {}
  ),
  fingers: fingers.reduce(
    (memo, finger) => ({
      ...memo,
      [finger]: (x) => x.finger === finger,
    }),
    {}
  ),
};

function getAccentMode(accessor) {
  try {
    const mode = accessor
      .split(".")
      .reduce((memo, token) => memo[token], accentModes);
    return mode || accentModes.default;
  } catch (error) {
    return accentModes.default;
  }
}

export function App() {
  const [bpm, setBpm] = useState(defaultBPM);
  const [accentMode, setAccentMode] = useState("notes.quarter");

  const partWithAccents = part.map((x, index) => ({
    ...x,
    accented: getAccentMode(accentMode)(x, index),
  }));

  const {
    toggle,
    stop,
    toggleMetronome,
    isPlaying,
    loop,
    metronomeOn,
    togglePartLoop,
  } = useTone({
    part: partToTone(transpose(partWithAccents, -1)),
    bpm,
    initialLoop: true,
  });

  useKeyboard(({
    id: 'App',
    autoFocus: true,
    global: true,
    handlers: {
      m: () => toggleMetronome(),
      Space: (event) => {
        event.preventDefault();
        toggle();
      }
    }
  }));  

  useEffect(() => {
    const score = document.getElementById("score");
    if (!score) {
      return;
    }
    score
      .querySelectorAll(".abcjs-note")
      .forEach((el, index) =>
        el.classList.toggle("highlight", partWithAccents[index].accented)
      );
  }, [partWithAccents]);

  function onAccentModeSelect(mode) {
    setAccentMode(mode);
  }

  return (
    <KeyboardProvider>
      <div className="App">
        <div className="container">
          <div className="column">
            <header>
              <h1>Villa-Lobos Étude No. 1 Practice Companion</h1>
              <p>
                Practicing the arpeggio accenting different notes is a great
                exercise for single fingers awareness.
                <br />
                Hear all the variations at the desired speed so you have an idea
                how you should sound like.
              </p>
            </header>
            <Score part={partWithAccents} partKey="Em"/>
            <div className="controls-wrapper">
              <div className="controls">
                <IconButton icon={isPlaying ? "pause" : "play"} onClick={toggle}>
                  Play / Pause
                </IconButton>
                <IconButton onClick={stop} icon="stop">
                  Stop
                </IconButton>
                <IconButton
                  toggable
                  icon="loop"
                  toggled={loop}
                  onClick={togglePartLoop}
                >
                  Toggle Loop
                </IconButton>
                <IconButton
                  toggable
                  icon="metronome"
                  toggled={metronomeOn}
                  onClick={toggleMetronome}
                >
                  Toggle Metronome
                </IconButton>
                <label>
                  BPM
                  <input
                    disabled={isPlaying}
                    type="number"
                    value={bpm}
                    min={50}
                    max={200}
                    onChange={(event) => setBpm(+event.target.value)}
                  />
                </label>
              </div>
              <AccentModesView
                accentMode={accentMode}
                onSelect={onAccentModeSelect}
                disabled={isPlaying}
              />
            </div>
            <footer>
              &copy; {new Date().getFullYear()} - made with love at{" "}
              <a href="https://github.com/moonwave99">mwlabs</a>.
            </footer>
          </div>
          <aside dangerouslySetInnerHTML={{ __html: doc.html }}></aside>
        </div>
      </div>
    </KeyboardProvider>
  );
}
