
const API_URL = "https://pokeapi.co/api/v2/pokemon";
const LIMITE = 24;

const containerCards = document.getElementById("cards");
const statusEl = document.getElementById("status");

// Favoritos salvos no navegador
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

// Carregar os Pokémon da API
async function carregarPokemons() {
  // Ativa a mensagem e a animação de carregamento
  statusEl.textContent = "Carregando Pokémon...";
  statusEl.classList.add("carregando");

  try {
    // Primeira chamada: buscar a lista de Pokémon
    const resposta = await fetch(`${API_URL}?limit=${LIMITE}`);

    if (!resposta.ok) {
      throw new Error("Erro na API: " + resposta.status);
    }

    const dados = await resposta.json();

    // Segunda chamada: buscar os detalhes de cada Pokémon
    const detalhes = await Promise.all(
      dados.results.map(async (pokemon) => {
        const respostaPokemon = await fetch(pokemon.url);

        if (!respostaPokemon.ok) {
          throw new Error("Erro ao buscar: " + pokemon.name);
        }

        return respostaPokemon.json();
      })
    );

    // Remove a animação quando os dados chegam
    statusEl.classList.remove("carregando");
    statusEl.textContent = "";

    // Cria os cartões na tela
    detalhes.forEach(criarCard);

  } catch (erro) {
    // Remove a animação se ocorrer algum erro
    statusEl.classList.remove("carregando");

    statusEl.textContent =
      "Não foi possível carregar os Pokémon. Tente novamente.";

    console.error("Erro ao carregar os Pokémon:", erro);
  }
}

// Criar o cartão de cada Pokémon
function criarCard(pokemon) {
  const card = document.createElement("article");
  card.className = "card";//classe Card

  // Nome do Pokémon
  const titulo = document.createElement("h2");
  titulo.textContent = pokemon.name;

  // Botão de favoritos
  const coracao = document.createElement("button");
  coracao.className = "favorito";
  coracao.setAttribute(
    "aria-label",
    "Favoritar " + pokemon.name
  );

  atualizarCoracao(coracao, pokemon.id);

  coracao.addEventListener("click", () => {
    alternarFavorito(pokemon.id);
    atualizarCoracao(coracao, pokemon.id);
  });

  // Imagem do Pokémon
  const imagem = document.createElement("img");

  imagem.src =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  imagem.alt = pokemon.name;
  imagem.loading = "lazy";

  // Tipos do Pokémon
  const tipos = document.createElement("p");

  tipos.textContent =
    "Tipo: " +
    pokemon.types.map((item) => item.type.name).join(", ");

  // Altura e peso
  const medidas = document.createElement("p");

  medidas.textContent =
    `Altura: ${pokemon.height / 10} m · ` +
    `Peso: ${pokemon.weight / 10} kg`;

  // Adiciona os elementos ao cartão
  card.appendChild(titulo);
  card.appendChild(coracao);
  card.appendChild(imagem);
  card.appendChild(tipos);
  card.appendChild(medidas);

  // Adiciona o cartão à página
  containerCards.appendChild(card);
}

// Atualizar o símbolo e a cor do coração
function atualizarCoracao(botao, id) {
  const ehFavorito = favoritos.includes(id);

  botao.textContent = ehFavorito ? "♥" : "♡";

  if (ehFavorito) {
    botao.classList.add("ativo");
  } else {
    botao.classList.remove("ativo");
  }
}

// Adicionar ou remover um Pokémon dos favoritos
function alternarFavorito(id) {
  favoritos = favoritos.includes(id)
    ? favoritos.filter((favorito) => favorito !== id)
    : [...favoritos, id];

  localStorage.setItem(
    "favoritos",
    JSON.stringify(favoritos)
  );
}

// Iniciar a Pokédex
carregarPokemons();
