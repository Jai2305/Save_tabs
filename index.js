// function func()
// {
//     console.log("akmsdnaWSSSS") ;
// }
//other way of handeling event listner is more professionaly
let inputBtn= document.getElementById("input-btn")  //u can also use var inputbtn = ...
let myLeads =[]
let myNames= []

const inputEl = document.getElementById("input-el") // variables declared with const are immutable
const nameEl = document.getElementById("name-el")

let ulEl = document.getElementById("ul-el")
let deleteBtn = document.getElementById("delete-btn")
let saveTabBtn = document.getElementById("save-tab-btn")

let data=JSON.parse(localStorage.getItem("data"))
let names=JSON.parse(localStorage.getItem("name"))
if(data)   // well if data is not null
{
    myLeads=data
    myNames=names
    
    render()
}

//localStorage.setItem("myLeads","something")  // localStorage have a sorta global scope u can access it using correct script
// console.log(localStorage.getItem("myLeads"))
//the thing about local storage is that it takes string , so if u wanna store anything (array in our case) u have to first convert it into string

saveTabBtn.addEventListener("click",function(){
    let name_url=nameEl.value
    nameEl.value=""
    chrome.tabs.query({active:true, currentWindow:true},function(tabs){    //we are taking the help of chrome api to access the tab on which we r currently on in the currently opened window 
      
        if(!myLeads.includes(tabs[0].url))
        {
            myLeads.push(tabs[0].url)
            localStorage.setItem("data",JSON.stringify(myLeads))
            if(name_url)
            {
                myNames.push(name_url)
                localStorage.setItem("name",JSON.stringify(myNames))
            }
            else
            {
                myNames.push(tabs[0].url)
                localStorage.setItem("name",JSON.stringify(myNames))
            }
            render()
        }    
        
    })
    
})
deleteBtn.addEventListener("dblclick",function(){
    localStorage.removeItem("data")
    localStorage.removeItem("name")
    location.reload(true)    // alternatively u can clear the items and then call the render 
})


inputBtn.addEventListener("click",function(){
    
    // myLeads += "herro.com"  // u can also use myLeads.push("value")
    //hover over it
    if(!myLeads.includes(inputEl.value))
    {
        myLeads.push(inputEl.value)
        
        if(nameEl.value)
        {
            myNames.push(nameEl.value)
        }
        // myNames.push(inputEl.value)
        else
        {
            myNames.push(inputEl.value)
        }
        
    }
    // inputEl was id of our input ele in DOM when user write something 
    // the value can be accessed by  .value  attr and in this  function we are saving the stuff written
    // by user in input box
    render()
    // JSON.stringify will convert anything inside it into string now we can store it into local storage
    localStorage.setItem("data",JSON.stringify(myLeads))
    localStorage.setItem("name",JSON.stringify(myNames))
    inputEl.value=""  //clear the placeholder 
    nameEl.value=""
    // console.log(localStorage.getItem("data"))

})

function render()
{
    ulEl.innerHTML = ""  // emptying the inner html so the list doesnot stay there and updated with regards to new one 

    for (let i =0;i< myLeads.length; i++)    
    {
        // ulEl.innerHTML += "<li><a target='_blank' href='"+myLeads[i]+"'>"+myLeads[i]+"</a></li>" 
        // instead we can use back tick ( ` ) to smoothly render strings and ${var_name} to access variables and ds
        ulEl.innerHTML += 
        `
            <li><a target='_blank' href= '${myLeads[i]}' name='${myLeads[i]}'>${myNames[i]}</a></li>
            <button id='${myLeads[i]}' class='remove-a-link' >REMOVE</button>
        `
        //^ these are called template strings
    }
    hovera()
    delfunc()
}
function hovera()
{
    let lis = document.getElementsByTagName("a")
    let j=0
    for(let i=0;i<lis.length;i++)
    {
        lis[i].addEventListener("mouseover",function(){
            let url=lis[i].getAttribute("href")
            // let val=lis[i].innerHTML
            // console.log(val)
            showDel(url)
        })
    }
}
function showDel(deal)
{   
    if(document.getElementById(deal))
    {   
        document.getElementById(deal).style.display="block"
        setTimeout(function(){
            if(document.getElementById(deal))
            {
                document.getElementById(deal).style.display="none"
            }       
        }, 1500);
    }
    
}


function delfunc()
{
    let lis = document.getElementsByClassName("remove-a-link")
    let j=0
    for(let i=0;i<lis.length;i++)
    {
        lis[i].addEventListener("click",function(){
            let id=lis[i].getAttribute("id")
            DelTab(id)
        })
    }
}
function DelTab(url)
{
    console.log(url)
    const index = myLeads.indexOf(url)
    myLeads.splice(index, 1)
    myNames.splice(index, 1)
    localStorage.setItem("data",JSON.stringify(myLeads))
    localStorage.setItem("name",JSON.stringify(myNames))
    render()
}


 // ulEl.textContent += myLeads[i]+" "    //.textContent takes out the text Content from the element 
    //by .textContent u cannot change the inner HTML of an element , 

//.innerHTML is such a great fxn that u can even create html elements with in an element whose id u have grabbed
// eg: ulEl.innerHTML =" <button></button> " will create a button inside that element

// alternatvely 
//inside for loop:
// const li =document.createElement("li")  will create li 
// li.textContent=myLeads[i]   will add the value from the arrray
//ulEl.append(li)  will add the element to the specified element here ulEl

// something to note- Falsy values :
// false
//0
//""
// null 
// undefined
// NaN
// to check if a value is truthy or falsy 
//console.log(Boolean(value))


