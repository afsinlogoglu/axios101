const getBtn = document.getElementById('get')
const postBtn = document.getElementById('post')
const putBtn = document.getElementById('put')
const requestBtn = document.getElementById('request')
const headersBtn = document.getElementById('headers')
const errorBtn = document.getElementById('error')
const deletBtn = document.getElementById('delete')

getBtn.addEventListener('click',getData)
postBtn.addEventListener('click',postData)
putBtn.addEventListener('click',putData)
requestBtn.addEventListener('click',requestData)
headersBtn.addEventListener('click',headersData)
errorBtn.addEventListener('click',errorData)
deletBtn.addEventListener('click', deleteData)

function getData(){
    axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/users',
        params:{
            _limit:2
        }
    }).then(response => writeResult(response))
        .catch(error =>{console.log(error)})
        .then(()=> console.log("Request Finished"))
}

function postData(){
    axios.post('https://jsonplaceholder.typicode.com/posts',{
        title: 'new title',
        body: 'new body',
        userId: 99
    })
    .then((response)=> writeResult(response))
    .catch(error => console.log(error))
}

function putData(){
    axios.patch('https://jsonplaceholder.typicode.com/posts/1',{
        body:JSON.stringify({
            title: 'Patched Title'
        })
    })
    .then((response)=> writeResult(response))
    .catch((error)=> console.log(error))
}
function deleteData(){
    axios.delete('https://jsonplaceholder.typicode.com/posts/1')
    .then((response)=>  writeResult(response))
    .catch((error)=> console.log("Error"+error))
}

 function requestData(){
//     axios.all([
//         axios.get('https://jsonplaceholder.typicode.com/users')
//     ,
//     axios.get('https://jsonplaceholder.typicode.com/posts')
    
// ]).then(response =>{
//     console.log(response[0])
//     console.log(response[1])
// })

axios.all([
axios.get('https://jsonplaceholder.typicode.com/users'),
axios.get('https://jsonplaceholder.typicode.com/posts')
])
.then(axios.spread((users,posts)=>{
    writeResult(users)
    writeResult(posts)
}))
}

function headersData(){
    console.log("Data Header")
}

function errorData(){
    console.log("Error Handling")
}



function writeResult(response){
    document.querySelector(".result").innerHTML=`
    <article class="message is-link">
    <div class="message-header">
      <p>Result</p>
      <button class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body">
    <pre>Status : ${JSON.stringify(response.status,null,3)}</pre>
    <pre>${JSON.stringify(response.data,null,3)}</pre>
    <pre>${JSON.stringify(response.headers,null,3)}</pre>
    <pre>${JSON.stringify(response.config,null,3)}</pre>
    </div>
  </article>
    `
}



