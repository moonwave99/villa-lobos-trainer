import { memo } from "react";
import { isEqual } from "lodash";
import useAbc from "./hooks/useAbc";

function MusicScore({ part, id = "score" }) {
  const ref = useAbc({ part });
  return (
    <div className="music-score-wrapper">
      <div className="music-score" ref={ref} id={id}></div>
    </div>
  );
}

export default memo(MusicScore, (a, b) => {
  return isEqual(a.part, b.part);
});