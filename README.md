# DesafioVAGAS | Orientações Desenvolvedor(a) Front-end VAGAS.com

## O que esperamos de você

Ao final do teste, esperamos receber um código que você acredite ser de qualidade e que possa
ser executado e evoluído facilmente. A ​organização da solução e a ​apresentação visual estão
entre os aspectos avaliados por nós, e claro, sua ​criatividade​ :)

## Como será o teste

1. No final deste documento, você encontrará um ​desafio. Leia-o atentamente;
2. Elabore a solução proposta em ​7 dias​ (hoje + 7 dias);
3. Nos envie seu teste;
Através de um repositório ​git privado no bitbucket. Basta nos enviar a URL do repositório
e a permissão de acesso para o time: ​vagasfrontend

## Vamos começar? Mãos à obra

​Briefing: ​Todos os anos, a equipe de marketing organiza um evento para os clientes da
empresa Fictícia. O hotsite dessa edição já está pronto, mas é preciso criar uma página com os
vídeos dos anos anteriores e essa demanda chegou para seu time.

Os designers da área já fizeram um layout bonitão (link abaixo) e agora o job entrou para sua
fila. O que você precisa fazer é desenvolver uma página implementando o layout proposto e
usando a API V3 do Youtube para listar os vídeos de algum canal (à sua escolha).

Seu job será​ ​desenvolver uma aplicação que liste vídeos do Youtube, e incluímos ao lado um
layout que você deverá estruturar. Utilize um pré-processador de CSS, um Framework JS de sua
escolha e, caso queira, um Framework de CSS também.

Ah! A aplicação deverá trabalhar com a ​API do YouTube​ para buscar os dados de algum canal, ser
responsiva e ter funcionalidades como: capacidade de listar os vídeos do canal com miniaturas,
busca e reprodução. Lembrando que o canal de base para o teste deve ser escolhido por você.

## Critérios de aceite

* Pré-processador de CSS (SASS, LESS,
Stylus...);
* Ser desenvolvido usando algum dos
Frameworks ou Libraries a seguir:
React.js​, ​Vue.js​, ​Ember.js​, ​Angular​ ou
Javascript Vanilla​.
* API do YouTube​;
* Responsividade;
* Listar, buscar e reproduzir os vídeos do
canal. (Observe atentamente as imagens
do Protótipo);

## Será muito legal se encontrarmos também  

* Buildar os seus assets (Webpack, Gulp,
Grunt...)
* Testes automatizados
* CSS modularizado

A descrição original em pdf e o mockups desse desafio também se encontram neste repositório

## Instruções para instalação

instruções para instalação do nvm, tome como referência a página
<https://github.com/nvm-sh/nvm#install--update-script>

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash
```

## Instalação da versão do node utilizada

```shell
nvm install 10.16.3
```

## Instruções de execução

Crie um arquivo .env.development.local com uma variavel de ambiente chamada REACT_APP_YOUTUBE_KEY que contenha a sua chave para a api do google

```shell
REACT_APP_YOUTUBE_KEY=<chave>
```

```shell
npm install && npm run start
```

Acessar <http://localhost:3000/> no browser

O desafio a seguir encontra-se incompleto
