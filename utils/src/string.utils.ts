export const randomString = (maxLength: number) => {
  return (Math.random() + 1).toString(36).substring(maxLength)
}