# Electron Script boilerplate

Boilerplate to build GUI desktop app for python/etc script.

## Getting Started

1. Install NodeJS
2. Install python3

```bash
# development
git clone ...
cd <bla>
npm i
npm run start

# build
# Method 1 (npm)
npm run make

# Method 2 (yarn)
yarn & yarn dist

# Method 3 (build windows dist from linux)
docker run --rm -ti \
 --env-file <(env | grep -iE 'DEBUG|NODE_|ELECTRON_|YARN_|NPM_|CI|CIRCLE|TRAVIS_TAG|TRAVIS|TRAVIS_REPO_|TRAVIS_BUILD_|TRAVIS_BRANCH|TRAVIS_PULL_REQUEST_|APPVEYOR_|CSC_|GH_|GITHUB_|BT_|AWS_|STRIP|BUILD_') \
 --env ELECTRON_CACHE="/root/.cache/electron" \
 --env ELECTRON_BUILDER_CACHE="/root/.cache/electron-builder" \
 -v ${PWD}:/project \
 -v ${PWD##*/}-node-modules:/project/node_modules \
 -v ~/.cache/electron:/root/.cache/electron \
 -v ~/.cache/electron-builder:/root/.cache/electron-builder \
 electronuserland/builder:wine

cd project
yarn && yarn dist -w
```

### Reference

* [Build windows dist from linux](https://stackoverflow.com/questions/58946482/how-to-build-electron-app-for-windows-in-ubuntu-using-electron-builder)


## Todo
1. Explore [pyinstaller](https://pyinstaller.org/en/stable/) to include python binaries. [Link to medium article](https://medium.com/@abulka/electron-python-4e8c807bfa5e).
2. Explore [Electron Forge](https://www.electronforge.io/config/configuration) and [Electron Builder](https://www.electron.build/) on building and packaging option.
3. Explore [StackOverFlow](https://stackoverflow.com/questions/72372319/electronjs-how-to-get-data-across-from-preload-to-renderer) for get data from across preload and renderer with IPC.
4. Explore [Secure Electron Template](https://github.com/reZach/secure-electron-template).
5. Complete [tutorial](https://www.electronjs.org/docs/latest/tutorial/tutorial-publishing-updating) for publishing and updating.
6. Read the [electron docs](https://www.electronjs.org/docs/latest/tutorial/process-model).
7. Awesome Electron [Resources](https://github.com/sindresorhus/awesome-electron#boilerplates)