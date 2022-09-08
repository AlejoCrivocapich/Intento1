const dirección ="https://images-api.nasa.gov/search?q=";


let array = [];



function mostrar(){
    
        let htmlContentToAppend = "";
        for(let i = 0; i < array.length; i++){
            let elemento = array[i];
          htmlContentToAppend += `
          <div class="row">
          <div class="col-3">
              <img src="${elemento.links[0].href}"  class="img-thumbnail">
          </div>
          <div class="col">
              <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">${elemento.data[0].title}</h4>
              </div>
              <p class="mb-1">${elemento.data[0].description}</p>
              <p class="mb-1">${elemento.data[0].date_created}</p>
          </div>
      </div>
      `
                
}
document.getElementById('contenedor').innerHTML = htmlContentToAppend;
}



let getJSONData = (url)=>{
    let result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}

document.addEventListener('DOMContentLoaded', function(){
document.getElementById('btnBuscar').addEventListener("click", function(){
    let ruta = document.getElementById('inputBuscar').value;
getJSONData(dirección + ruta).then(function(resultObj){
 if(resultObj.status === "ok"){
    array = resultObj.data.collection.items;
    mostrar();

 }

})
})
})