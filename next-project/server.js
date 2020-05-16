const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const server = new Koa()

const router = new Router()

app.prepare().then(() => {

  router.get('/a/:id', async (ctx) => {
    const id = ctx.params.id
    console.log(id)
    await handle(ctx.req, ctx.res, {
      pathname: '/a',
      query: { id }
    })
    ctx.respond = false
  })

  server.use(router.routes())

  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
    // next()
  })

  server.listen(3000, () => {
    console.log('koa server listening on 3000')
  })
})

