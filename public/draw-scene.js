import * as mat4 from "./mat4.js";

function drawScene(gl, programInfo, buffers, textures, animate, x_value, z_value, x_view, y_view, z_view) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
  gl.clearDepth(1.0); // Clear everything
  gl.enable(gl.DEPTH_TEST); // Enable depth testing
  gl.depthFunc(gl.LEQUAL); // Near things obscure far things
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const fieldOfView = (45 * Math.PI) / 180; // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();
  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
  const modelViewMatrix = mat4.create();

  mat4.translate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to translate
    [x_value, -5.0, z_value]
  );

  mat4.rotate(
    projectionMatrix,
    projectionMatrix,
    x_view * 3.14 / 180, // rotation in radians
    [0, 1, 0]
  );

  mat4.rotate(
    projectionMatrix,
    projectionMatrix,
    y_view,
    [1, 0, 0]
  );

  mat4.rotate(
    projectionMatrix,
    projectionMatrix,
    z_view,
    [0, 0, 1]
  );

  //draw object1
  setPositionAttribute(gl, buffers.position1, programInfo.attribLocations, 3);
  setTextureAttribute(gl, buffers.textureCoord1, programInfo);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices1);
  gl.useProgram(programInfo.program);
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  );
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, textures[0]);
  gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  //draw object2
  setPositionAttribute(gl, buffers.position2, programInfo.attribLocations, 3);
  setTextureAttribute(gl, buffers.textureCoord2, programInfo);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices2);
  gl.useProgram(programInfo.program);
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  );
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, textures[1]);
  gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
  {
    const vertexCount = 48;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [19.75, 3, 19.75]
  );

  // draw object3
  setPositionAttribute(gl, buffers.position3, programInfo.attribLocations4, 3);
  setColorAttribute(gl, buffers.color3, programInfo.attribLocations4);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices3);
  gl.useProgram(programInfo.program4)
  gl.uniformMatrix4fv(
    programInfo.uniformLocations4.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations4.modelViewMatrix,
    false,
    modelViewMatrix
  );
  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [-19.75, -3, -19.75]
  );

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [20.25, 1, 20.25]
  );

  // draw object4
  setPositionAttribute(gl, buffers.position4, programInfo.attribLocations4, 3);
  setColorAttribute(gl, buffers.color4, programInfo.attribLocations4);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices4);
  gl.useProgram(programInfo.program4)
  gl.uniformMatrix4fv(
    programInfo.uniformLocations4.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations4.modelViewMatrix,
    false,
    modelViewMatrix
  );
  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [-20.25, -1, -20.25]
  );

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [20.25, 1, 5]
  );

  // draw object4
  setPositionAttribute(gl, buffers.position4, programInfo.attribLocations4, 3);
  setColorAttribute(gl, buffers.color4, programInfo.attribLocations4);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices4);
  gl.useProgram(programInfo.program4)
  gl.uniformMatrix4fv(
    programInfo.uniformLocations4.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations4.modelViewMatrix,
    false,
    modelViewMatrix
  );
  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [-20.25, -1, -5]
  );

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [20.25, 3, 5.5]
  );

  mat4.rotate(
    modelViewMatrix,
    modelViewMatrix,
    animate[1],
    [1, 0, 0]
  );

  // draw horse
  setPositionAttribute(gl, buffers.positionHorse, programInfo.attribLocations4, 3);
  setColorAttribute(gl, buffers.colorHorse, programInfo.attribLocations4);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indicesHorse);
  gl.useProgram(programInfo.program4)
  gl.uniformMatrix4fv(
    programInfo.uniformLocations4.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations4.modelViewMatrix,
    false,
    modelViewMatrix
  );
  {
    const vertexCount = 2900;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  mat4.rotate(
    modelViewMatrix,
    modelViewMatrix,
    -animate[1],
    [1, 0, 0]
  );

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [-20.25, -3, -5.5]
  );

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [20.25, 1, -5.5]
  );

  // draw object4
  setPositionAttribute(gl, buffers.position4, programInfo.attribLocations4, 3);
  setColorAttribute(gl, buffers.color4, programInfo.attribLocations4);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices4);
  gl.useProgram(programInfo.program4)
  gl.uniformMatrix4fv(
    programInfo.uniformLocations4.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations4.modelViewMatrix,
    false,
    modelViewMatrix
  );
  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [-20.25, -1, 5.5]
  );

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [20, 3, -5.5]
  );

  mat4.rotate(
    modelViewMatrix,
    modelViewMatrix,
    animate[0],
    [0, 1, 0]
  );

  // draw teapot
  setPositionAttribute(gl, buffers.positionTeapot, programInfo.attribLocations4, 3);
  setColorAttribute(gl, buffers.colorTeapot, programInfo.attribLocations4);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indicesTeapot);
  gl.useProgram(programInfo.program4)
  gl.uniformMatrix4fv(
    programInfo.uniformLocations4.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations4.modelViewMatrix,
    false,
    modelViewMatrix
  );
  {
    const vertexCount = 267;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  mat4.rotate(
    modelViewMatrix,
    modelViewMatrix,
    -animate[0],
    [0, 1, 0]
  );

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [-20, -3, 5.5]
  );

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [20.25, 1, -20.25]
  );

  // draw object4
  setPositionAttribute(gl, buffers.position4, programInfo.attribLocations4, 3);
  setColorAttribute(gl, buffers.color4, programInfo.attribLocations4);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices4);
  gl.useProgram(programInfo.program4)
  gl.uniformMatrix4fv(
    programInfo.uniformLocations4.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations4.modelViewMatrix,
    false,
    modelViewMatrix
  );
  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [-20.25, -1, 20.25]
  );
  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [20 + animate[2], 3 + animate[3], -21 + animate[2]]
  );

  mat4.rotate(
    modelViewMatrix,
    modelViewMatrix,
    animate[4],
    [0, 0, 1]
  );

  // draw object5
  setPositionAttribute(gl, buffers.position5, programInfo.attribLocations4, 3);
  setColorAttribute(gl, buffers.color5, programInfo.attribLocations4);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices5);
  gl.useProgram(programInfo.program4)
  gl.uniformMatrix4fv(
    programInfo.uniformLocations4.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations4.modelViewMatrix,
    false,
    modelViewMatrix
  );
  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  mat4.rotate(
    modelViewMatrix,
    modelViewMatrix,
    -animate[4],
    [0, 0, 1]
  );

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [-(20 + animate[2]), -(3 + animate[3]), -(-21 + animate[2])]
  );

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [-20.25, 1, 20.25]
  );

  // draw object4
  setPositionAttribute(gl, buffers.position4, programInfo.attribLocations4, 3);
  setColorAttribute(gl, buffers.color4, programInfo.attribLocations4);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices4);
  gl.useProgram(programInfo.program4)
  gl.uniformMatrix4fv(
    programInfo.uniformLocations4.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations4.modelViewMatrix,
    false,
    modelViewMatrix
  );
  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [20.25, -1, -20.25]
  );

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [-20.75, 3, 19.75]
  );

  // draw object7
  setPositionAttribute(gl, buffers.position7, programInfo.attribLocations7, 3);
  setTextureAttribute(gl, buffers.textureCoord7, programInfo);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices7);
  gl.useProgram(programInfo.program7)
  gl.uniformMatrix4fv(
    programInfo.uniformLocations7.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations7.modelViewMatrix,
    false,
    modelViewMatrix
  );
  gl.uniform1f(programInfo.uniformLocations7.uStripeSize, animate[1]);
  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [20.75, -3, -19.75]
  );

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [-20.25, 1, 5.25]
  );

  // draw object4
  setPositionAttribute(gl, buffers.position4, programInfo.attribLocations4, 3);
  setColorAttribute(gl, buffers.color4, programInfo.attribLocations4);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices4);
  gl.useProgram(programInfo.program4)
  gl.uniformMatrix4fv(
    programInfo.uniformLocations4.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations4.modelViewMatrix,
    false,
    modelViewMatrix
  );
  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [20.25, -1, -5.25]
  );

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [-20.75, 3, 4.75]
  );

  // draw object7
  setPositionAttribute(gl, buffers.position7, programInfo.attribLocations2, 3);
  setTextureAttribute(gl, buffers.textureCoord7, programInfo);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices7);
  gl.useProgram(programInfo.program2)
  gl.uniformMatrix4fv(
    programInfo.uniformLocations2.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations2.modelViewMatrix,
    false,
    modelViewMatrix
  );
  gl.uniform1f(programInfo.uniformLocations2.uLocation, animate[5]);
  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [20.75, -3, -4.75]
  );
  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [-20.25, 1, -20.25]
  );

  // draw object4
  setPositionAttribute(gl, buffers.position4, programInfo.attribLocations4, 3);
  setColorAttribute(gl, buffers.color4, programInfo.attribLocations4);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices4);
  gl.useProgram(programInfo.program4)
  gl.uniformMatrix4fv(
    programInfo.uniformLocations4.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations4.modelViewMatrix,
    false,
    modelViewMatrix
  );
  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [20.25, -1, 20.25]
  );

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [-20.75, 3.125, -20.75]
  );

  //draw object10
  setPositionAttribute(gl, buffers.position10, programInfo.attribLocations, 3);
  setTextureAttribute(gl, buffers.textureCoord10, programInfo);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices10);
  gl.useProgram(programInfo.program);
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  );
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, textures[2]);
  gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  //draw object11
  setPositionAttribute(gl, buffers.position11, programInfo.attribLocations, 3);
  setTextureAttribute(gl, buffers.textureCoord11, programInfo);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices11);
  gl.useProgram(programInfo.program);
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  );
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, textures[3]);
  gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [20.75, -3.125, 20.75]
  );

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [-21 + animate[5], 3 + animate[6], -20.25 + animate[7]]
  );
  // draw object6
  setPositionAttribute(gl, buffers.position6, programInfo.attribLocations4, 3);
  setColorAttribute(gl, buffers.color6, programInfo.attribLocations4);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices6);
  gl.useProgram(programInfo.program4)
  gl.uniformMatrix4fv(
    programInfo.uniformLocations4.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations4.modelViewMatrix,
    false,
    modelViewMatrix
  );
  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [21 - animate[5], -(3 + animate[6]), 20.25 - animate[7]]
  );

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [-20.25, 1, -5.25]
  );

  // draw object4
  setPositionAttribute(gl, buffers.position4, programInfo.attribLocations4, 3);
  setColorAttribute(gl, buffers.color4, programInfo.attribLocations4);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices4);
  gl.useProgram(programInfo.program4)
  gl.uniformMatrix4fv(
    programInfo.uniformLocations4.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations4.modelViewMatrix,
    false,
    modelViewMatrix
  );
  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [20.25, -1, 5.25]
  );

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [-20.25, 3.75, -5.25]
  );

  mat4.rotate(
    modelViewMatrix,
    modelViewMatrix,
    animate[0],
    [0, 1, 0]
  );

  // draw object12
  setPositionAttribute(gl, buffers.position12, programInfo.attribLocations3, 3);
  setTextureAttribute(gl, buffers.textureCoord12, programInfo);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices12);
  gl.useProgram(programInfo.program3)
  gl.uniformMatrix4fv(
    programInfo.uniformLocations3.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations3.modelViewMatrix,
    false,
    modelViewMatrix
  );
  gl.uniform1f(programInfo.uniformLocations3.uStripeSize, animate[9]);
  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  mat4.rotate(
    modelViewMatrix,
    modelViewMatrix,
    -animate[0],
    [0, 1, 0]
  );

  mat4.translate(
    projectionMatrix,
    projectionMatrix,
    [20.25, -3.75, 5.25]
  );
}

function setPositionAttribute(gl, buffers, programInfo_attribLocations, n) {
  const numComponents = n;
  const type = gl.FLOAT; // the data in the buffer is 32bit floats
  const normalize = false; // don't normalize
  const stride = 0; // how many bytes to get from one set of values to the next 0 = use type and numComponents above
  const offset = 0; // how many bytes inside the buffer to start from
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers);
  gl.vertexAttribPointer(
    programInfo_attribLocations.vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );
  gl.enableVertexAttribArray(programInfo_attribLocations.vertexPosition);
}

function setColorAttribute(gl, color, programInfo_attribLocations) {
  const numComponents = 4;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;
  gl.bindBuffer(gl.ARRAY_BUFFER, color);
  gl.vertexAttribPointer(
    programInfo_attribLocations.vertexColor,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );
  gl.enableVertexAttribArray(programInfo_attribLocations.vertexColor);
}

function setTextureAttribute(gl, buffers_textureCoord, programInfo) {
  const num = 2; // every coordinate composed of 2 values
  const type = gl.FLOAT; // the data in the buffer is 32-bit float
  const normalize = false; // don't normalize
  const stride = 0; // how many bytes to get from one set to the next
  const offset = 0; // how many bytes inside the buffer to start from
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers_textureCoord);
  gl.vertexAttribPointer(
    programInfo.attribLocations.textureCoord,
    num,
    type,
    normalize,
    stride,
    offset
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
}

export { drawScene };
