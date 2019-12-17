const { authenticate } = require('@feathersjs/authentication').hooks

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      hook => {
        hook.data = Object.assign({}, hook.data, { user_id: hook.params.user.id })
        return hook
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
