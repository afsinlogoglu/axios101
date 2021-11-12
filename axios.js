const getBtn = document.getElementById("get");
const postBtn = document.getElementById("post");
const putBtn = document.getElementById("put");
const requestBtn = document.getElementById("request");
const headersBtn = document.getElementById("headers");
const deletBtn = document.getElementById("delete");

getBtn.addEventListener("click", getData);
postBtn.addEventListener("click", postData);
putBtn.addEventListener("click", putData);
requestBtn.addEventListener("click", requestData);
headersBtn.addEventListener("click", headersData);
deletBtn.addEventListener("click", deleteData);

function getData() {
  axios({
    method: "get",
    url: "https://jsonplaceholder.typicode.com/users",
    params: {
      _limit: 2,
    },
  })
    .then((response) => writeResult(response))
    .catch((error) => {
      console.log(error);
    })
    .then(() => console.log("Request Finished"));
}

function postData() {
  axios
    .post("https://jsonplaceholder.typicode.com/posts", {
      title: "new title",
      body: "new body",
      userId: 99,
    })
    .then((response) => writeResult(response))
    .catch((error) => console.log(error));
}

function putData() {
  axios
    .patch("https://jsonplaceholder.typicode.com/posts/1", {
      body: JSON.stringify({
        title: "Patched Title",
      }),
    })
    .then((response) => writeResult(response))
    .catch((error) => console.log(error));
}
function deleteData() {
  axios
    .delete("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => writeResult(response))
    .catch((error) => console.log("Error" + error));
}

function requestData() {
  //     axios.all([
  //         axios.get('https://jsonplaceholder.typicode.com/users')
  //     ,
  //     axios.get('https://jsonplaceholder.typicode.com/posts')

  // ]).then(response =>{
  //     console.log(response[0])
  //     console.log(response[1])
  // })

  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/users"),
      axios.get("https://jsonplaceholder.typicode.com/posts"),
    ])
    .then(
      axios.spread((users, posts) => {
        writeResult(users);
        writeResult(posts);
      })
    );
}
//interceptors************************
// axios.interceptors.response.use(response =>{
//     if(response.status === 200){
//         response.status =999
//     }
//     return response
// },error =>{
//     return Promise.reject(error)
// })

//default auth
axios.defaults.headers.common["X-Auth-Token"] = "apiTokenValue";

const axiosObject = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    newAuth: "newAuthValueCool",
  },
});

function headersData() {
  //using default axios object
  axiosObject.get("/users").then((response) => {
    console.log("Default axios object used");
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "yourTokenValue",
    },
  };
  axios
    .post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        title: "new title",
        body: "new body",
        userId: 99,
      },
      config
    )
    .then((response) => writeResult(response))
    .catch((error) => console.log(error));
}


function writeResult(response) {
  document.querySelector(".result").innerHTML = `
    <article class="message is-link">
    <div class="message-header">
      <p>Result</p>
      <button class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body">
    <pre>Status : ${JSON.stringify(response.status, null, 3)}</pre>
    <pre>${JSON.stringify(response.data, null, 3)}</pre>
    <pre>${JSON.stringify(response.headers, null, 3)}</pre>
    <pre>${JSON.stringify(response.config, null, 3)}</pre>
    </div>
  </article>
    `;
}
