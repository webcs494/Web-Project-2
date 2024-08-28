import { initBuffers } from "./init-buffers.js";
import { drawScene } from "./draw-scene.js";
import { Animate } from "./animate.js";

main();

function main() {
  const canvas = document.querySelector("#glcanvas");
  // Initialize the GL context
  const gl = canvas.getContext("webgl");

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Vertex shader program
  const vsSource = `
  attribute vec4 aVertexPosition;
  attribute vec2 aTextureCoord;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  varying highp vec2 vTextureCoord;

  void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vTextureCoord = aTextureCoord;
  }
  `;

  // Fragment shader program
  const fsSource = `
  varying highp vec2 vTextureCoord;

  uniform sampler2D uSampler;

  void main(void) {
    gl_FragColor = texture2D(uSampler, vTextureCoord);
  }
  `;

  const vsSource2 = `
  attribute vec4 aVertexPosition;
  attribute vec2 aTextureCoord;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  varying highp vec2 vTextureCoord;

  void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vTextureCoord = aTextureCoord;
  }
  `;

  const fsSource2 = `
  precision mediump float;

  varying vec2 vTextureCoord;
  uniform float uStripeSize;
  uniform float uLocation;

  void main(void) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0 - vTextureCoord.y * uLocation);
  }
  `;

  const vsSource3 = `
  attribute vec4 aVertexPosition;
  attribute vec2 aTextureCoord;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  varying highp vec2 vTextureCoord;

  float vec2_dot(vec2 a, vec2 b) {
    return a.x * b.x + a.y * b.y;
  }

  vec3 transform(vec3 xyz, float amount) {
    float blank1 = amount;
    float blank2 = amount;

    vec3 new_xyz = xyz;
    new_xyz.yz = vec2(
      vec2_dot(new_xyz.yz, vec2(blank1, -blank2)),
      vec2_dot(new_xyz.yz, vec2(blank2, blank1))
    );
    return new_xyz;
  }

  void main(void) {
    vec4 vertex = aVertexPosition;
    vertex.xyz = transform(vertex.xyz, 0.707);
    float center = pow(pow(aVertexPosition.x - 0.5, 2.0) + pow(aVertexPosition.z - 0.5, 2.0), 0.5);
    vertex = mix(vertex, aVertexPosition, aVertexPosition.x);
    gl_Position = uProjectionMatrix * uModelViewMatrix * vertex;
    vTextureCoord = aTextureCoord;
  }
  `;

  const fsSource3 = `
  precision mediump float;

  varying vec2 vTextureCoord;
  uniform float uStripeSize;

  void main(void) {
    float stripePattern = mod(floor(vTextureCoord.y / 0.25), 2.0);
    vec4 color;
    if (stripePattern == 0.0) {
    color = vec4(1.0, 1.0, 1.0, 1.0);
    } else {
    color = vec4(0.0, 0.0, 1.0, 0.5);
    }
    gl_FragColor = color;
  }
  `;

  const vsSource4 = `
  attribute vec4 aVertexPosition;
  attribute vec4 aVertexColor;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  varying lowp vec4 vColor;

  void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vColor = aVertexColor;
  }
  `;

  const fsSource4 = `
  varying lowp vec4 vColor;

  void main(void) {
    gl_FragColor = vColor;
  }
  `;

  const vsSource7 = `
  attribute vec4 aVertexPosition;
  attribute vec2 aTextureCoord;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  varying highp vec2 vTextureCoord;

  void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vTextureCoord = aTextureCoord;
  }
  `;

  const fsSource7 = `
  precision mediump float;

  varying vec2 vTextureCoord;
  uniform float uStripeSize;

  void main(void) {
    float stripePattern = mod(floor(vTextureCoord.y / uStripeSize), 2.0);
    vec4 color;
    if (stripePattern == 0.0) {
      color = vec4(1.0, 1.0, 1.0, 1.0);
    } else {
      color = vec4(1.0, 0.647, 0.0, 1.0);
    }
    gl_FragColor = color;
  }
  `;

  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
  const shaderProgram2 = initShaderProgram(gl, vsSource2, fsSource2);
  const shaderProgram3 = initShaderProgram(gl, vsSource3, fsSource3);
  const shaderProgram4 = initShaderProgram(gl, vsSource4, fsSource4);
  const shaderProgram7 = initShaderProgram(gl, vsSource7, fsSource7);
  const programInfo = {
    program: shaderProgram,
    program2: shaderProgram2,
    program3: shaderProgram3,
    program4: shaderProgram4,
    program7: shaderProgram7,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      textureCoord: gl.getAttribLocation(shaderProgram, "aTextureCoord"),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
      uSampler: gl.getUniformLocation(shaderProgram, "uSampler"),
    },
    attribLocations2: {
      vertexPosition: gl.getAttribLocation(shaderProgram2, "aVertexPosition"),
      textureCoord: gl.getAttribLocation(shaderProgram2, "aTextureCoord"),
    },
    uniformLocations2: {
      projectionMatrix: gl.getUniformLocation(shaderProgram2, "uProjectionMatrix"),
      modelViewMatrix: gl.getUniformLocation(shaderProgram2, "uModelViewMatrix"),
      uLocation: gl.getUniformLocation(shaderProgram2, "uLocation"),
    },
    attribLocations3: {
      vertexPosition: gl.getAttribLocation(shaderProgram3, "aVertexPosition"),
      textureCoord: gl.getAttribLocation(shaderProgram3, "aTextureCoord"),
    },
    uniformLocations3: {
      projectionMatrix: gl.getUniformLocation(shaderProgram3, "uProjectionMatrix"),
      modelViewMatrix: gl.getUniformLocation(shaderProgram3, "uModelViewMatrix"),
      uStripeSize: gl.getUniformLocation(shaderProgram3, "uStripeSize"),
    },
    attribLocations4: {
      vertexPosition: gl.getAttribLocation(shaderProgram4, "aVertexPosition"),
      vertexColor: gl.getAttribLocation(shaderProgram4, "aVertexColor")
    },
    uniformLocations4: {
      projectionMatrix: gl.getUniformLocation(shaderProgram4, "uProjectionMatrix"),
      modelViewMatrix: gl.getUniformLocation(shaderProgram4, "uModelViewMatrix"),
    },
    attribLocations7: {
      vertexPosition: gl.getAttribLocation(shaderProgram7, "aVertexPosition"),
      textureCoord: gl.getAttribLocation(shaderProgram7, "aTextureCoord"),
    },
    uniformLocations7: {
      projectionMatrix: gl.getUniformLocation(shaderProgram7, "uProjectionMatrix"),
      modelViewMatrix: gl.getUniformLocation(shaderProgram7, "uModelViewMatrix"),
      uStripeSize: gl.getUniformLocation(shaderProgram7, "uStripeSize"),
    },
  };

  const buffers = initBuffers(gl);

  // Load texture 256 x 256
  const texture = loadTexture(gl, "./textures/texture1.png");
  const texture2 = loadTexture(gl, "./textures/texture2.png");
  const texture3 = loadTexture(gl, "./textures/texture3.png");
  const texture4 = loadTexture(gl, "./textures/texture4.png");
  const textures = [texture, texture2, texture3, texture4]
  // Flip image pixels into the bottom-to-top order that WebGL expects.
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  let z_value = -40.0
  let x_value = 0.0
  let x_view = 0
  let y_view = 0.0
  let z_view = 0.0

  let then = 0
  let t = 0
  let object6 = 0
  let value;
  let start = true

  // Draw the scene repeatedly
  function render(now) {
    now *= 0.001
    t = now - then
    then = now
    let count = now % 10
    let horse = Animate(count, [0.5, -0.5, 0.5, -0.5, 0.5], [0, 2.5, 5, 7.5, 10])
    let object5_x = Animate(count, [0, 1, 0, 1, 0], [0, 5, 6, 7, 10])
    let object5_y = Animate(count, [0, 1, 0, 0], [0, 2.5, 7.5, 10])
    let object5_z = Animate(count, [0, 5, 1, 0, 0], [0, 5, 6, 7, 10])
    let object6_x = Animate(count, [0, 0, 1, 0.5, 0, 0], [0, 1, 5, 7, 7.5, 10])
    let object6_y = Animate(count, [0, 0.5, 0.5, 0.25, 0.5, 0], [0, 1, 5, 7, 7.5, 10])
    let object6_z = Animate(count, [0, -0.5, 0], [0, 5, 10])
    let shader2 = Animate(count, [0, 1, 0], [0, 5, 10])
    let shader3 = Animate(count, [0.1, 1, 0.1], [0, 5, 10])
    let animate = [object6, horse, object5_x, object5_y, object5_z, object6_x, object6_y, object6_z, shader2, shader3]

    drawScene(gl, programInfo, buffers, textures, animate, x_value, z_value, x_view, y_view, z_view);
    object6 += t

    if (value == "w") {
      // the closer we get to 90 degrees the less forward we go and the greater we go right
      if (x_view <= 90) {
        z_value += 0.5 * ((90 - x_view) / 90)
        x_value -= 0.5 * (x_view / 90)
      } else if (x_view <= 180) {
        z_value -= 0.5 * ((x_view - 90) / 90)
        x_value -= 0.5 * ((180 - x_view) / 90)
      } else if (x_view <= 270) {
        z_value -= 0.5 * ((270 - x_view) / 90)
        x_value += 0.5 * ((x_view - 180) / 90)
      } else {
        z_value += 0.5 * ((x_view - 270) / 90)
        x_value += 0.5 * ((360 - x_view) / 90)
      }
    } else if (value == "a") {
      if (x_view <= 90) {
        x_value += 0.5 * ((90 - x_view) / 90)
        z_value += 0.5 * (x_view / 90)
      } else if (x_view <= 180) {
        x_value -= 0.5 * ((x_view - 90) / 90)
        z_value += 0.5 * ((180 - x_view) / 90)
      } else if (x_view <= 270) {
        x_value -= 0.5 * ((270 - x_view) / 90)
        z_value -= 0.5 * ((x_view - 180) / 90)
      } else {
        x_value += 0.5 * ((x_view - 270) / 90)
        z_value -= 0.5 * ((360 - x_view) / 90)
      }
    } else if (value == "s") {
      if (x_view <= 90) {
        z_value -= 0.5 * ((90 - x_view) / 90)
        x_value += 0.5 * (x_view / 90)
      } else if (x_view <= 180) {
        z_value += 0.5 * ((x_view - 90) / 90)
        x_value += 0.5 * ((180 - x_view) / 90)
      } else if (x_view <= 270) {
        z_value += 0.5 * ((270 - x_view) / 90)
        x_value -= 0.5 * ((x_view - 180) / 90)
      } else {
        z_value -= 0.5 * ((x_view - 270) / 90)
        x_value -= 0.5 * ((360 - x_view) / 90)
      }
    } else if (value == "d") {
      if (x_view <= 90) {
        x_value -= 0.5 * ((90 - x_view) / 90)
        z_value -= 0.5 * (x_view / 90)
      } else if (x_view <= 180) {
        x_value += 0.5 * ((x_view - 90) / 90)
        z_value -= 0.5 * ((180 - x_view) / 90)
      } else if (x_view <= 270) {
        x_value += 0.5 * ((270 - x_view) / 90)
        z_value += 0.5 * ((x_view - 180) / 90)
      } else {
        x_value -= 0.5 * ((x_view - 270) / 90)
        z_value += 0.5 * ((360 - x_view) / 90)
      }
    } else if (value == "b") {
      if (x_view >= 360) {
        x_view = 0
      } else {
        x_view += 1.0
      }
    } else if (value == "c") {
      if (x_view < 0) {
        x_view = 359
      } else {
        x_view -= 1.0
      }
    }

    
    const button_w = document.getElementById("w")
    const button_a = document.getElementById("a")
    const button_s = document.getElementById("s")
    const button_d = document.getElementById("d")
    const button_c = document.getElementById("c")
    const button_b = document.getElementById("b")
    
    if (start) {
      button_w.addEventListener("mousedown", function() {
        value = "w"
      })

      button_a.addEventListener("mousedown", function() {
        value = "a"
      })

      button_s.addEventListener("mousedown", function() {
        value = "s"
      })

      button_d.addEventListener("mousedown", function() {
        value = "d"
      })

      button_c.addEventListener("mousedown", function() {
        value = "c"
      })

      button_b.addEventListener("mousedown", function() {
        value = "b"
      })

      button_w.addEventListener("touchstart", function() {
        value = "w"
      })

      button_a.addEventListener("touchstart", function() {
        value = "a"
      })

      button_s.addEventListener("touchstart", function() {
        value = "s"
      })

      button_d.addEventListener("touchstart", function() {
        value = "d"
      })

      button_c.addEventListener("touchstart", function() {
        value = "c"
      })

      button_b.addEventListener("touchstart", function() {
        value = "b"
      })
    }

    button_w.addEventListener("mouseup", function() {
      start = false
      value = "e"
    })

    button_a.addEventListener("mouseup", function() {
      start = false
      value = "e"
    })

    button_s.addEventListener("mouseup", function() {
      start = false
      value = "e"
    })

    button_d.addEventListener("mouseup", function() {
      start = false
      value = "e"
    })

    button_c.addEventListener("mouseup", function() {
      start = false
      value = "e"
    })

    button_b.addEventListener("mouseup", function() {
      start = false
      value = "e"
    })

    button_w.addEventListener("touchend", function() {
      start = false
      value = "e"
    })

    button_a.addEventListener("touchend", function() {
      start = false
      value = "e"
    })

    button_s.addEventListener("touchend", function() {
      start = false
      value = "e"
    })
    
    button_d.addEventListener("touchend", function() {
      start = false
      value = "e"
    })

    button_c.addEventListener("touchend", function() {
      start = false
      value = "e"
    })

    button_b.addEventListener("touchend", function() {
      start = false
      value = "e"
    })

    if (start) {
      document.addEventListener("keydown", function (event) {
        console.log("x_view: ", x_view, "y_view: ", y_view, "z_view: ", z_view)
        if (event.key == "w" && value != "w") {
          value = "w"
        } else if (event.key == "a" && value != "a") {
          value = "a"
        } else if (event.key == "s" && value != "s") {
          value = "s"
        } else if (event.key == "d" && value != "d") {
          value = "d"
        } else if (event.key == "b" && value != "b") {
          value = "b"
        } else if (event.key == "c" && value != "c") {
          value = "c"
        }
        // else if (event.key == "f") {
        //   if (x_view <= 180) {
        //     y_view -= 0.0001 * ((90 - x_view) / 90)
        //     z_view -= 0.0001 * (x_view / 90)
        //   } else {
        //     y_view -= 0.0001 * -((90 - (x_view - 180)) / 90)
        //     z_view -= 0.0001 * -((x_view - 180) / 90)
        //   }
        // } else if (event.key == "v") {
        //   if (x_view <= 180) {
        //     y_view += 0.0001 * ((90 - x_view) / 90)
        //     z_view += 0.0001 * (x_view / 90)
        //   } else {
        //     y_view += 0.0001 * -((90 - (x_view - 180)) / 90)
        //     z_view += 0.0001 * -((x_view - 180) / 90)
        //   }
        // }
      })
    }
    
    document.addEventListener("keyup", function() {
      start = false
      value = "e"
    })


    // document.addEventListener("mousemove", function(event) {
    //   const viewPortX = window.innerWidth
    //   const viewPortY = window.innerHeight

    //   const centerX = viewPortX / 2
    //   const centerY = viewPortY / 2

    //   const mouse_x = event.clientX
    //   const mouse_y = event.clientY

    //   x_view += (mouse_x - centerX) * 0.000005
    //   y_view += (mouse_y - centerY) * 0.0000005
    // })

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program
  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(
      `Unable to initialize the shader program: ${gl.getProgramInfoLog(
        shaderProgram
      )}`
    );
    return null;
  }

  return shaderProgram;
}

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);

  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function loadTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]); // opaque blue
  gl.texImage2D(
    gl.TEXTURE_2D,
    level,
    internalFormat,
    width,
    height,
    border,
    srcFormat,
    srcType,
    pixel
  );

  const image = new Image();
  image.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      level,
      internalFormat,
      srcFormat,
      srcType,
      image
    );

    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
      gl.generateMipmap(gl.TEXTURE_2D);
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  };
  image.src = url;

  return texture;
}

function isPowerOf2(value) {
  return (value & (value - 1)) === 0;
}
