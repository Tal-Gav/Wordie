export const isHebrew = (buttonStr: string): boolean => {
  const hebrewRegex = /^[\u0590-\u05FF]+$/;
  return hebrewRegex.test(buttonStr);
};

export const reloadPage = (): void => {
  window.location.reload();
};
