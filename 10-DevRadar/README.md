# DevRadar

## Intro

Projeto realizando durante a semana Omnistack entre os dias 13 e 17 de janeiro de 2020.

Objetivo de iniciar o estudo com as ferramentas de geolocalização e interação em websockets entre plataformas, servidor, web e mobile.

## ScreenShoots

## Instruções de Instalação:

App desenvolvido com as tecnologias NodeJS, ReactJS e React Native.
Necessário a instalação do `yarn` como gerenciador de pacotes.

### Backend:

O projeto foi feito com **_mongodb_** usando **_docker_** local
caso não tenha uma instância docker com mongo db na porta 27017 execute:

```bash
docker run --name mongodb -p 27017:27017 -d -t mongo
```

siga as instruções pelo terminal a dentro da pasta **_/backend_**

- para carregar as dependencias execute:

```bash
yarn
```

- para executar o servidor de desenvolvimento da api execute:

```bash
yarn dev
```

### Frontend:

App React JS. Apenas para cadastro de novos desenvolvedores usando a api do github.

confira o arquivo [api](./frontend/src/services/api.js), pois a baseURL deve apontar para o servidor e porta do backend.

siga as instruções pelo terminal a dentro da pasta **_/frontend_**

- para executar o app web execute:

```bash
yarn
yarn start
```

## Mobile:

App gerado pelo Expo. Em ambiente de desenvolvimento use o App Expo:

[IOS](https://itunes.apple.com/app/apple-store/id982107779)
/ [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www)

siga as instruções pelo terminal a dentro da pasta **_/mobile_**

- para executar o ambiente de desenvolvimento

```bash
yarn
yarn start
```

- Confira o IP do serviço do expo e altere o IP conforme o IP da maquina que está o Backend em execução nos arquivos:

[api](./mobile/src/services/api.js) &
[socket](./mobile/src/services/socket.js)

**O IP e a porta devem ser os mesmos do backend**
