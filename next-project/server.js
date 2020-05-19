const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');
const session = require('koa-session')
const Redis = require('ioredis')

const RedisSessionStore = require('./server/session-store')


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// redis client
const redis = new Redis()

app.prepare().then(() => {

  const server = new Koa()
  const router = new Router()

  server.keys = ['jingjing develop Github App']
  const SESSION_CONFIG = {
    key: 'jid',
    store: new RedisSessionStore(redis),
  }

  // server.use(async (ctx, next) => {
  //   if (ctx.cookies.get('jid')) {
  //     ctx.session = {}
  //   }
  //   await next()

  // })

  server.use(session(SESSION_CONFIG, server))

  server.use(async (ctx, next) => {
    // if (!ctx.session.user) {
    //   ctx.session.user = {
    //     name: 'jingdada',
    //     age: 20
    //   }
    // } else {
    console.log('session is:', ctx.session)
    // }
    await next()
  })

  router.get('/a/:id', async (ctx) => {
    const id = ctx.params.id
    console.log(id)
    await handle(ctx.req, ctx.res, {
      pathname: '/a',
      query: { id }
    })
    ctx.respond = false
  })

  // set session
  router.get('/set/user', async (ctx) => {
    // ctx.respond = false
    ctx.session.user = {
      name: 'jingdada',
      age: 20
    }
    ctx.body = 'set session success'
  })

  // destory session
  router.get('/destory/user', async (ctx) => {
    // ctx.respond = false
    ctx.session.user = null
    ctx.body = 'destory session success'
  })

  server.use(router.routes())

  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
    await next()
  })

  server.listen(3000, () => {
    console.log('koa server listening on 3000')
  })
})

