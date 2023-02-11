
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./rjsf-tailwind.cjs.production.min.js')
} else {
  module.exports = require('./rjsf-tailwind.cjs.development.js')
}
