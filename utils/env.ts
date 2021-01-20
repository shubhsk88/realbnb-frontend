export const env = (val: string): string => {
  return process.env[val] || "";
};
