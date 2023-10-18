import type { FC } from 'hono/jsx'
import { html } from 'hono/html'
import {Layout} from '../layout';
//
export const Test5: FC<{ items: any[] }> = (props: { items: any[] }) => {
  const timeStamp = Date.now();
  // 
  return (
    <Layout title="Test_index">
      <div>
        <h1 class="text-4xl font-bold">Welcome , Preact2 </h1>
        <hr class="my-2" />
        <div id="root"></div>
      </div>
      {/* JS */}
      {html`<script src="/js/preact2/index.js?${timeStamp}"></script>`}
  </Layout>
  )
}

