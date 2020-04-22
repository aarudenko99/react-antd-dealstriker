export const getNextSlideIndex = (current, direction, mobileQueryMatches, count) => {
  if (direction === 'next') {
    const calcNext = current + (mobileQueryMatches ? 2 : 4);
    if (calcNext === count) return 0;
    if (calcNext > count - (mobileQueryMatches ? 2 : 4)) return count - (mobileQueryMatches ? 2 : 4);
    return calcNext;
  }
  else {
    const calcPrev = current - (mobileQueryMatches ? 2 : 4);
    if (calcPrev === -(mobileQueryMatches ? 2 : 4)) return count - (mobileQueryMatches ? 2 : 4);
    if (calcPrev < 0) return 0;
    return calcPrev;
  }
};
