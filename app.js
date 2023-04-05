const express = require("express");
const { ProductManager } = require("./ProductManager");

const app = express();
app.use(express.urlencoded({ extended: true }));

const manager = new ProductManager();

//Lee el archivo de productos y los devuelve dentro de un objeto. Con la query ?limit= recibe un limite de resultados, sino devuelve todo
app.get("/products", async (request, response) => {
  try {
    const { limit } = request.query;
    let productos = await manager.getProducts();
    if (!limit) {
      return response.send({ productos });
    } else {
      //http:localhost:8080/products?limit=2
      return response.send(productos.slice(0, limit));
    }
  } catch (error) {
    response.send(error);
  }
});

//Recibe por request.params el pid (product id) y devuelve solo ese producto
app.get("/products/:pid", async (request, response) => {
  try {
    let { pid } = request.params; //Trae el "pid" como string
    pid = Math.floor(pid); //Convierte el string a numero
    let producto = await manager.getProductById(pid);
    response.send({ producto });
  } catch (error) {
    response.send(error);
  }
});

app.listen(8080, () => {
  console.log("Escuchando puerto 8080");
});
