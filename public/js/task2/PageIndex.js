console.log("#task2.PageIndex.js=");
//
MicroModal.init({
    disableScroll: true,
    awaitOpenAnimation: true,
    awaitCloseAnimation: true
});
//
//const MODAL_SHOW_NAME ="modal_show_1";
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
            //event
            items.forEach((item) => {
                const button= document.querySelector(`#row_id_${item.id}`);
                button.addEventListener('click', () => {
                    const resultRow = items.filter(target => (target.id === item.id));
                    if(resultRow[0]) {
//console.log(resultRow[0]);
                        ModalShow.diplayOneRow(resultRow[0]);
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
    initProc: async function() {
        try {
console.log("#init=", new Date().toString());
            items = await this.get_list();
console.log(items);
            this.displayProc();
            //
            const button = document.querySelector('#save');
            button.addEventListener('click', async () => {
                const result = await PageCreate.addItem();
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
