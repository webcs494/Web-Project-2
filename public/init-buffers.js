import * as shapes from "./shapes/shapes.js";
import * as horse from "./shapes/horse.js";
import * as teapot from "./shapes/teapot.js"

function initBuffers(gl) {
  const positionBuffer1 = initPositionBuffer(gl, shapes.object1.vertex);
  const positionBuffer2 = initPositionBuffer(gl, shapes.object2.vertex);
  const positionBuffer3 = initPositionBuffer(gl, shapes.object3.vertex);
  const positionBuffer4 = initPositionBuffer(gl, shapes.object4.vertex);
  const positionBuffer5 = initPositionBuffer(gl, shapes.object5.vertex);
  const positionBuffer6 = initPositionBuffer(gl, shapes.object6.vertex);
  const positionBuffer7 = initPositionBuffer(gl, shapes.object7.vertex);
  const positionBuffer10 = initPositionBuffer(gl, shapes.object10.vertex);
  const positionBuffer11 = initPositionBuffer(gl, shapes.object11.vertex);
  const positionBuffer12 = initPositionBuffer(gl, shapes.object12.vertex);
  const positionBufferTeapot = initPositionBuffer(gl, teapot.teapot.vertex);
  const positionBufferHorse = initPositionBuffer(gl, horse.horse.vertex);
  const indexBuffer1 = initIndexBuffer(gl, shapes.object1.indices);
  const indexBuffer2 = initIndexBuffer(gl, shapes.object2.indices);
  const indexBuffer3 = initIndexBuffer(gl, shapes.object3.indices);
  const indexBuffer4 = initIndexBuffer(gl, shapes.object4.indices);
  const indexBuffer5 = initIndexBuffer(gl, shapes.object5.indices);
  const indexBuffer6 = initIndexBuffer(gl, shapes.object6.indices);
  const indexBuffer7 = initIndexBuffer(gl, shapes.object7.indices);
  const indexBuffer10 = initIndexBuffer(gl, shapes.object10.indices);
  const indexBuffer11 = initIndexBuffer(gl, shapes.object11.indices);
  const indexBuffer12 = initIndexBuffer(gl, shapes.object12.indices);
  const indexBufferTeapot = initIndexBuffer(gl, teapot.teapot.indices);
  const indexBufferHorse = initIndexBuffer(gl, horse.horse.indices);
  const colorBuffer3 = initColorBuffer(gl, shapes.object3.faceColors);
  const colorBuffer4 = initColorBuffer(gl, shapes.object4.faceColors);
  const colorBuffer5 = initColorBuffer(gl, shapes.object5.faceColors);
  const colorBuffer6 = initColorBuffer(gl, shapes.object6.faceColors);
  const colorBufferTeapot = initColorBuffer(gl, teapot.teapot.faceColors);
  const colorBufferHorse = initColorBuffer(gl, horse.horse.faceColors);
  const textureCoordBuffer1 = initTextureBuffer(gl, shapes.object1.textureCoordinates);
  const textureCoordBuffer2 = initTextureBuffer(gl, shapes.object2.textureCoordinates);
  const textureCoordBuffer7 = initTextureBuffer(gl, shapes.object7.textureCoordinates);
  const textureCoordBuffer10 = initTextureBuffer(gl, shapes.object10.textureCoordinates);
  const textureCoordBuffer11 = initTextureBuffer(gl, shapes.object11.textureCoordinates);
  const textureCoordBuffer12 = initTextureBuffer(gl, shapes.object12.textureCoordinates);
  return {
    position1: positionBuffer1,
    position2: positionBuffer2,
    position3: positionBuffer3,
    position4: positionBuffer4,
    position5: positionBuffer5,
    position6: positionBuffer6,
    position7: positionBuffer7,
    position10: positionBuffer10,
    position11: positionBuffer11,
    position12: positionBuffer12,
    positionTeapot: positionBufferTeapot,
    positionHorse: positionBufferHorse,
    indices1: indexBuffer1,
    indices2: indexBuffer2,
    indices3: indexBuffer3,
    indices4: indexBuffer4,
    indices5: indexBuffer5,
    indices6: indexBuffer6,
    indices7: indexBuffer7,
    indices10: indexBuffer10,
    indices11: indexBuffer11,
    indices12: indexBuffer12,
    indicesTeapot: indexBufferTeapot,
    indicesHorse: indexBufferHorse,
    color3: colorBuffer3,
    color4: colorBuffer4,
    color5: colorBuffer5,
    color6: colorBuffer6,
    colorTeapot: colorBufferTeapot,
    colorHorse: colorBufferHorse,
    textureCoord1: textureCoordBuffer1,
    textureCoord2: textureCoordBuffer2,
    textureCoord7: textureCoordBuffer7,
    textureCoord10: textureCoordBuffer10,
    textureCoord11: textureCoordBuffer11,
    textureCoord12: textureCoordBuffer12
  };
}

function initPositionBuffer(gl, positions) {
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  return positionBuffer;
}

function initColorBuffer(gl, faceColors) {
  var colors = [];
  for (var j = 0; j < faceColors.length; ++j) {
    const c = faceColors[j];
    colors = colors.concat(c, c, c, c);
  }
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return colorBuffer;
}

function initIndexBuffer(gl, indices) {
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW
  );

  return indexBuffer;
}

function initTextureBuffer(gl, textureCoordinates) {
  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(textureCoordinates),
    gl.STATIC_DRAW
  );

  return textureCoordBuffer;
}

export { initBuffers };
