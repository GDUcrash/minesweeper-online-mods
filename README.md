# Minesweeper.online Mods
Mods for minesweeper.online

## How to install a mod

### For web version (Tampermonkey)
1. Make sure that the Tampermonkey extension is installed on your browser
2. In this repository, navigate to `mods/[mod name]/tampermonkey/` and copy the contents of the js file
3. Create a new Tampermonkey userscript
4. Paste the code into it and save it

### For app (Electron)
1. Make sure that Node.js is installed on your machine
2. Navigate to `%localappdata%\minesweeper_online_app` or to whatever path you installed the application to.
3. Navigate further to `app-[version number]/resources`
4. Run the following terminal commands:
```bash
npm i -g @electron/asar
npx @electron/asar extract app.asar app.asar.unpacked
```

5. In this repository, navigate to `mods/[mod name]/electron/` and copy the js file to the newly created `app.asar.unpacked` folder
6. Modify the `main.js` file in the the `app.asar.unpacked` folder to include the following code:
```js
require('./mod_[mod name].js'); // replace "[mod name]" with the actual name of the mode. Example: "require('./mod_dyslexic-mode.js`);"
```
7. Save all the files, navigate back to `app-[version number]/resources` and run the following terminal commands:
```bash
npx @electron/asar pack app.asar.unpacked app.asar
```
8. Restart the application


## List of mods

- ### Dyslexic mode
  - **name:** `dyslexic-mode`
  - **description:** Minsweeper.online mod, that highlights cells with matching and overflowing number of adjacent flags.
  - **version:** 0.1.0
  - **author:** gducrash