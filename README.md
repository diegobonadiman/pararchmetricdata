# ParARCHmetric Data — Site

Site profissional bilíngue (PT/EN) com soluções BIM, portfólio de projetos e contato.
É um site estático (HTML + CSS + JavaScript puros): não precisa de servidor, banco de dados nem instalação.

## Estrutura de pastas

```
pararchmetric-site/
├── index.html            Página principal (estrutura e modelo da página)
├── css/
│   └── style.css         Estilos
├── js/
│   ├── data.js           CONTEÚDO: textos PT/EN, projetos, legendas e caminhos das imagens
│   └── app.js            Monta a página e controla a troca de idioma
├── assets/
│   ├── img/
│   │   ├── logo/
│   │   ├── esmeralda-beach-village/
│   │   ├── selita/
│   │   ├── arcafe/
│   │   ├── gf-farmstead/
│   │   ├── bend-pavilion/
│   │   └── mesquita/     (renders/ e desenhos/ em subpastas)
│   └── video/            Vídeos de demonstração da seção Soluções BIM
├── .nojekyll             Diz ao GitHub Pages para publicar os arquivos como estão
├── .gitignore
└── README.md
```

## Ver o site no seu computador

- **Mais simples:** dê dois cliques em `index.html`.
- **Alternativa (simula um servidor):** abra um terminal na pasta e rode `python3 -m http.server 8000`, depois acesse http://localhost:8000.

Precisa de internet apenas para carregar as fontes (Hanken Grotesk e Inter, do Google Fonts).

## Publicar no GitHub (GitHub Pages) — passo a passo

O GitHub Pages hospeda o site de graça. No plano gratuito, o repositório precisa ser **público**.

### 1. Criar a conta
1. Acesse https://github.com e clique em **Sign up**.
2. Crie a conta e **confirme o e-mail** (o GitHub exige e-mail verificado para publicar).

### 2. Criar o repositório
1. No canto superior direito, clique em **+** → **New repository**.
2. **Repository name:** escolha o nome do endereço do site.
   - `pararchmetric-site` → o site fica em `https://SEU-USUARIO.github.io/pararchmetric-site/`
   - `SEU-USUARIO.github.io` → o site fica em `https://SEU-USUARIO.github.io/` (sem subpasta)
3. Marque **Public**.
4. Não marque "Add a README" (já existe um nesta pasta).
5. Clique em **Create repository**.

### 3. Enviar os arquivos (escolha UMA das opções)

**Opção A: pelo navegador (a mais fácil)**
1. Na página do repositório vazio, clique em **uploading an existing file**.
2. Abra a pasta `pararchmetric-site` no seu computador, selecione **tudo que está dentro dela** (`index.html`, `css`, `js`, `assets`, `README.md`) e arraste para a janela do GitHub. Importante: arraste o conteúdo, não a pasta externa, para que `index.html` fique na raiz do repositório.
3. Aguarde o envio terminar, escreva uma mensagem (por exemplo, "Primeira versão do site") e clique em **Commit changes**.

Limites do envio pelo navegador: 25 MiB por arquivo e 100 arquivos por vez. Este projeto tem cerca de 53 arquivos, todos com menos de 4 MB, então cabe em um único envio. Arquivos que começam com ponto (`.nojekyll`, `.gitignore`) podem ficar ocultos no seu sistema. Se não aparecerem, tudo bem: o site funciona sem eles.

**Opção B: GitHub Desktop (sem terminal)**
1. Instale o GitHub Desktop (https://desktop.github.com) e entre com sua conta.
2. **File → Add local repository** (ou **New repository**), aponte para a pasta `pararchmetric-site`.
3. Clique em **Commit to main** e depois em **Publish repository** (deixe "Keep this code private" desmarcado).

**Opção C: Git no terminal**
```bash
cd pararchmetric-site
git init
git add .
git commit -m "Primeira versão do site"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
git push -u origin main
```
O GitHub vai pedir login. Senhas de conta não funcionam no terminal: use o login pelo navegador ou um token de acesso pessoal.

### 4. Ativar o GitHub Pages
1. No repositório, clique em **Settings** (aba no topo).
2. No menu lateral, em "Code and automation", clique em **Pages**.
3. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
4. Em **Branch**, escolha **main** e a pasta **/ (root)**. Clique em **Save**.
5. Aguarde 1 a 2 minutos e recarregue a página de Pages. O endereço do site aparece no topo ("Your site is live at ...").

Se o site não publicar sozinho, confirme que o e-mail da conta está verificado e que o envio foi feito pela conta dona do repositório.

### 5. Conferir
Abra o endereço e verifique: logo e menu, troca PT/EN, os dois vídeos na seção Soluções BIM, as imagens de cada projeto e os botões de e-mail, LinkedIn e GitHub.

### 6. Atualizar o site depois
Qualquer mudança enviada à branch `main` (pelo navegador, GitHub Desktop ou `git push`) publica automaticamente em 1 a 2 minutos. Se não vir a mudança, force a atualização do navegador (Ctrl+F5 ou Cmd+Shift+R).

### 7. Domínio próprio (opcional)
Em **Settings → Pages → Custom domain**, informe o domínio e siga as instruções de DNS da documentação do GitHub Pages (https://docs.github.com/pages). O registro do domínio é feito em um provedor à parte e normalmente é pago.

## Como editar o site

Tudo que é conteúdo está em `js/data.js`:

- **`TXT`**: todos os textos, em `pt` e `en`.
- **`PROJ`**: a lista de projetos (nome, ano, local, descrição, imagem de abertura `hero`, imagens `figs` e galerias `gals`).
- **`IMG`**: a ligação entre o nome de cada imagem e o arquivo em `assets/img/`.

**Incluir uma imagem em um projeto**
1. Coloque o arquivo na pasta do projeto, por exemplo `assets/img/arcafe/07-nova.webp`.
2. Em `IMG`, acrescente `arc7: 'assets/img/arcafe/07-nova.webp'`.
3. Na lista `figs` do projeto, acrescente `['arc7','s6','',{pt:'Legenda em português',en:'Caption in English'}]`.

Os códigos de largura são `s12` (largura total), `s8`, `s6` (metade) e `s4`. O terceiro valor `'pl'` coloca a imagem sobre um painel claro, indicado para desenhos técnicos e plantas.

**Trocar e-mail ou links:** o e-mail dos botões de contato está em `js/app.js` (constante `MAIL`). O e-mail do rodapé e os links de LinkedIn e GitHub estão em `index.html`; procure por `dxbarq@gmail.com` e `linkedin.com`.

## Observações


- Para a prévia ao compartilhar o link em redes sociais, acrescente em `index.html` uma tag `og:image` com o endereço completo de uma imagem (depois de saber o endereço final do site).
