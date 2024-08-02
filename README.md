
# Projeto Trademap

## Visão Geral do Projeto

Trademap é uma aplicação web desenvolvida utilizando CodeIgniter para o backend e Vue.js para o frontend. A aplicação visualiza dados de vendas de vários telefones em um formato de treemap. Os usuários podem adicionar, editar, excluir e ordenar os dados dos telefones com base em vendas ou porcentagens de crescimento.

## Funcionalidades

- **Visualização**: Visualização de dados de vendas de telefones em treemap.
- **Operações CRUD**: Os usuários podem adicionar, editar e excluir dados de telefones.
- **Ordenação**: Os dados podem ser ordenados por vendas ou crescimento, com alternância entre ordem crescente e decrescente.

## Estrutura do Projeto

```
trademap/
├── app/
│   ├── Controllers/
│   │   └── PhoneController.php
│   ├── Models/
│   │   └── PhoneModel.php
│   ├── Views/
│   │   └── welcome_message.php
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── scripts.js
├── writable/
│   └── ... (outras pastas de escrita)
├── tests/
│   └── ... (pastas de teste)
├── .env
├── composer.json
├── index.php
└── README.md
```

## Instruções de Configuração

### Pré-requisitos

- PHP >= 7.3
- Composer
- MySQL ou MariaDB
- Node.js e npm

### Download

1. Clone o repositório:

    ```bash
    git clone https://github.com/glaiton-silva/trademap-ci.git
    cd trademap-ci
    ```

### Configuração do Banco de Dados

1. Crie um novo banco de dados MySQL:

```sql
CREATE DATABASE trademap;
```

2. Atualize o arquivo `.env` com suas credenciais do banco de dados:

```plaintext
database.default.hostname = localhost
database.default.database = trademap
database.default.username = seu_usuario
database.default.password = sua_senha
database.default.DBDriver = MySQLi
```

### Executando Migrations

1. Execute as migrations para criar as tabelas necessárias no banco de dados:

```bash
php spark migrate
```

### Configuração do Frontend

1. Navegue até o diretório public:

```bash
cd public
```

2. Instale os pacotes npm necessários:

```bash
npm install
```

3. Compile os assets do frontend:

```bash
npm run build
```

### Executando a Aplicação

1. Inicie o servidor de desenvolvimento PHP:

```bash
php spark serve
```

2. Abra seu navegador e navegue até `http://localhost:8080`.

## Uso

### Adicionando um Telefone

- Clique no botão "Adicionar Telefone".
- Preencha os detalhes do telefone e clique em "Salvar".

### Editando um Telefone

- Clique em um telefone no treemap.
- Atualize os detalhes do telefone no modal e clique em "Salvar".

### Excluindo um Telefone

- Clique em um telefone no treemap.
- Clique no botão "Excluir" no modal.

### Ordenando Dados

- Clique em "Ordenar por Vendas" para ordenar os dados por vendas.
- Clique novamente para alternar entre ordem crescente e decrescente.
- Clique em "Ordenar por Crescimento" para ordenar os dados por crescimento.
- Clique novamente para alternar entre ordem crescente e decrescente.

## Licença

Este projeto está licenciado sob a Licença MIT.

---

Este README fornece uma visão geral detalhada do projeto Trademap, incluindo instruções de configuração, diretrizes de uso e funcionalidades. Para qualquer assistência adicional, consulte a documentação do projeto ou entre em contato com os mantenedores do projeto.
