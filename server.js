const fastify = require('fastify')({logger: true})

(async () => {
  // set up swagger
  await fastify.register(require('@fastify/swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
      info: { title: 'fastify-api' },
    },
  })

  // define all your routes
  await fastify.register(require('./routes/items'))
  // then call these
  await fastify.ready()

  fastify.swagger()
})();

const PORT = 5000
const start = async () => {
  try {
    await fastify.listen(PORT)
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

start()