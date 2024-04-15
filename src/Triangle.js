class Triangle {
  // Constructor
  constructor() {
    this.type = "triangle";
    this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.size = 5.0;
  }
  // Render the shape
  render() {
    var xy = this.position;
    var rgba = this.color;
    var size = this.size;

    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    // Pass the size of the point to u_Size variable
    gl.uniform1f(u_Size, size);
    // Delta
    var d = this.size / 200.0;
    // Coord map: bottom left -> top -> bottom right
    drawTriangles([xy[0], xy[1], xy[0] + d, xy[1], xy[0], xy[1] + d]);
  }
}

function drawPicture() {
  var size = 100;
  var rgba = [0, 1, 0, 1];

  var d = size / 200.0;

  // Pass the size of the point to u_Size variable
  gl.uniform1f(u_Size, size);

  var rgba = [0, 0.5, 0.8, 1];
  gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
  drawTriangles([-1, 1, -1, -1, 1, -1]);
  drawTriangles([-1, 1, 1, 1, 1, -1]);

  var rgba = [0, 0.3, 0, 1];
  gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
  drawTriangles([-0.3, 0.3, -0.6, -0.08 - 0.1, -0.8, 0.3]);
  drawTriangles([-0.3 + 0.2, 0.1, -0.6 + 0.2, -0.15 - 0.05, -0.8 + 0.1, 0.3]);
  drawTriangles([
    -0.5 + 0.2 + 0.2 + 0.2,
    0.3,
    -0.6 + 0.2 + 0.2 + 0.1,
    -0.15,
    -0.8,
    0.3,
  ]);
  drawTriangles([0.3, 0.3, 0.6, -0.08 - 0.1, 0.8, 0.3]);
  drawTriangles([0.3 - 0.2, 0.1, 0.6 - 0.2, -0.15 - 0.05, 0.8 - 0.1, 0.3]);
  drawTriangles([0.5 - 0.2 - 0.2, 0.3, 0.6 - 0.2 - 0.2 - 0.15, -0.1, 0.8, 0.3]);
  var rgba = [0, 0.8, 0, 1];
  gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
  drawTriangles([0, 0.3, 0, 0.08, 0.8, 0.3]);
  drawTriangles([0, 0.3, 0, 0.08, -0.8, 0.3]);

  var rgba = [0, 0.5, 0, 1];
  gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
  drawTriangles([-0.1, 0.1, -0.3, 0.5, 0.27, 0.1]);
  drawTriangles([-0.1, 0.1, -0.3, -0.5, 0.27, 0.1]);
  var rgba = [0, 0.8, 0, 1];
  gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
  drawTriangles([-0.3, -0.5, -0.16, -0.35, -0.05, -0.5]);
  drawTriangles([-0.3, -0.5, 0.1, -0.8, 0.5, -0.5]);
  drawTriangles([0.5, -0.5, 0.55, -0.2, 0.2, -0.5]);

  var rgba = [0, 1, 0, 1];
  gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
  drawTriangles([0, 0.1, 0.25, 0.5, -0.3, 0.5]);
  drawTriangles([0, 0.55, 0.25, 0.5, -0.3, 0.5]);
  var rgba = [1, 0, 0, 1];
  gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
  drawTriangles([-0.1, 0.3, -0.1, 0.4, -0.25, 0.45]);
  drawTriangles([0.06, 0.3, 0.1 - 0.04, 0.4, 0.25 - 0.04, 0.45]);
}

function drawTriangles(vertices) {
  var n = 3; // The number of vertices

  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log("Failed to create the buffer object");
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  gl.drawArrays(gl.TRIANGLES, 0, n);
}
