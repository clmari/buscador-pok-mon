const botao = document.querySelector("#btn-buscar")
const input = document.querySelector("#input-nome")
const resultado = document.querySelector("#resultado")

botao.addEventListener("click", async function(){
   
    const nome = input.value

    try {
        const resposta = await fetch("https://pokeapi.co/api/v2/pokemon/" + nome)
        const dados = await resposta.json()

            const raridade = dados.held_items[0]?.version_details[0]?.rarity ?? "sem item"
            const habilidade = dados.abilities[0]?.ability?.name ?? "desconhecida"

        resultado.style.backgroundColor = "white"
        resultado.innerHTML = `
            <h2>${dados.name}</h2>
            <img src="${dados.sprites.front_default}">
            <p>Altura: ${dados.height}</p>
            <p>Peso: ${dados.weight}</p>
            <p>Habilidade: ${habilidade}</p>
            <p>Raridade: ${raridade}</p>
        `
    } catch (erro) {
        resultado.style.backgroundColor = "transparent"
        resultado.innerHTML = "<p>Pokémon não encontrado!</p>"
    }
})

input.addEventListener("keydown", function(evento) {
    if (evento.key === "Enter") {
        botao.click()
    }
})
