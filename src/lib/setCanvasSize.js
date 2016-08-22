/* eslint-disable no-param-reassign */
export default (canvas, { height, width }) => {
  canvas.height = height * 2; // Double the size for retina screens
  canvas.width = width * 2;
  canvas.style.height = `${height}px`;
  canvas.style.width = `${width}px`;
};
/* eslint-enable no-param-reassign */
