# spins

> use spinners on the terminal

### features

- [x] succeed spinner
- [x] fail spinner
- [x] apply color to spinner
- [x] stop and persist
- [x] update text
- [x] show warning
- [x] show info

# install

```sh
npm install spins
# or
yarn add spins
```

# usage

- the spins supports all the spinners on the [cli-spinners](https://npm.im/cli-spinners)
- you can also add your own spinner
- creating a spinner is as simple

- using the default spinners

```js
const spins = require("spins");
const ani = new spins({
  color: "blue",
  spinner: "point",
  stream: process.stdout
});
```

- using your own spinner

```js
const spins = require("spins");
const ani = new spins({
  color: "blue",
  spinner: {
    frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
    interval: 80
  },
  stream: process.stdout
});
```

- starting the spinner

```js
ani.start();
```

- stopping the spinner

```js
ani.stop();
```

- stopping and persisting the spinner

```js
ani.stopAndPersist();
```

- updating the text

```js
ani.setText("new text");
```

- updating the spinner

```js
ani.setSpinner("dots");
```

- updating the color

```js
ani.setColor("red");
```

- suceed spinner

```js
ani.success("Some", "text");
```

- fail spinner

```js
ani.fail("Some", "text");
```

- info spinner

```js
ani.info("Some", "text");
```

- warn spinner

```js
ani.warn("Some", "text");
```

- resume the spinner

```js
ani.resume();
```

- writing logs to the spinner

```js
ani.log("Some", "text");
```
