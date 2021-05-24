# Avaliação de experiência de cliente.

## Stack

OpenApi/Swagger + NodeJS + ExpressJS + Typescrypt + TypeOrm + MySQL + Jest + SuperTest.

## Comandos

### npm i

Instala as dependências.

## Execução na Máquina Local.

As configurações do banco de dados para execução na máquina local se encontram em ormconfig.js.

A estrutura do Banco deve ser gerada automáticamente pela aplicação.

### npm run build

Executa um build. Gera código JavaScript na pasta dist.

### run start

Executa o servidor da aplicação.

### npm run test

Executa o servidor da aplicação no Docker.

### npm run start:build

Efetua o build e executa o servidor da aplicação.

### npm run dev

Executa a aplicação com o Nodemon na máquina local.

### npm run dev:debug

Executa a aplicação com o Nodemon para depuração com live reload na máquina local. É necessário executar o debugger do Visual Studio Code em seguida.


## Execução via Docker-Composer

###  docker-compose -f docker-compose.yml -f docker-compose-test.yml up

Executa os testes automatizados no Docker.

###  docker-compose -f docker-compose.yml -f docker-compose-start.yml up

Executa o servidor da aplicação no Docker.

###  docker-compose -f docker-compose-build-start.yml  

Efetua o build e executa o servidor da aplicação no Docker.

