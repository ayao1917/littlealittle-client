interface AnimateProps {
  timing: Function;
  draw: Function;
  duration: number;
}

export const animate = (props: AnimateProps) => {
  const { timing, draw, duration } = props;
  const start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    const progress = timing(timeFraction);

    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
};

export const linear = (timeFraction: number): number => {
  return timeFraction;
};

export const quad = (timeFraction: number): number => {
  return timeFraction ** 2;
};

export const circ = (timeFraction: number): number => {
  return 1 - Math.sin(Math.acos(timeFraction));
};

export const back = (x: number, timeFraction: number): number => {
  return timeFraction ** 2 * ((x + 1) * timeFraction - x);
};

export const bounce = (timeFraction: number) => {
  for (let a = 0, b = 1; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return -1 * ((11 - 6 * a - 11 * timeFraction) / 4) ** 2 + b ** 2;
    }
  }
};

export const elastic = (x: number, timeFraction: number): number => {
  return (
    2 ** (10 * (timeFraction - 1)) *
    Math.cos(((20 * Math.PI * x) / 3) * timeFraction)
  );
};

export const makeEaseOut = (timing: Function) => {
  return (timeFraction: number) => {
    return 1 - timing(1 - timeFraction);
  };
};

export const makeEaseInOut = (timing: Function) => {
  return (timeFraction: number) => {
    return timeFraction < 0.5
      ? timing(2 * timeFraction) / 2
      : (2 - timing(2 * (1 - timeFraction))) / 2;
  };
};
