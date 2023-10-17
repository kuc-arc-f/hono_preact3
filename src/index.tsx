import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import type { FC } from 'hono/jsx'
import { serveStatic } from 'hono/cloudflare-workers'
//
import type { Database } from '@cloudflare/d1'
import {Layout} from './views/layout';
//api-router
import testRouter from './routes/test';
import taskRouter from './routes/tasks';
import postRouter from './routes/posts';

import {Csr1} from './views/csr1/App';
import {Csr2} from './views/csr2/App';
import {Csr3} from './views/csr3/App';
//
import {TestIndex} from './views/test_index/App';
import {Test4} from './views/preact1/App';
//
interface Env {
  DB: Database
}
//
export const app = new Hono()
//basicAuth
app.use(
  "/admin/*",
  basicAuth({
    username: "test",
    password: "1111",
  })
);
//serveStatic
app.get('/static/*', serveStatic({ root: './' }))
app.get('/js/*', serveStatic({ root: './' }))
app.get('/styles/*', serveStatic({ root: './' }))
//
const Top: FC<{ messages: string[] }> = (props: { messages: string[] }) => {
  return (
    <Layout title="Welcome Top">
      <h1 class="text-4xl font-bold">Hello Hono!</h1>
      <hr />
      <ul>
        {props.messages.map((message) => {
          return (<li class="my-2" >{message}!!</li>)
        })}
      </ul>
    </Layout>
  )
}
/**
* route
*/
app.get('/', (c) => {
  const messages = ['Good Morning', 'Good Evening', 'Good Night']
  return c.html(<Top messages={messages} />)
});
/*
app.get('/test', async (c) => { 
  return c.html(<Test />); 
});
*/
const testItems = [
  {id: 1, title: "title_1"},
  {id: 2, title: "title_2"},
  {id: 3, title: "title_3"},
];
/* test_index */
app.get('/test_index', async (c) => { 
  return c.html(<TestIndex items={testItems} />);
});
/* CSR */
app.get('/csr1', async (c) => { 
  return c.html(<Csr1 items={[]} />);
});
app.get('/csr2', async (c) => { 
//  const items = await testRouter.get_list(c, c.env.DB);
  return c.html(<Csr2 items={[]} />);
});
app.get('/csr3', async (c) => { 
    return c.html(<Csr3 items={[]} />);
});
app.get('/preact1', async (c) => { 
  return c.html(<Test4 items={[]} />);
});
//

/**
* API
*/
app.post('/api/test/create', async (c) => { 
  const body = await c.req.json();
  const resulte = await testRouter.create(body, c.env.DB);
  return c.json(resulte);
});
app.post('/api/test/delete', async (c) => { 
  const body = await c.req.json();
  const resulte = await testRouter.delete(body, c.env.DB);
  return c.json(resulte);
});
/* tasks */
app.post('/api/tasks/get_list', async (c) => { 
  const resulte = await taskRouter.get_list(c, c.env.DB);
  return c.json({ret: "OK", data: resulte});
});
app.post('/api/tasks/get', async (c) => { 
  const body = await c.req.json();
  const resulte = await taskRouter.get(body, c, c.env.DB);
  return c.json({ret: "OK", data: resulte});
});
app.post('/api/tasks/create', async (c) => { 
  const body = await c.req.json();
  const resulte = await taskRouter.create(body, c.env.DB);
  return c.json(resulte);
});
app.post('/api/tasks/delete', async (c) => { 
  const body = await c.req.json();
  const resulte = await taskRouter.delete(body, c.env.DB);
  return c.json(resulte);
});
/* posts */
app.post('/api/posts/get_list', async (c) => { 
  const resulte = await postRouter.get_list(c, c.env.DB);
  return c.json({ret: "OK", data: resulte});
});
app.post('/api/posts/create', async (c) => { 
  const body = await c.req.json();
  const resulte = await postRouter.create(body, c.env.DB);
  return c.json(resulte);
});
app.post('/api/posts/get', async (c) => { 
  const body = await c.req.json();
  const resulte = await postRouter.get(body, c, c.env.DB);
console.log(resulte);
  return c.json({ret: "OK", data: resulte});
});
app.post('/api/posts/delete', async (c) => { 
  const body = await c.req.json();
  const resulte = await postRouter.delete(body, c.env.DB);
  return c.json(resulte);
});
//
app.post('/api/csr2/get_list', async (c) => { 
  const body = await c.req.json();
  const resulte = await testRouter.get_list(c, c.env.DB);
  return c.json({ret: "OK", data: resulte});
});

export default app;
/*
*/
