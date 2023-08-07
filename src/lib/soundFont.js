export function getSoundFontInfo(instrument = "bright_acoustic_piano") {
  const urls = "ABCDEFG".split("").reduce(
    (memo, x) => ({
      ...memo,
      ...Array.from({ length: 5 }, (_, i) => i).reduce((nemo, i) => ({
        ...nemo,
        [`${x}${i + 1}`]: `${x}${i + 1}.mp3`,
      })),
    }),
    {}
  );
  return {
    baseUrl: `https://paulrosen.github.io/midi-js-soundfonts/MusyngKite/${instrument}-mp3/`,
    urls,
  };
}
