const loader_ai = (loads)=>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res=>res.json())
    .then(data => displayAi(data.data.tools,loads))
}


const displayAi =(dataz ,loads)=>{
     const aiContainer = document.getElementById("container");
     aiContainer.textContent='';

         
        const showAll = document.getElementById("show-all");
        if (loads && dataz.length > 6) {
        dataz = dataz.slice(0, 6);
        showAll.classList.remove("d-none");
        } else {
        showAll.classList.add("d-none");
}
toggleSpinner(true);

       // foreach loop
        dataz.forEach(data =>{ 
        const divAi = document.createElement('div');
        divAi.classList.add('col');
        divAi.innerHTML=
          ` <div class="col" style="height: 500px;">
          <div class="card h-100">
            <img src="${data.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Features</h5>
              <ol class="card-text"><li>${data.features[0]}</li><li>${data.features[1]}</li><li>${data.features[2]}</li></ol>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
            <div>
              <h4>${data.name}</h4>
              <p>${data.published_in}</p>
            
            </div>
            <div>
            <button  onclick="loadAiDetails(${data.id})" type="button" onclick=fetchData(${data.id}) class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#aiModal">
            More
          </button> </div>
            </div>
          </div>
        </div>
    
          `
    aiContainer.appendChild(divAi);    
     });

     toggleSpinner(false);
}

// loader part
const toggleSpinner = (isLoading) => {
    const loaderSection = document.getElementById("loader");
    if (isLoading) {
      loaderSection.classList.remove("d-none");
    } else {
      loaderSection.classList.add("d-none");
    }
  };

// showing all
document.getElementById("show-all-btn").addEventListener("click", function () {
    loader_ai();
  });

const loadAiDetails = id =>{
    if(id>=10){
    url =  `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayDetails(data.data))
    }
    else{
        url =  `https://openapi.programming-hero.com/api/ai/tool/0${id}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayDetails(data.data))

    }
}

const displayDetails = data =>{
  console.log(data);
    console.log(data.features[1].feature_name);
           
             const cardTitle1 = document.getElementById('card-title1');
             cardTitle1.innerText = data.description;

             const price = document.getElementById('f1');
             price.innerText = data.pricing[0].price?data.pricing[0].price:"No Data";
             const price1 = document.getElementById('f2');
             price1.innerText = data.pricing[1].price?data.pricing[1].price:"";
             const price2 = document.getElementById('f3');
             price2.innerText = data.pricing[2].price?data.pricing[2].price:"";
             
            const feature1 = document.getElementById('li1');////baki
            feature1.innerText = data.features ? data.features[1].feature_name:"No Data Found";
            const feature2 = document.getElementById('li2');////baki
            feature2.innerText = data.features ? data.features[2].feature_name:""
            const feature3 = document.getElementById('li3');////baki
            feature3.innerText = data.features ? data.features[2].feature_name:""


            const integration1 = document.getElementById('li4');
            integration1.innerText =data.integrations[0]?data.integrations[0]:"NO Data Found";
            const integration2 = document.getElementById('li5');
            integration2.innerText =data.integrations[1]?data.integrations[1]:"";
            const integration3 = document.getElementById('li6');
            integration3.innerText =data.integrations[2]?data.integrations[2]:"";

            const image = document.getElementById('image');
            image.innerHTML=
            `<img class="img-fluid"src="${data.image_link[0]}"">`

            const title = document.getElementById('card-title2');
            title.innerText = data.input_output_examples[0].input ? data.input_output_examples[0].input:"No data Found";
            const paragraph = document.getElementById('paragraph');
            paragraph.innerText = data.input_output_examples[1].output ? data.input_output_examples[1].output:" ";


            const button = document.getElementById('btn');
            button.innerHTML = `${data.accuracy.score} accuracy`;

}         

loader_ai(6);