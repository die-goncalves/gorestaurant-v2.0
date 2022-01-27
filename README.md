<h1 align="center">
    <img alt="gorestaurant" title="upfi" src="assets/gorestaurant-logo.svg" width="200px" />
</h1>

<!-- TABLE OF CONTENTS -->

<h5 align="center"> 
<a href="#sobre">Sobre</a>
   •   <a href="#tecnologias">Tecnologias</a> 
   •   <a href="#funcionalidades">Funcionalidades</a> 
   •   <a href="#instalação">Instalação</a> 
   •   <a href="#layout">Layout</a> 
   •   <a href="#visão-do-projeto">Visão do projeto</a>
   •   <a href="#agradecimento">Agradecimento</a> 
   •   <a href="#licença">Licença</a>     
   •   <a href="#autor">Autor</a> 
</h5>

## Sobre

<h4>GoRestaurant é um serviço de entrega de alimentos online</h4>

Este projeto foi desenvolvido com a finalidade de aprimorar minhas habilidades no desenvolvimento frontend, apliquei a maioria dos conhecimentos adquiridos durante minha participação no bootcamp Ignite da RocketSeat. Um dos projetos realizados no bootcamp se chamava GoRestaurant que pode ser visto [aqui](https://github.com/die-goncalves/ignite-reactjs-modulo02-desafio02-refactoring) e em busca de um *upgrade* me deparei com os sites [Deliveroo](https://deliveroo.co.uk/), [Ubereats](https://www.ubereats.com/) e [Swiggy](https://www.swiggy.com/) que são serviços de entrega de alimentos online e possuem entre si semelhanças, então baseando-se neles resolvi transformar o projeto em um serviço de entrega de alimentos online.

No projeto o usuário poderá fazer uma conta, indicar seu endereço de entrega, escolher um restaurante próximo dele, pedir os alimentos que quiser,  efetuar a compra dos pedidos, avaliar os alimentos e acompanhar o status do pagamento.

As imagens das comidas e dos restaurantes podem ser encontradas em [Unsplash](https://unsplash.com/) e [Pexels](https://www.pexels.com/). As imagens que estão presentes nos créditos para referenciar [Deliveroo](https://deliveroo.co.uk/), [Ubereats](https://www.ubereats.com/) e [Swiggy](https://www.swiggy.com/) podem ser encontradas em seus *websites*.

## Tecnologias

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [Chakra-UI](https://chakra-ui.com/)
- [Supabase](https://supabase.io/)
- [Stripe](https://stripe.com/br)
- [Mapbox](https://www.mapbox.com/)
- [Axios](https://www.npmjs.com/package/axios)
- [Nookies](https://www.npmjs.com/package/nookies)
- [React Query](https://react-query.tanstack.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://www.npmjs.com/package/yup)
- [Zxcvbn](https://www.npmjs.com/package/zxcvbn)
- [React Hot Toast](https://react-hot-toast.com/)
- [Embla Carousel](https://www.embla-carousel.com/)
- [Ngeohash](https://www.npmjs.com/package/ngeohash)
- [Scroll-into-view](https://www.npmjs.com/package/scroll-into-view)
- [Lodash.debounce](https://www.npmjs.com/package/lodash.debounce)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Hamburger-react](https://www.npmjs.com/package/hamburger-react)
- [React-simple-typewriter](https://www.npmjs.com/package/react-simple-typewriter)

> Veja o arquivo  [package.json](/package.json)

###### Sobre as tecnologias
Listagem das principais tecnologias e porque foram utilizadas
- O que foi trabalhado com o ***Next.js*** no projeto?
    - As duas formas de pré-renderização de páginas, *Static Generation* e *Server-side Rendering*, 
    - Páginas com rotas dinâmicas, 
    - *API Routes*, 
    - Importação dinâmica de componentes, 
    - *next/link* para ter o funcionamento de *single page application*(SPA),  
    - *next/image* para obter maior performance na manipulação de imagens, 
    - *next/router* para fazer os redirecionamentos entre as páginas e auxiliar na construção de link ativo em um componente de navegação.
- Utilização do ***React Hook Form*** para a contrução dos formulários de entrar e cadastrar, além de utilizar o ***yup*** para valiadação dos dados e ***zxcvbn*** para estimar a força da senha.
- Utilização do ***Supabase*** para trabalhar com banco de dados e autenticação/autorização.
- O emprego do ***Chakra ui*** no projeto facilita o processo de desenvolvimento de interfaces.
- Utilização do ***Stripe*** que permite lidar com pagamentos e acompanhar o status do fluxo de um pagamento usando *webhooks*. 
- Dos recursos do ***Mapbox***, utilizar a biblioteca *Mapbox GL JS* para exibir mapas *Mapbox* no navegador e adicionar interatividade do usuário, converter coordenadas geográficas em características do local, como endereço e região, com *Mapbox Geocoding API* e calcular tempo e distância entre dois pontos no mapa com *Mapbox Directions API* .
- Com o ***React Query*** foi possível deixar a listagem de restaurantes mais performática.
- Utilização do ***Embla Carousel*** para fazer o *slide* de imagens
- Utilização do ***React Hot Toast*** para emitir notificações de sucesso/erro/informativo.
- Utilização do ***Nookies*** para manipular tanto do lado do cliente e do servidor os cookies criados para armazenar itens no carrinho e taxa de envio dependendo da localização do usuário. O cookie `HttpOnly` <ins>sb:token</ins> gerado ao fazer a autenticação do usuário são inacessíveis para esta biblioteca e para a [API JavaScript Document.cookie](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Cookies#cookies_secure_e_httponly), é possível excluí-lo usando [supabase auth signOut](https://supabase.com/docs/reference/javascript/auth-signout).
- Com o ***TypeScript*** podemos escrever códigos mais corretos e organizados. 

## Funcionalidades

- Página inicial
    - [x] O usuário poderá se cadastrar, excluir sua conta e iniciar/encerrar sessão na aplicação;
    - [x] Autocomplete ao digitar endereço;
    - [x] Obtenção do endereço, região, coordenadas e geohash no clique do usuário no mapa;
    - [x] Utilização de geohash ao redirecionar a localização obtida em uma página para outra;
        - [x] Obtenção das informações de localização a partir do geohash.
    - [x] Visualização de todos os restaurantes em um mapa;
        - [x] O clique em um restaurante no mapa mostra um pop-up com todas as informações relevantes do restaurante.
    - [X] Ao usuário que já realizou compras permitir a visualização dos endereços de entrega que já utilizou, esses endereços serão *links* que ao serem clicados ocorre o redirecionamento para a página de restaurantes de acordo com a região daquele endereço. 
- Página dos restaurantes
    - [x] Criação de sidebar onde o usuário poderá ordenar e filtrar os restaurantes, optar se quer entrega ou retirada e permitir a troca de localização;
        - A filtragem ocorre sobre o preço de entrega se o usuário optou por entrega, e categorias de comida.
        - A ordenação ocorre de modo decrescente por avaliação geral de cada restaurante ou por tempo de entrega.
    - [x] Listagem de todos os restaurantes baseados na filtragem e na região do endereço de entrega;
    - [X] Cada filtro escolhido será mostrado acima da lista de restaurantes permitindo ao usuário um melhor gerenciamento da filtragem;
    - [X] Cada card de restaurante conterá seu nome, sua imagem, algumas das categorias de comidas, sua avaliação geral, tempo de entrega ou retirada, e preço de entrega.
- Página de um restaurante específico
    - [x] Navegação entre página inicial e página de listagem de retaurantes com base na região do especificado;
    - [X] Visualização do nome, imagem, descrição, telefone e algumas categorias de suas comidas disponíveis do restaurante;
    - [x] Horário de funcionamento e status de aberto/fechado;
        - O restaurante com status fechado estará lógicamente impossibilitado de receber pedidos.
    - [x] Permitir a troca de localização do usuário apenas para a região do restaurante;
    - [x] Mostrar localização do restaurante em um mapa não interagível;
    - [x] Mostrar todas as comidas disponíveis, dividas por seção e com navegação entre as seções;
    - [x] Adicionar/Remover comidas ao carrinho
    - [x] No carrinho, permitir também adicionar/remover as comidas além de permitir a criação de uma sessão de checkout para realizar o pagamento.
    - [x] A sessão de checkout será uma sessão do Stripe. Ao realizar o pagamento o usuário é redirecionado para a página inicial.
- Páginas do painel de controle
    - Apenas usuários assinados podem acessar essas páginas.
        - [x] Página de configurações que permite a exclusão de conta;
        - [x] Página de avaliações que permite a avaliação de comidas quando um pagamento foi concluído;
        - [x] Página de pagamentos que permite visualizar o status de todos os pagamentos realizados.
- Página sobre o projeto e os créditos
    - Todos usuários podem ver, sendo assinado ou não.
    - [x] Breve descrição sobre o projeto e os créditos para os autores dos ícones utilizados e para os *websites* utilizados para a construção deste.

## Instalação

- ### **Pré-requisitos**
  - É **necessário** possuir o **[Git](https://git-scm.com/)** instalado e configurado no computador.
  - É **necessário** ter um gerenciador de pacotes seja o **[NPM](https://www.npmjs.com/)** ou **[Yarn](https://yarnpkg.com/)**.
  - É **necessário** ter uma conta no mapbox.
  - É **necessário** ter uma conta no stripe.
  - É **necessário** ter uma conta no supabase.

- ### **Próximo passo**
1. Faça um clone deste repositório:
   ```sh
   $ git clone https://github.com/die-goncalves/gorestaurant-v2.0.git
   ```

2. Instale as depêndencias:
   ```sh
   # Entre no diretório do repositório clonado
   $ cd gorestaurant-v2.0
   # Instale as dependências do projeto.
   $ yarn #ou $ npm install
   ```

3. Crie na raiz do projeto o arquivo **.env.local**.<br/>
   ```sh
   # .env.local
   # STRIPE
    STRIPE_WEBHOOK_SECRET=
    STRIPE_API_KEY=
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
    STRIPE_SUCCESS_URL=
    STRIPE_CANCEL_URL=
    # MAPBOX
    NEXT_PUBLIC_MAPBOX_TOKEN=
    # SUPABASE
    NEXT_PUBLIC_SUPABASE_URL=
    NEXT_PUBLIC_SUPABASE_ANON_KEY=
    NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_SECRET_KEY=
   ```
   
   <p align="center" style="font-size:1.25rem">Stripe</p>
    
    - Crie uma conta Stripe se não tiver;
    - Crie uma empresa;
    - Utilize no modo teste;
    - Adicione as seguintes comidas deste [arquivo](/assets/foods.txt), clicando no link de navegação `Produtos`. Em detalhes do produto coloque apenas o nome, em detalhes do preço coloque o preço e clique em `uma única vez`
        - Copie o id do produto e do preço de cada comida adicionada.
    - Obtenção das chaves
    1 - Ir no link de navegação `Desenvolvedores` -> ir na opção `Chaves da API` na sidebar:
        **NEXT_PUBLIC_STRIPE_PUBLIC_KEY** - Chave publicável
        **STRIPE_API_KEY** - Chave secreta
    2 - Como estamos em modo de desenvolvimento usaremos a [Stripe CLI](https://stripe.com/docs/stripe-cli) para ouvir eventos do fluxo de pagamentos. Siga [este tutorial](https://stripe.com/docs/stripe-cli/webhooks) para encaminhar os eventos para sua aplicação. Você receberá a chave **STRIPE_WEBHOOK_SECRET** quando executar `stripe listen --forward-to localhost:3000/stripe_webhooks`.
    3 - Estas variáveis você define: **STRIPE_SUCCESS_URL** é a rota da página que o usuário é redirecionado ao realizar uma compra. E **STRIPE_CANCEL_URL** é a rota da página que o usuário é redirecionado ao cancelar uma compra.

    <br/>
    <p align="center" style="font-size:1.25rem">Mapbox</p>
    
    - Crie uma conta Mapbox se não tiver;
    - Obtenção da chave:
        - Vá em account e você verá o token, copie em **NEXT_PUBLIC_MAPBOX_TOKEN**

    <br/>
    <p align="center" style="font-size:1.25rem">Supabase</p>

    - Crie uma conta Supabase se não tiver;
    - Crie um projeto;
    - Copie o conteúdo deste arquivo <a href="/assets/databaseTables.sql">Criação de tabelas</a>, vá até `SQL Editor` na sidebar, clique em `New query` e agora cole e execute. Agora você tem todas as tabelas;
    - Para preencher os dados disponibilizei este [arquivo](/assets/databaseData.sql) onde temos todas as inserções necessárias, mas você terá que fazer o seguinte: para cada comida em `insert into foods` coloque o id do produto e do preço copiado anteriormente no lugar onde está escrito `id_produto` e `id_preco`. Agora vá até `SQL Editor` na sidebar, clique em `New query`, cole e execute. Pronto! Agora cada comida adicionada no Stripe possui referência no banco de dados.
    - Obtenção das chaves:
        - Para preencher as chaves do supabase siga este [guia](https://supabase.io/docs/guides/with-nextjs#get-the-api-keys).
    
    <br />
    <div>
    <p align="center" style="font-size:1.25rem;line-height:1.25rem">Banco de dados</p>
    <div>
    <p align="center">Diagrama entidade relacionamento</p>
    <img src="assets\ImageEntityRelationshipDiagram.jpg" alt="ImageEntityRelationshipDiagram">
    </div>
    </div>
4. Execute a aplicação
    ```sh
    # Em um terminal
    $ yarn dev #ou $ npm run dev
    # A aplicação inciará na porta:3000 - acesse <http://localhost:3000>
    ```
    ```sh
    # Em outro terminal
    $ stripe listen --forward-to localhost:3000/stripe_webhooks
    # Lembrando que a chave STRIPE_WEBHOOK_SECRET tem que ser a mesma que aparece ao executar este comando.
    ```

## Layout

<div>
    <h4 align="center">Página Inicial</h4>
    <img src="assets\homepage.jpg" alt="Página inicial">
    <img src="assets\mapAllRestaurants.jpg" alt="Mapa com todos restaurantes">
    <img src="assets\searchLocation.jpg" alt="Buscar endereço">
    <h4 align="center">Página de restaurantes</h4>
    <img src="assets\restaurantsPage.jpg" alt="Página de restaurantes">
    <img src="assets\filterInRestaurantsPage.jpg" alt="Filtro na página de retaurantes">
    <img src="/assets/changeAddress.jpg" alt="Mudança de endereço">
    <h4 align="center">Página de restaurante específico</h4>
    <img src="assets\restaurantPage.jpg" alt="Página de restaurante específico">
    <img src="assets\navigationInRestaurantPage.jpg" alt="Navegação entre categorias">
    <img src="/assets/locationRestaurant.jpg" alt="Localização do restaurante">
    <img src="/assets/operatingHours.jpg" alt="Horário de operação de um restaurante">
    <img src="/assets/changeAddressInRegion.jpg" alt="Mudança de endereço na região do restaurante">
    <img src="/assets/changeAddressInRegionRestrict.jpg" alt="Região restrita ao restaurante">
    <h4 align="center">Páginas do painel de controle</h4>
    <img src="/assets/account.jpg" alt="Conta">
    <img src="/assets/rating.jpg" alt="Avaliações">
    <img src="/assets/orders.jpg" alt="Pedidos">
</div>

## Visão do projeto

<img src="/assets/projectFunctioning.gif" alt="Funcionamento do projeto">

## Agradecimento

<table width="100%" align="center">
    <tr>
        <th>
            <a href="https://rocketseat.com.br/">
                <img width="150" height="150" src="https://avatars.githubusercontent.com/u/28929274?s=200&v=4">
                <br /><sub><b>Rocketseat</b></sub>
            </a>
        </th>
        <th>
            <img width="150" height="150" src="/assets/ignite-logo.svg">
            <br /><sub><b>Ignite</b></sub>
        </th>
        <th>
            <a href="https://github.com/diego3g">
                <img width="150" height="150" src="https://avatars.githubusercontent.com/u/2254731?s=400&u=4fcc8ca9672eeb41ea800271831b7c687bc17054&v=4">
                <br /><sub><b>diego3g (Diego Fernandes)</b></sub>
            </a>
        </th>
    </tr>
</table>

## Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Autor

Feito por Diego Gonçalves, contato:

[![Badge](https://img.shields.io/static/v1?label=Linkedin&message=Diego%20Gonçalves&color=208BEE&style=flat-square&logo=linkedin&link=https://www.linkedin.com/in/diego-goncalves1990)](https://www.linkedin.com/in/diego-goncalves1990)
[![Badge](https://img.shields.io/static/v1?label=Gmail&message=die.goncalves1990@gmail.com&color=EA5134&style=flat-square&logo=gmail&link=mailto:die.goncalves1990@gmail.com)](mailto:die.goncalves1990@gmail.com)