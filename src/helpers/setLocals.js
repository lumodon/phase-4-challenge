// Sets default locals for ejs views to keep ejs logicless (logic-minimal)

module.exports = (res, next, values) => {
  res.locals = {
    navbutton1: values && values.navbutton1
      ? values.navbutton1
      : {
        text: 'Sign Up',
        link: '/sign-up',
      },
    navbutton2: values && values.navbutton2
      ? values.navbutton2
      : {
        text: 'Sign In',
        link: '/sign-in',
      },
    autofill: process.env.NODE_ENV === 'development'
      ? {
        email: 'ai@gmail.com',
        password: 'foo',
      }
      : {
        email: '',
        password: ''
      },
    title: '',
  }

  next()
}