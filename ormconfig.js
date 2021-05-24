const { UsingJoinColumnOnlyOnOneSideAllowedError } = require("typeorm");


const runningNode =
   process.argv[0].endsWith('//node.exe') ||
   process.argv[0].endsWith('/node.exe') ||
   process.argv[0].endsWith('\\node.exe') ||
   process.argv[0].endsWith('\\node') ||
   process.argv[0].endsWith('node');

const runningTest =
   runningNode &&
   (
      process.argv[1].endsWith('/jest.js') ||
      process.argv[1].endsWith('\\jest.js')
   );

const runningTS = runningNode && process.argv[1].endsWith('.ts');

const runningJS = runningNode && process.argv[1].endsWith('.js');

const runningDockerCompose = process.env.BACKEND_SERVER == 'docker-compose';
const host = runningDockerCompose ? "banco_avaliacao_experiencia" : 'localhost';
const database = 'avaliacao_de_experiencia';
const port = runningDockerCompose ? 3308 : 3306;
const password = runningDockerCompose ? 'root' : 'admin';

const srcConfig = {
   type: "mysql",
   host,
   port,
   username: "root",
   password,
   database,
   synchronize: true,
   logging: false,
   entities: [
      "src/entity/**/*.ts"
   ],
   migrations: [
      "src/migration/**/*.ts"
   ],
   subscribers: [
      "src/subscriber/**/*.ts"
   ],
   cli: {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}

const distConfig = {
   type: "mysql",
   host,
   port,
   username: "root",
   password,
   database,
   synchronize: true,
   logging: false,
   entities: [
      "dist/entity/**/*.js"
   ],
   migrations: [
      "dist/migration/**/*.js"
   ],
   subscribers: [
      "dist/subscriber/**/*.js"
   ],
   cli: {
      entitiesDir: "dist/entity",
      migrationsDir: "dist/migration",
      subscribersDir: "dist/subscriber"
   }
}

console.log('CONFIGURANDO TYPEORM:\n' + JSON.stringify(process.argv, null, 4));
if (runningNode) {
   if (runningTest) {
      console.log('Usando configuração do JestJS/TypeScript');
      module.exports = srcConfig;
   } else if (runningTS) {
      console.log('Usando configuração do TypeScript');
      module.exports = srcConfig;
   } else if (runningJS) {
      console.log('Usando configuração do JavaScript');
      module.exports = distConfig;
   }
   else {
      throw new Error('Configuração não implementado.');
   }
} else {
   throw new Error('Ambiente não implementado;');
}

