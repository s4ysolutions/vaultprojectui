export const match2path = (match, location) => {
  const candidate = location.pathname.slice(match.path.length);
  if (candidate.length === 0) return '/';
  if (candidate[candidate.length - 1] === '/') return candidate.slice(0, -1);
  return candidate;
};
