export const copyTopClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {}
};
