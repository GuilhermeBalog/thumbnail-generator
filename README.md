# Image generation

Gerador de imagens thumbnail com Node.js

![Exemplo](thumbnail.png)

Esse projeto surgiu para gerar imagens automaticamente para usar no [meu blog](http://blog.guilhermebalog.ga/), inspirado pelo serviço [OG Image](https://og-image.now.sh/), mas com uma implementação inspirada pelo [Flavio Copes](https://flaviocopes.com/canvas-node-generate-image/)

## Como instalar?

Você vai precisar do [git](https://git-scm.com/), do [Node.js](https://nodejs.org/en/) instalado e, se quiser o [Yarn](https://yarnpkg.com/)

- Primeiro clone o repositório e entre na pasta criada

    ```bash
    git clone https://github.com/GuilhermeBalog/repo
    cd repo
    ```

- Instale as dependências

    ```bash
    npm install
    # ou
    yarn install
    ```

- Rode o projeto!

    ```bash
    npm start
    #ou
    yarn start
    ```

Isso vai gerar uma thumbnail num arquivo chamado `thumbnail.png`

Para configurar as cores, o nome do rodapé e a foto, basta editar o arquivo `config.json`:

```json
{
  "authorName": "Guilherme Balog Gardino",
  "avatarUrl": "https://avatars0.githubusercontent.com/u/38947601?v=4",
  "backgroundColor": "#00bcd4",
  "titleColor": "#fff",
  "footerBackgroundColor": "#673ab7",
  "authorNameColor": "#fff"
}
```

Para mudar o título, é só alterar a chamada da função `generateThumbnailAndSave`
