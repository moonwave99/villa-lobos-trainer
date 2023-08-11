import { memo } from "react";
import { isEqual } from "lodash";
import useAbc from "./hooks/useAbc";

function MusicScore({ part, partKey, id = "score" }) {
  const ref = useAbc({ part, key: partKey });
  return (
    <div className="music-score-wrapper">
      <div className="music-score" ref={ref} id={id}></div>
    </div>
  );
}

export default memo(MusicScore, (a, b) => {
  return isEqual(a.part, b.part);
});
