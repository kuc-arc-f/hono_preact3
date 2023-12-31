import type { FC } from 'hono/jsx'
import { html } from 'hono/html'
import {Layout} from '../../layout';
//
export const TaskShow: FC<{ item: any, id: number }> = (props: { item: any, id: number }) => {
console.log("#taskShow");
console.log(props.item);
    const timeStamp = Date.now();
    return (
    <Layout title="TaskShow">
        <div>
            <a href="/tasks" class="btn-outline-purple ms-2 my-2">back</a>
            <hr class="my-4" />
            <h1 class="text-4xl font-bold">{props.item.title}</h1>
            <p>ID: {props.item.id}
            , {props.item.createdAt}
            </p>

            <hr class="my-2" />
            <div id="root"></div>
            {html`
            <script>
            let TaskItemId = ${props.item.id};
            </script>`
            } 
            <button id="btn_delete" class="btn-red ms-2 my-2">Delete</button>
            {html`<script src="/js/tasks/delete.js?${timeStamp}"></script>`}
        </div>
    </Layout>
    )
}
/*
{html`<script type="text/babel" src="/js/tasks/show.js?${timeStamp}"></script>`}  
*/
