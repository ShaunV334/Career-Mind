import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('ERROR404: Page Not Found')
})

export default app
