# Pagar.me <img src="https://travis-ci.org/jotafeldmann/pagarme.svg">

Refactoring de código para utilizar a [API](https://docs.pagar.me/) da Pagar.me

## Desafio

Basicamente é um projeto bem simples, mas com o código completamente abandonado. A idéia é entender o que este código faz para então consertar e refatorar o que achar necessário. Desde que o código atenda a funcionalidade inicial (que é extremamente básica), sinta-se livre para adicionar ou remover o que quiser dele. Note que este código contém desde pequenos erros até questões extremamente importantes que estão faltando. O objetivo final é entregar um projeto completo, seguro, pronto para produção e de fácil manutenção.

Não fique preso a apenas refatorar o código, altere o que achar necessário para deixar o projeto em um estado pronto para produção, então escolha querer evoluir o quanto quiser, mas cuidado apenas com over engineering.

## Instalação

### Instalação do Node.js 6.0.0 e do NPM

- Node.js versão 6.0.0
- Instruções de instalação [neste link](https://nodejs.org/en/download/package-manager)
- Ao final, verificar a versão de ambos para confirmar:

```bash
node -v
npm -v
```

- Recomenda-se o uso de [NVM](https://github.com/creationix/nvm) para versionar diferentes versões do Node.js

### Dependências

- Instalação global do componente [PM2](pm2.keymetrics.io) 1.x
```bash
npm install -g pm2
pm2 -v
```

### Instalação do projeto

```bash
git clone https://github.com/jotafeldmann/pagarme
cd pagarme/src
npm install
```

## Inicializando a aplicação

Acessar a pasta com o código:

```bash
cd pagarme/src
```

### Iniciar a aplicação para PROD

Inicializa o PM2, com a aplicação como serviço, utilizando o máximo de núcleos disponíveis, observando mudanças e atualizando, reiniciando caso ocorram falhas

```bash
export NODE_ENV=production
cd pagarme/src
npm start
```

### Parar a aplicação

```bash
npm stop
```

### Iniciar a aplicação para DEV

Inicializa o PM2, com a aplicação como serviço, utilizando 1 núcleo, observando mudanças, parando a cada falha e lançando o log após a inicialização

```bash
npm run dev
```

### Logs da aplicação

```bash
npm run logs
```

## Testes

Acessar a pasta com os testes:

```bash
cd pagarme/testes
```

### Instalação dos testes e dependências

- Instalação global do Mocha

```bash
npm install -g mocha
mocha --version
```

- Instalação das dependências locais dos testes

```bash
cd funcionais
npm install
```

### Iniciar os testes

```bash
cd pagarme/src
npm test
```

## Estudo do código

Seguir os comentários no arquivo [pagarme/src/index.js](https://github.com/jotafeldmann/pagarme/blob/master/src/index.js)

## Licença

[MIT License](https://github.com/jotafeldmann/license/blob/master/LICENSE.md) © Jorge Feldmann (jotafeldmann)
