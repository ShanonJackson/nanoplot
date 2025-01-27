export const MathUtils = {
  scale: (value: number, max: number, targetMax: number): number => {
    return (value / max) * targetMax;
  }
};
