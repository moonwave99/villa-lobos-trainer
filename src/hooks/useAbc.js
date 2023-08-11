import { useEffect, useRef } from "react";
import { renderAbc } from "abcjs";
import { AbcNotation } from "@tonaljs/tonal";
import { chunk } from "lodash";

function parseNote({ note, accented, finger }, index) {
  const abcNote = AbcNotation.scientificToAbcNotation(note);
  const output = accented ? `"${finger}"L${abcNote}` : `"${finger}"${abcNote}`;
  if ((index + 1) % 4 === 0) {
    return `${output} `;
  }
  return output;
}

function partToAbc({ notes = [], key = 'C', meter = '4/4', resolution = '1/16' }) {
  console.log()
  const rows = chunk(notes, 16);
  const output = `
K:${key}
L:${resolution}
M:${meter}
${rows.map((measure) => measure.map(parseNote).join("")).join("|\n")}||`;
  return output;
}

const DEFAULT_OPTIONS = {
  responsive: "resize",
  add_classes: true,
  staffwidth: 600,
  selectionColor: 'black',
};

export default function useAbc({ part, key, meter, resolution ,options = DEFAULT_OPTIONS }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    renderAbc(ref.current, partToAbc({ notes: part, key, meter, resolution }), options);
  }, [part, key, meter, resolution, options]);

  return ref;
}
