const { promises, appendFile, unlink, existsSync } = require("fs");
const fs = promises;

class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./Eproductos.txt";
  }

  //nombreProductos = [];

  async addProduct(nuevoProducto) {
    try {
      //Valida si algun campo es false
      if (
        nuevoProducto.title ||
        nuevoProducto.descripcion ||
        nuevoProducto.price ||
        nuevoProducto.thumbnail ||
        nuevoProducto.code ||
        nuevoProducto.stock
      ) {
        let productoRepetidoByCode = this.products.find((product) => product.code === nuevoProducto.code);
        if (!productoRepetidoByCode) {
          this.products.push({ id: this.products.length + 1, ...nuevoProducto });
        } else {
          //Si existe el code, agrega el stock nuevo
          nuevoProducto.stock = productoRepetidoByCode.stock + nuevoProducto.stock;
          const deleteIndex = this.products.findIndex((product) => product.code === nuevoProducto.code);
          this.products.splice(deleteIndex, 1);
          this.products.push({ id: this.products.length + 1, ...nuevoProducto }); //Agrega la propieda id
        }

        fs.writeFile(this.path, JSON.stringify(this.products, null, 2), "utf-8");
        console.log("Escribí nuevamente el archivo con el stock actualizado");
      } else {
        return "Todos los campos son necesarios";
      }
    } catch (error) {
      console.log(`addProduct: ${error}`);
    }
  }

  async updateProducts(id, propiedad, valor) {
    try {
      let indexProducto = this.products.findIndex((product) => product.id === id);
      if (!indexProducto) {
        switch (propiedad) {
          case "id":
            this.products[indexProducto].id = valor;
            console.log(`Se updateó la propiedad: ${propiedad} del ${this.products[indexProducto].title} por: ${valor}`);
            break;
          case "code":
            this.products[indexProducto].nombre = valor;
            console.log(`Se updateó la propiedad: ${propiedad} del ${this.products[indexProducto].title} por: ${valor}`);
            break;
          case "title":
            this.products[indexProducto].title = valor;
            console.log(`Se updateó la propiedad: ${propiedad} del ${this.products[indexProducto].title} por: ${valor}`);
            break;
          case "descripcion":
            this.products[indexProducto].descripcion = valor;
            console.log(`Se updateó la propiedad: ${propiedad} del ${this.products[indexProducto].title} por: ${valor}`);
            break;
          case "price":
            this.products[indexProducto].price = valor;
            console.log(`Se updateó la propiedad: ${propiedad} del ${this.products[indexProducto].title} por: ${valor}`);
            break;
          case "stock":
            this.products[indexProducto].stock = valor;
            console.log(`Se updateó la propiedad: ${propiedad} del ${this.products[indexProducto].title} por: ${valor}`);
            break;
          case "thumbnail":
            this.products[indexProducto].thumbnail = valor;
            console.log(`Se updateó la propiedad: ${propiedad} del ${this.products[indexProducto].title} por: ${valor}`);
            break;
        }
      } else {
        console.log("No existe el producto con ese ID");
      }
      await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.log(`updateProducts: ${error}`);
    }
  }

  async getProducts() {
    try {
      let productosString = await fs.readFile(this.path, "utf-8");
      let productosJSON = JSON.parse(productosString);
      return productosJSON;
    } catch (error) {
      console.log(`getProducts: ${error}`);
    }
  }

  async getProductById(id) {
    try {
      let productosString = await fs.readFile(this.path, "utf-8");
      //console.log(productosString);
      let productosJSON = JSON.parse(productosString);
      //console.log(productosJSON);
      let product = productosJSON.find((prod) => prod.id === id);
      //console.log(product);
      if (!product) return `getProductById: Not found. No existe un producto con el id: ${id}`;
      return product;
    } catch (error) {
      console.log(`getProducts: ${error}`);
    }
  }

  async deleteProduct(id) {
    try {
      const delId = this.products.find((producto) => producto.id === id);
      console.log(`El producto ${delId.title} ha sido eliminado`);
      await fs.readFile(this.path, "utf-8"); //Si dejo comentada esta linea, se suma otro item "Gorra" y queda en el txt, 3 articulos y adicionalmente solo el stock del item delete (2)
      const deleteIndex = this.products.findIndex((producto) => producto.id == id);
      this.products.splice(deleteIndex, 1);
      await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
    } catch (err) {
      console.log(`No hay producto con ese ID. ${err}`);
    }
  }
}

//const product = new ProductManager();

//Productos
// product.addProduct({ title: "Remera", descripcion: "Remera para hombre", price: 150, thumbnail: "url", code: "C1", stock: 20 });

// product.addProduct({
//   title: "Pantalon",
//   descripcion: "Pantalon para hombre",
//   price: 200,
//   thumbnail: "url",
//   code: "C2",
//   stock: 10,
// });

// product.addProduct({ title: "Gorra", descripcion: "Gorra unisex", price: 100, thumbnail: "url", code: "C3", stock: 15 });

// product.addProduct({ title: "Gorra", descripcion: "Gorra unisex", price: 100, thumbnail: "url", code: "C3", stock: 123 }); //Mismo code con mas stock

//Muestra los productos
//console.log(`getProducts: Hay ${product.products.length} productos: `);
//console.log(product.getProducts());

//Delete
//product.deleteProduct(2);

//console.log(product.getProductById(1));

//Update
//product.updateProducts(1, "stock", 500);

module.exports = {
  ProductManager,
};
