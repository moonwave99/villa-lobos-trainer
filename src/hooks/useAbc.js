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

function partToAbc(notes) {
  const rows = chunk(notes, 16);
  const output = `
K:Em
L:1/16
M:4/4
${rows.map((measure) => measure.map(parseNote).join("")).join("|\n")}||`;
  return output;
}

const DEFAULT_OPTIONS = {
  responsive: "resize",
  add_classes: true,
  staffwidth: 600,
};

export default function useAbc({ part, options = DEFAULT_OPTIONS }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    renderAbc(ref.current, partToAbc(part), options);
  }, [part, options]);

  return ref;
}
