const animate = function(options = {}) {
  const { from, to, duration, cb, ease } = Object.assign(
    { from: 0, to: 1, duration: 1000, cb: () => {}, ease: t => t },
    options
  );
  const delta = to - from;

  let time;

  return new Promise(resolve => {
    const tick = d => {
      if (!time) {
        time = d;
      }

      const f = (d - time) / duration;

      if (f >= 1) {
        cb(to);
        resolve();
        return;
      }

      cb(from + ease(f) * delta);

      window.requestAnimationFrame(tick);
    };
    window.requestAnimationFrame ? window.requestAnimationFrame(tick) : cb(to);
  });
};

export default animate;
