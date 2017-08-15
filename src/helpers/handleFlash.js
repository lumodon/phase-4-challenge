module.exports = (session) => {
  const flashMessage = session.flash
  session.flash = ''
  return flashMessage
}