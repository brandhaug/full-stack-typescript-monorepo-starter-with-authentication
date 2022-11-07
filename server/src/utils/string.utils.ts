export const randomString = (maxLength: number): string => {
  return (Math.random() + 1).toString(36).substring(maxLength)
}
