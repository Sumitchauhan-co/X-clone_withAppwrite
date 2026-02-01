# For production

### In vite.config.js

```js
base: "/x-clone/"
```

## If not set gh-pages

### Install gh-pages as a dev dependency

```js
npm i --save-dev gh-pages
```

### Change in package.json

```json
"scripts": {
    "build":"vite build",
    "deploy":"gh-pages -d dist",
}
```

## Run

```js
npm run build
npm run deploy
```

### Enable pages in github

+ Repo -> Settings -> Pages
+ Sources : gh-pages branch
+ Folder : /(root)
+ Save

### Link : https://sumitchauhan-co.github.io/x-clone_appwrite/
