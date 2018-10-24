export const capitalizeFirst = word => {
  if (word && typeof word === 'string') {
    return word[0].toUpperCase() + word.substring(1);
  }

  return '';
};
