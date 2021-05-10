export const filterSearch = (rating, high, low, avail, position, value) => {
  return {
    rating: rating || '',
    experience_greater: high || '',
    experience_less: low || '',
    time: avail?.length ? [avail] : [],
    position: position || '',
    search: value,
    rating_needed: true,
  };
};
