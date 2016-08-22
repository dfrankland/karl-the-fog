import eases from 'eases';
import setCanvasSize from './lib/setCanvasSize';
import setDefaultStyle from './lib/setDefaultStyle';

export default class {
  constructor({
    canvas: FOG_CANVAS,
    style,
    steps: FOG_STEPS = 100,
    animate = false,
    resize = false,
    timingFunction = 'linear',
    callback = () => undefined,
  }) {
    const FOG_STYLE = setDefaultStyle(style);
    const FOG_CTX = FOG_CANVAS.getContext('2d');
    const COORDINATES = { x: FOG_STYLE.scaleY, y: 0 };
    const easing = eases[timingFunction];
    let fog = [];

    // Draws a fog "curve" in a direction
    const fogDrawLine = direction => {
      const { x, y } = COORDINATES;
      const { width, scaleX, scaleY } = FOG_STYLE;
      const max = direction ? width - scaleY * 2.5 : x;
      let min;
      if (direction) {
        min = x + scaleX + scaleY > width ?
          width - scaleY : x + scaleX;
      } else {
        min = scaleY + scaleX;
      }

      const randomInclusiveInt = Math.floor(Math.random() * (max - min + 1)) + min;
      COORDINATES.x = randomInclusiveInt;
      return scale =>
        FOG_CTX.lineTo(randomInclusiveInt * scale + scaleY, y);
    };

    // Draws a fog "line" in a direction
    const fogDrawCap = direction => {
      const d = direction ? 1 : -1;
      const { x, y } = COORDINATES;
      const { scaleY } = FOG_STYLE;
      const nextDrawing = scale => {
        const scaledX = x * scale + scaleY;
        FOG_CTX.bezierCurveTo(
          scaledX + (d * scaleY), y,
          scaledX + (d * scaleY), y + scaleY,
          scaledX, y + scaleY
        );
      };

      COORDINATES.y += scaleY;
      return nextDrawing;
    };

    // Adds reproducable "curve" functions of fog
    const updateFog = () => {
      FOG_CTX.scale(2, 2); // For retina screens
      const { height, scaleY } = FOG_STYLE;
      const lastDirection = (fog.length / 2) % 2;
      const currentFogLength = fog.length / 2;
      for (let i = 0; i < (height / scaleY) - currentFogLength; i++) {
        const direction = i % 2 === lastDirection;
        fog = fog.concat(fogDrawLine(direction), fogDrawCap(direction));
      }
    };

    // Actually draws "curves"
    const renderFog = scale => {
      // Start Shape
      FOG_CTX.beginPath();
      FOG_CTX.moveTo(0, 0);

      // Draw each curve
      fog.map(
        fogDrawing => fogDrawing(
          easing(scale / FOG_STEPS)
        )
      );

      // End shape and fill
      FOG_CTX.lineTo(0, COORDINATES.y);
      FOG_CTX.closePath();
      FOG_CTX.fillStyle = FOG_STYLE.color;
      FOG_CTX.fill();
    };

    // Animates the fog collapsing
    let animationScale = FOG_STEPS;
    const animateFog = () => {
      window.requestAnimationFrame(() => {
        if (animationScale > 0) {
          setCanvasSize(FOG_CANVAS, FOG_STYLE);
          updateFog();
          renderFog(animationScale);
          animationScale -= 1;
          animateFog();
        } else {
          callback();
        }
      });
    };

    // Initialze fog
    setCanvasSize(FOG_CANVAS, FOG_STYLE);
    updateFog();

    window.requestAnimationFrame(() => {
      if (animate === true) {
        animateFog();
      } else {
        renderFog(animationScale);
        callback();
      }
    });

    // Listen for resizing
    if (resize === true) {
      window.addEventListener('resize', () => {
        window.requestAnimationFrame(() => {
          FOG_STYLE.height = window.innerHeight;
          setCanvasSize(FOG_CANVAS, FOG_STYLE);
          updateFog();
          renderFog(animationScale);
        });
      });
    }
  }
}
