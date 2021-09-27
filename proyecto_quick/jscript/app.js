ajax(0,7);

let button = document.getElementById("load");
button.addEventListener("click",ajax);

let checkbox = document.querySelectorAll(".checkbox");
checkbox.onclick = function() {
    
    if (checkbox.check) {
        checkbox.forEach(check => {
            console.log(check.value);
        });
    }
        
}



function ajax(set, limit){
    let xhr = new XMLHttpRequest();
    
    xhr.open("get","https://pokeapi.co/api/v2/pokemon"+'?offset='+set+'&limit='+limit);

    xhr.addEventListener("load", (data) => {

        let dataJson = JSON.parse(data.target.response);
        
        let array = Object.values(dataJson);
        
        let array3 = array[3];
        
        
        for (let i = 1; i < array3.length; i++) {
            let number = [i];
            
            traerPk(number)
        } 

        function traerPk(number) {
            let xhr = new XMLHttpRequest();
            
            xhr.open("get","https://pokeapi.co/api/v2/pokemon/"+number);

            xhr.addEventListener("load", (data) => {

                let dataJson = JSON.parse(data.target.response);
        
                let galeria = document.getElementById("galeria");

                let draw = document.createElement("div");
                draw.classList.add("draw");
                
                let name = document.createElement("h1");
                name.classList.add("name");

                let pokemon = document.createElement("div");
                pokemon.classList.add("pokemon");
                
                galeria.appendChild(pokemon);
                pokemon.appendChild(draw);
                pokemon.appendChild(name);
        
                let img = document.createElement("img");
                img.src = dataJson.sprites.front_default;
                draw.appendChild(img);

                let nombre = dataJson.species.name;

                name.textContent = nombre;

                pokemon.addEventListener("click", ampliarPokemon)
                
                function ampliarPokemon(e){
                    e.preventDefault();

                    let xhr2 = new XMLHttpRequest();

                    xhr2.open("get","https://pokeapi.co/api/v2/pokemon/"+nombre);

                        xhr2.addEventListener("load", (data2) => {

                        let dataJson2 = JSON.parse(data2.target.response);
                                               
                        let body = document.querySelector("body");
                        body.style.backgroundColor = "#B1ACAC";

                        let close = document.getElementById("close");

                        let banner = document.getElementById("banner");
                        banner.classList = "banner";
                    
                        let img = document.getElementById("image");
                        img.src = dataJson2.sprites.front_default;
                        
                        let h1 = document.querySelector(".title");
                        h1.textContent = dataJson2.species.name;

                        // let p = document.querySelector(".paragraph");
                        
                        // let table = document.querySelector("table");
                        
                        // let tr = document.createElement("tr");
                        // let td = document.createElement("td");

                        // let evolution = document.querySelector(".evolution");

                        let detaileType = document.querySelector(".detaileType");
                        let type = document.createElement("div");
                        type.classList.add("type");
                        detaileType.appendChild(type);
                        
                    
                        close.addEventListener("click", (e) =>{
                            e.preventDefault();
                            banner.classList = "hidden";
                            body.removeAttribute("style");
                        })
                        
                    })

                    xhr2.send();
                }

            })

            xhr.send();
        };
    });

    xhr.send();

}
