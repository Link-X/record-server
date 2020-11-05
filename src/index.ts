import * as Koa from 'koa';

const app = new Koa()

app.use(async (ctx, ctq) => {
  console.log(ctx)
})

console.log(1234)

app.listen(3001)