# find-magnet-extension

A browser extension to look for magnet links in each page

### Running

Navigate to the project directory and install the dependencies.

```
$ npm install
```

or

```
$ yarn
```

To build the extension, and rebuild it when the files are changed, run

```
$ npm start
```

or

```
$ yarn start
```


### How to test

After the project has been built, a directory named `dist` has been created. You have to add this directory to your Chrome browser:

1. Open Chrome.
2. Navigate to `chrome://extensions`.
3. Enable _Developer mode_.
4. Click _Load unpacked_.
5. Select the `dist` directory.
