# App scafolding <img src="https://api.travis-ci.org/jotafeldmann/app-scaffolding.svg">

Este é o exemplo de código que eu, [Jorge Feldmann](https://github.com/jotafeldmann), julgo o ideal para iniciar um projeto para aplicação Node.js. O código é baseado em refactoring de código para utilizar a [API](https://docs.pagar.me/) da Pagar.me

## Desafio

A idéia é entender o que o código original (docs/codigo-original) faz para então consertar e refatorar o que achar necessário. Desde que o código atenda a funcionalidade inicial (que é extremamente básica), sinta-se livre para adicionar ou remover o que quiser dele. Note que este código contém desde pequenos erros até questões extremamente importantes que estão faltando. O objetivo final é entregar um projeto completo, seguro, pronto para produção e de fácil manutenção.

Não fique preso a apenas refatorar o código, altere o que achar necessário para deixar o projeto em um estado pronto para produção, então escolha querer evoluir o quanto quiser, mas cuidado apenas com over engineering.

## Análise do desafio

Sobre  over engineering: quando se trata de um teste com foco em produção, creio que a prioridade seja demonstrar o máximo de conhecimento, focando em conceitos como DRY, KISS, separação de contextos, modularização, legibilidade, para demonstrar tais recursos.

A solução aqui proposta é um exemplo de scafolding que engloba conceitos de segurança, performance, escalabilidade e agilidade no desenvolvimento de novos recursos, bem como uso de wrappers para componentes.

### O que foi alterado:

- Rotas: para a listagem e criação, a rota é a mesma (/pokemons), mas com os verbos GET e PUT (idempotente) respectivamente. Para o processo de compra (/pokemons/buy) o recurso de compra (/buy) foi transformado num nível abaixo do recurso principal, ao contrário da original (/buy-pokemons);
- Segurança: uso do middleware [Helmet](https://www.npmjs.com/package/helmet);
- Modularização das rotas (routes/routes.js) e dos recursos (/app/pokemons), ao invés de manter tudo isso atrelado;
- Performance: conversão de [console.log (que afunila o processamento)](https://nodejs.org/api/console.html#console_asynchronous_vs_synchronous_consoles) para um chaveamento de logs em arquivo para produção ou console.log em dev, componente Bunyan
- Uso de steps e init() para mostrar o passo-a-passo das funções (leia o código de baixo para cima)
- Uso do [Revealing Pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript), com composição, para criação de objetos (return _public), mantendo o "new" para denotar instanciação de objetos
- Uso do [PM2](pm2.keymetrics.io): solução completa, open source e gratuita para monitoramento. Para DEV: recarregar alterações e acompanhamento de uso de recursos. Para PROD: uso de clusterização, recursos, API de healthcheck, escalonamento de instâncias, etc
- Promisses: ótimas para legibilidade, mas têm que se ter [cuidado para tratativa de erros](http://www.2ality.com/2016/04/unhandled-rejections.html). Modifiquei os principais pontos em steps para legibilidade e melhor tratativa de erros
- Config.js: certas constantes de configuração (porta da API, nome, api_key, url de serviços) foram transferidos para um arquivo config/config.js, afim de evitar "chumbar" tais dados dentro da aplicação
- API Pagar.me: foi criado um wrapper (common/pagarme). A API_KEY está em config/config.js.
- Dados de mock do pagamento: ainda estão dentro do recurso pokemon
- Codificação literária: nomes de funções representam o que elas fazem. Ficam longas, mas evitam comentários
- Assinatura de funções e métodos possuem o tipo esperado (intQuantity, objResponse), baseado na [notação de código  húngara](https://en.wikipedia.org/wiki/Hungarian_notation)
- Design patterns de Node.js [elementares](https://blog.risingstack.com/fundamental-node-js-design-patterns/) e [avançados](https://www.nodejsdesignpatterns.com/)
- Uso de features disponíveis do [Node.js ES6](https://nodejs.org/dist/latest-v6.x/docs/api/)
- Uso de debug com [node-inspector](https://github.com/node-inspector/node-inspector)
- Performance sistêmica: [guia Node.js para profiling](https://nodejs.org/en/docs/guides/simple-profiling/)
- Performance de I/O HTTP: uso de stress test com [siege](https://www.joedog.org/siege-manual/) -b -c100 -t 60S http://localhost:3000
- Testes de API baseados em [testes funcionais da StrongLoop](https://strongloop.com/strongblog/nodejs-testing-documenting-apis-mocha-acquit/)
- Integração contínua com [Travis.CI](https://travis-ci.org/jotafeldmann/pagarme)
- Organização de pastas [baseada em comportamentos](http://stackoverflow.com/questions/5178334/folder-structure-for-a-node-js-project)
- Uso do [NPM como ferramental de build, perfis, etc](https://www.digitalocean.com/community/tutorials/how-to-use-npm-to-build-and-publish-node-js-packages-on-a-linux-server)
- Transformação do modelo de dados baseado em Sequelize.js para um arquivo separado, baseado em componentes de model. Podemos usar Sequelize, Mongoose, Bookshelf, ou até mesmo [Joi do Happi.js](https://github.com/hapijs/joi), apenas mudando o componente de factory de models
- Autenticação: usaria [JWT (JSON Web Tokens) ](https://jwt.io/), [Passport.js](http://passportjs.org/), com o Redis ou MemCache
- IDE: Sublime, com templates, snippets e meu [gerador de código](https://github.com/jotafeldmann/code-generator). Mas usaria um Web Storm com muita alegria ;)

### Referências:

- [REST API tutorial](http://www.restapitutorial.com/lessons/whatisrest.html)
- [Projetando uma API REST - octo.com](http://blog.octo.com/pt-br/projetando-uma-api-rest/)
- Express.js best practices: [security](https://expressjs.com/en/advanced/best-practice-security.html) and [performance](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Microservices pattern: Gateway](http://microservices.io/patterns/apigateway.html)
- Consultas sobre performance na comunidade de [NodeBR](nodebr.slack.com), [Quora](https://www.quora.com/topic/Node-js) e [Reddit](https://www.reddit.com/r/node/)
- Referências de grandes players com stacks de microserviço, realtime e performáticos: [Uber](https://eng.uber.com/), [Netflix](https://netflix.github.io/), [Spotify](https://labs.spotify.com)
- Promisses: [patterns](https://www.promisejs.org/) e [HowToNode](https://howtonode.org/promises)
- Padrões de codificação idiomáticos [Node.js](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/) prevalecem sobre padrões [JS (Douglas Crockford)](http://javascript.crockford.com/code.html) e [Google](https://google.github.io/styleguide/javascriptguide.xml)

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
git clone https://github.com/jotafeldmann/app-scaffolding
cd app-scaffolding/src
npm install
```

## Inicializando a aplicação

Acessar a pasta com o código:

```bash
cd app-scaffolding/src
```

### Iniciar a aplicação para PROD

Inicializa o PM2, com a aplicação como serviço, utilizando o máximo de núcleos disponíveis, observando mudanças e atualizando, reiniciando caso ocorram falhas

```bash
export NODE_ENV=production
cd app-scaffolding/src
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
cd app-scaffolding/testes
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
cd app-scaffolding/src
npm test
```

## Estudo do código

Após subir a aplicação, acessar [http://localhost:3000](http://localhost:3000) para verificar os recursos disponíveis.

## Licença

[MIT License](https://github.com/jotafeldmann/license/blob/master/LICENSE.md) © Jorge Feldmann (jotafeldmann)
