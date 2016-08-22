# karl-the-fog

> Creates a "stylized fog" using an HTML5 canvas.

## About

I follow [Dribbble][1] pretty religiously and I have seen a quite a few
different types of "stylized fog" in designers' work. Examples: [here][2],
[here][3], [here][4], and [there][5]. To me, it looks really freakin' awesome
and I thought that it would fit in well with the theme of ["Pacifica"][6] for my
[personal website][7].

![alt demo](http://i.giphy.com/l0HlNvjQjdlEvJxOo.gif)

### Setup

1.  Save `karl-the-fog` like any other `npm` dependency

    ```bash
    npm i -S karl-the-fog
    ```

2.  Import the `KarlTheFog` class

    *   ES6

        ```javascript
        import KarlTheFog from 'karl-the-fog';
        ```

    *   ES5

        ```javascript
        var KarlTheFog = require('karl-the-fog').default;
        ```

    *   Script

        ```html
        <script src="karl-the-fog/dist/web.js"></script>
        ```

### How to Use

There's not much to using it. You just need to pass an options object to the
`KarlTheFog` class.

```javascript
const options = {
  canvas: document.getElementById('fog'),
  style: {
    color: '#fff',
    scaleY: 35,
    scaleX: 50,
    width: 700,
  },
  steps: 100,
  animate: true,
  resize: true,
  timingFunction: 'cubicInOut',
};
new KarlTheFog(options);
```

### Options

An object with properties listed below:

#### `canvas`

The `<canvas></canvas>` element to attach to.

#### `style`

An object with the following properties:

*   `color`: the color of the "fog" e.g. `#fff` or `rbga(255, 255, 255, 1)`
*   `scaleY`: the height in pixels of each "fog line"
*   `scaleX`: the minimum inset width in pixels for each "fog line"
*   `width`: the maximum width in pixels for each "fog line"

#### `animate`

A boolean for whether the "fog lines" should animate collapsing.

#### `steps`

A number with the number of animation steps. Higher is slow, but smoother.

#### `timingFunction`

A string with the name of a timing function from [eases][8]. The current list of
functions includes these:

*   `backInOut`
*   `backIn`
*   `backOut`
*   `bounceInOut`
*   `bounceIn`
*   `bounceOut`
*   `circInOut`
*   `circIn`
*   `circOut`
*   `cubicInOut`
*   `cubicIn`
*   `cubicOut`
*   `elasticInOut`
*   `elasticIn`
*   `elasticOut`
*   `expoInOut`
*   `expoIn`
*   `expoOut`
*   `linear`
*   `quadInOut`
*   `quadIn`
*   `quadOut`
*   `quartInOut`
*   `quartIn`
*   `quartOut`
*   `quintInOut`
*   `quintIn`
*   `quintOut`
*   `sineInOut`
*   `sineIn`
*   `sineOut`

[1]: https://dribbble.com/
[2]: https://dribbble.com/shots/2585522-Night-Outdoor
[3]: https://dribbble.com/shots/2557394-Cuttana
[4]: https://dribbble.com/shots/2549267-Mystery-Project-76-1
[5]: https://dribbble.com/shots/2161256-Voyager-1
[6]: https://en.wikipedia.org/wiki/Pacifica,_California#Climate
[7]: https://dylan.frankland.io/
[8]: https://github.com/mattdesl/eases
