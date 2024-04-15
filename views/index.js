async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", 
      mode: "cors",
      cache: "no-cache", 
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",

      },
      redirect: "follow",
      referrerPolicy: "no-referrer", 
      body: data, 
    });
    return response.json(); 
  }
  

        
  const out = document.getElementById('output');
  const submit = document.getElementById('submit');
  submit.addEventListener('onclick', (e)=>{
      const query = document.getElementById('text').value;
      console.log(value);
      if(query){
        postData("https://visually-fancy-moccasin.ngrok-free.app/api/charak", { "msg": query }).then((data) => {
            console.log(data); 
          });
      }
      else{
          console.log('Query not given');
      }
  })