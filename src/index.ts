import * as Koa from 'koa';

const app = new Koa()

app.use(async ctx => {
  console.log(ctx)
})

app.listen(3001)