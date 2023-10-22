console.log("#tasks2.index.js");
const html = htm.bind(preact.h);
//
MicroModal.init({
    disableScroll: true,
    awaitOpenAnimation: true,
    awaitCloseAnimation: true
});
//
const MODAL_SHOW_NAME ="modal_show_1";
const elem = document.getElementById("root");
let items = [];
//
const PageIndex = {
    /**
     *
     * @param
     *
     * @return
     */ 
    get_list : async function()
    {
        try{
            let ret = [];
            const item = {
                api_key: "",
            }
            const body = JSON.stringify(item);		
            const res = await fetch("/api/tasks/get_list", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},      
                body: body
            });
            const json = await res.json()
            //console.log(json);   
            if (res.status !== 200) {
                console.error("error, status <> 200");
                throw new Error(await res.text());
            }
            if (json.ret !==  "OK") {
                console.error("Error, json.ret <> OK");
                throw new Error("Error, json.ret <> OK");
            }
            ret = json.data;
            return ret;
        } catch (e) {
            console.error("Error, get_list");
            console.error(e);
            throw new Error('Error , get_list');
        }
    },
    /**
     *
     * @param
     *
     * @return
     */     
    displayProc: function(){
        const self = this;
        try {
//console.log("#init=", new Date().toString());
            const li = [];
            items.forEach((item) => {
                let ht = html`
                <div>
                    <a href="/tasks/${item.id}">
                        <h3 class="text-3xl font-bold">${item.title}</h3>
                    </a>
                    <p>ID: ${item.id}, ${item.createdAt}</p>
                    <button id="row_id_${item.id}"
                    class="btn-outline-purple ms-2 my-2">Show</button>
                    <hr class="my-2" />
                </div>
                `;
                li.push(ht);
            });
            preact.render(li, elem);
/*
tyle="display: none;"
*/
            //event
            items.forEach((item) => {
                const button= document.querySelector(`#row_id_${item.id}`);
                button.addEventListener('click', () => {
                    const resultRow = items.filter(target => (target.id === item.id));
//console.log(resultRow);
//alert("title=" + resultRow[0].title);
                    if(resultRow[0]) {
//console.log(resultRow[0]);
                        self.diplayOneRow(resultRow[0]);
/*
                      alert(`
                      title=${resultRow[0].title} ,
                      id=${resultRow[0].id} ,
                      `);
*/
                    }
                }); 
            });
        } catch (e) {
            console.error("Error, displayProc");
            console.error(e);
        }
    },
    /**
     *
     * @param
     *
     * @return
     */  
    addItem : async function()
    {
        try{
            let ret = false;
            let titleValue = "";
            const title = document.querySelector("#title");
            if(title) {
                titleValue = title.value;
            }
            const item = {
                title: titleValue,
                content: "",
            }
//console.log(item);
console.log("title=", titleValue);
            const body = JSON.stringify(item);		
            const res = await fetch("/api/tasks/create", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},      
                body: body
            });
            const json = await res.json()
console.log(json);   
            if (res.status !== 200) {
                console.error("error, status <> 200");
                throw new Error(await res.text());
            }
            if (json.ret !==  "OK") {
                console.error("Error, json.ret <> OK");
                return ret;
            }
            ret = true;
            return ret;
        } catch (e) {
            console.error("Error, addItem");
            console.error(e);
            throw new Error('Error , addItem');
        }
    },     
    /**
     *
     * @param
     *
     * @return
     */
    diplayOneRow: async function(target) {
        try {
            const elem = document.getElementById("modal_show_box");
            let item = target;
console.log( item);
//console.log(item);
            //
            let ht = html`
            <div class="modal micromodal-slide" id=${MODAL_SHOW_NAME} aria-hidden="true">
                <div class="modal__overlay" tabIndex={-1} data-micromodal-close>
                    <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
                    <header class="modal__header">
                        <h1 class="modal__title">${item.title}
                        </h1>
                        <button class="modal__close" aria-label="Close modal" data-micromodal-close>
                        </button>
                    </header>
                    <main class="modal__content">
                        <hr class="my-1" />
                        <div>ID: ${item.id}, <span>${item.createdAt}</span>
                        </div>
                        <hr class="my-1" />
                        Content:<br />
                        <pre class="pre_text">${item.content}</pre>
                    </main>
                    <footer class="modal__footer">
                        <button class="btn-gray" id="${MODAL_SHOW_NAME}_close"
                        >Close</button>
                    </footer>
                    </div>
                </div>
            </div>
            `;
            preact.render(ht, elem);
            MicroModal.show(MODAL_SHOW_NAME);
            //close
            const closeButton = document.getElementById(`${MODAL_SHOW_NAME}_close`);
            if(closeButton) {
                closeButton.addEventListener('click', async () => {
                    console.log("closeButton=");
                    MicroModal.close(MODAL_SHOW_NAME);
                });                
            }
        } catch (e) {
            console.error(e);
        }
    },
    /**
     *
     * @param
     *
     * @return
     */     
    initProc: async function() {
        try {
console.log("#init=", new Date().toString());
            items = await this.get_list();
console.log(items);
            this.displayProc();
            //
            const button = document.querySelector('#save');
            button.addEventListener('click', async () => {
                const result = await this.addItem();
//console.log("result=", result);
                if(result === true) {
                    location.reload();
                }
            });
            /*
            const testButton = document.querySelector('#test_button');
            testButton.addEventListener('click', async () => {
console.log("testButton=");
            });
            */

        } catch (e) {
            console.error("Error, get_list");
            console.error(e);
        }
    },
}
PageIndex.initProc();
