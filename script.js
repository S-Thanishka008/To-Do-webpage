let input=document.getElementById("input");
let add=document.getElementById("add");
let list=document.getElementById("notivalist");
let total=document.getElementById("total");
let color=document.getElementById("color");
let comp=document.getElementById("completed");
let pend=document.getElementById("pending");

let tasks=[];
let colors=["#72b0ab","#bcdddc","#ffedd1","#fdc1b4","#fe9179","#cfb97e","#b89d47","#355e58","#053229","#f7f7f7"];
let index=0;
function update(){
    let all = list.children.length;
    let done=0;
    for (let i = 0; i<all ; i++){
        if (list.children[i].classList.contains("comp")){
            done++;
        }
    }
    total.textContent = all;
    comp.textContent = done;
    pend.textContent = all-done;
}
function render(){
    list.innerHTML="";
    for (let i=0; i< tasks.length;i++){
        let item=tasks[i];
        let li=document.createElement("li");
        li.className="listitem";
        if (item.done){
            li.classList.add("comp");
        }
        let text=document.createElement("span");
        text.className="text";
        text.textContent=item.txt;
        text.onclick=function(){
            item.done=!item.done;
            li.classList.toggle("comp");
            update();
        }
        let del = document.createElement("button");
        del.className="del";
        del.textContent="[x]";
        del.onclick=function(){
            tasks.splice(i,1);
            render();
        }
        li.appendChild(text);
        li.appendChild(del);
        list.appendChild(li);
    }
    update();
}
function addNote(){
    let val=input.value.trim();
    if (val === ""){
        return
    }
    tasks.push({txt:val , done:false});
    input.value="";
    render();
}
function setBG(){
    index = (index + 1) %colors.length;
    document.body.style.backgroundColor = colors[index];
}
add.onclick=addNote;
color.onclick=setBG;
input.addEventListener("keypress",function(e){
    if(e.key==="Enter"){
        addNote();
    }
});