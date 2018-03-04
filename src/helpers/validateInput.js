// HELP I've never heard of this before. How on earth would I solve this then?
// https://spin.atomicobject.com/2011/04/10/javascript-don-t-reassign-your-function-arguments/
// http://eslint.org/docs/rules/no-param-reassign

module.exports = (input, flashContainer) => {
  // PHASE-4-DEVELOPMENT NOTE:
  // Got this regex from http://regexlib.com/REDetails.aspx?regexp_id=26
  if (!input.email || !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(input.email)) { // eslint-disable-line no-useless-escape
    // linting: But it's not a useless escape.
    // In regex dots represent "any character" whats going on?
    flashContainer.flash = 'Error: Email must match standard format. Example: somewhere.something@webdomain.com\n'
    return false
  }
  if (!input.name || input.name.length <= 0) {
    flashContainer.flash = `${flashContainer.flash}Error: Name must be filled out with something\n`
    return false
  }
  return true
}

// TODO: Fix formatting of this helper function. It's not very helpful right now.
