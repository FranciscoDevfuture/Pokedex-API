# Pokédex: consumo de API com JavaScript

Site estático que consome dados em tempo real da [PokéAPI](https://pokeapi.co/) e monta os cards dos Pokémon dinamicamente com JavaScript.

Projeto da disciplina **Web Development Front-End** · UniFECAF.

**Site publicado:** https://franciscodevfuture.github.io/NOME-DO-REPOSITORIO/

<!-- Dica: tire um print da página, salve em img/preview.png e descomente a linha abaixo -->
<!-- ![Prévia do projeto](img/preview.png) -->

## O que o projeto faz

- Busca uma lista de Pokémon na PokéAPI usando `fetch`.
- Para cada Pokémon, busca os detalhes (imagem, tipos, altura e peso).
- Cria um card para cada um com `createElement` e `appendChild`. O HTML só tem o contêiner vazio.
- Permite favoritar um Pokémon pelo coração (♡ / ♥). Os favoritos ficam salvos no navegador (`localStorage`).
- Mostra uma mensagem de carregamento e uma mensagem de erro se a API não responder.
- Layout responsivo: várias colunas no computador, 2 colunas no celular.

## Requisitos do trabalho atendidos

| Requisito | Como foi atendido |
|---|---|
| HTML + CSS puro, sem frameworks | Apenas `index.html` e `css/style.css` |
| Consumo da API com `fetch` | `fetch` em `js/script.js` (lista + detalhes) |
| Cards criados dinamicamente | `createElement` + `appendChild`; `<div id="cards">` começa vazia |
| Nome, imagem e status em cada card | Nome, arte oficial, tipos, altura e peso |
| Layout com estética coerente ao tema | Visual inspirado na Pokédex: vermelho, azul e fonte Fredoka |
| Responsividade | CSS Grid + `@media` para telas pequenas |

## Tecnologias

- HTML5
- CSS3 (Grid, variáveis CSS, media queries)
- JavaScript (ES6+): `fetch`, `async/await`, `Promise.all`, manipulação do DOM, `localStorage`

## Estrutura de pastas

```
pokedex/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

## Como executar

1. Baixe ou clone o repositório:
   ```bash
   git clone https://github.com/FranciscoDevfuture/NOME-DO-REPOSITORIO.git
   ```
2. Abra o arquivo `index.html` no navegador.

Não precisa instalar nada, nem de servidor. Só é preciso estar conectado à internet para buscar os dados da API.

## Sobre a API

- **API:** [PokéAPI](https://pokeapi.co/) · documentação em [pokeapi.co/docs/v2](https://pokeapi.co/docs/v2)
- **Acesso:** gratuito, sem cadastro e sem chave (token).
- **Endpoints usados:**
  - `GET https://pokeapi.co/api/v2/pokemon?limit=24`: lista com `name` e `url` de cada Pokémon.
  - `GET https://pokeapi.co/api/v2/pokemon/{id}`: detalhes de um Pokémon.
- **Campos usados da resposta:** `name`, `id`, `types[].type.name`, `height`, `weight`, `sprites.other["official-artwork"].front_default`.
- **Limites:** a API não exige autenticação. Ela pede uso responsável, com poucas requisições e reaproveitamento das respostas quando possível.

## Como funciona o JavaScript

1. `carregarPokemons()` chama `fetch` na lista de Pokémon e converte a resposta com `.json()`.
2. Com `Promise.all`, faz uma chamada de detalhes para cada Pokémon ao mesmo tempo.
3. `criarCard()` monta cada card com `createElement` e o insere na página com `appendChild`.
4. Se algo falhar, o `try/catch` mostra uma mensagem para o usuário e registra o erro no console.

## Autor

**Francisco Santo**
Estudante de Engenharia de Software · UniFECAF
GitHub: [@FranciscoDevfuture](https://github.com/FranciscoDevfuture)

## Aviso

Pokémon e os nomes dos personagens são marcas registradas de Nintendo, Game Freak e The Pokémon Company. Este projeto é feito apenas para fins educacionais e não tem fins comerciais.
