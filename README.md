# Pagar.me <img src="https://travis-ci.org/jotafeldmann/pagarme.svg">

Refactoring de código para utilizar a [API](https://docs.pagar.me/) da Pagar.me

## Desafio

Basicamente é um projeto bem simples, mas com o código completamente abandonado. A idéia é entender o que este código faz para então consertar e refatorar o que achar necessário. Desde que o código atenda a funcionalidade inicial (que é extremamente básica), sinta-se livre para adicionar ou remover o que quiser dele. Note que este código contém desde pequenos erros até questões extremamente importantes que estão faltando. O objetivo final é entregar um projeto completo, seguro, pronto para produção e de fácil manutenção.

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
- Uso do pattern de composition para criação de objetos (return _public), mantendo o "new" para denotar instanciação de objetos;
- Uso do [PM2](pm2.keymetrics.io): solução completa, open source e gratuita para monitoramento. Para DEV: recarregar alterações e acompanhamento de uso de recursos. Para PROD: uso de clusterização, recursos, API de healthcheck, escalonamento de instâncias, etc;
- Promisses: ótimas para legibilidade, mas têm que se ter cuidado para tratativa de erros. Modifiquei os principais pontos em steps para legibilidade e melhor tratativa de erros;
- Config.js: certas constantes de configuração (porta da API, nome, api_key, url de serviços) foram transferidos para um arquivo config/config.js, afim de evitar "chumbar" tais dados dentro da aplicação;
- API Pagar.me: foi criado um wrapper (common/pagarme). A API_KEY está em config/config.js.
- Dados de mock do pagamento: ainda estão dentro do recurso pokemon;

### Referências:

- [REST API tutorial](http://www.restapitutorial.com/lessons/whatisrest.html)
- [Projetando uma API REST - octo.com](http://blog.octo.com/pt-br/projetando-uma-api-rest/)
- Express.js best practices: [security](https://expressjs.com/en/advanced/best-practice-security.html) and [performance](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Microservices pattern: Gateway](http://microservices.io/patterns/apigateway.html)
- Consultas sobre performance na comunidade de [NodeBR](nodebr.slack.com), [Quora](https://www.quora.com/topic/Node-js) e [Reddit](https://www.reddit.com/r/node/)
- Referências de grandes players com stacks de microserviço, realtime e performáticos: [Uber](https://eng.uber.com/), [Netflix](https://netflix.github.io/), [Spotify](https://labs.spotify.com)
- Promisses: [patterns](https://www.promisejs.org/) e [HowToNode](https://howtonode.org/promises)

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

Após subir a aplicação, acessar [http://localhost:3000](http://localhost:3000) para verificar os recursos disponíveis.

## Licença

[MIT License](https://github.com/jotafeldmann/license/blob/master/LICENSE.md) © Jorge Feldmann (jotafeldmann)
