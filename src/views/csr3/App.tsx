import type { FC } from 'hono/jsx'
import { html } from 'hono/html'
import {Layout} from '../layout';

let itemId = 100;
//
export const Csr3: FC<{ items: any[] }> = (props: { items: any[] }) => {
  const timeStamp = Date.now();
  return (
    <Layout>
      <div>
        <div id="root"></div>
        {html`<script src="https://cdn.jsdelivr.net/npm/preact@10.5.13/dist/preact.umd.js"></script>`} 
        {html`<script src="https://cdn.jsdelivr.net/npm/babel-standalone@6.26.0/babel.min.js"></script>`} 
        {html`<script type="text/babel">
          const { h, render } = preact;

          // JSXを使用してPreactコンポーネントを定義
          function App() {
              return (
                  <div>
                      <h1>Hello from Preact with JSX and Babel</h1>
                      <p>This is a Preact component with JSX and Babel.</p>
                  </div>
              );
          }
      
          // コンポーネントをレンダリング
          render(<App />, document.getElementById('root'));
        </script>`}       
      </div>
    </Layout>
  )
}

/*
*/