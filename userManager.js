const fs = require("fs");
const crypto = require("crypto");

const path = "./Back2/Clase 5/files.json";

class UserManager {
  consultarUsuarios = async () => {
    try {
      //Lee si existe el archivo, sino lo crea
      if (fs.existsSync(path)) {
        const data = await fs.promises.readFile(path, "utf-8");
        const users = JSON.parse(data);
        return users;
      }
      await fs.promises.writeFile(path, "[]", "utf-8");
      return [];
    } catch (error) {
      console.log(error);
    }
  };

  crearUsuario = async (usuario) => {
    try {
      const users = await this.consultarUsuarios();
      if (users.length === 0) {
        usuario.id = 1;
      } else {
        usuario.id = users[users.lenght - 1].id + 1; //Devuelve el ultimo id de la lista y le suma 1
      }
      usuario.salt = crypto.randomBytes(128).toString("base64"); //Le crea al usuario un alfanumerico aleatorio para hacer una firma
      usuario.password = crypto.createHmac("sha256", usuario.salt).update(usuario.pass).digest("hex"); // hex = hexadecimal
      users.push(usuario);
      await fs.promises.writeFile(path, JSON.stringify(users, null, 2), "utf-8");
      return usuario;
    } catch (error) {
      console.log(error);
    }
  };
  validarUsuario = async (nombre, pass) => {
    try {
      const usuarios = await this.consultarUsuarios(); //Trae la lista de usuarios
      const usuarioIndex = usuarios.findIndex((user) => user.nombre === nombre); //Trae el index, si existe ese usuario
      //Si no existe, no se valida, y termina la funcion
      if (usuarioIndex === -1) {
        console.log("Error, usuario no encontrado");
        return;
      } else {
        const usuario = usuarios[usuarioIndex];
        //Como no puede "descifrar" la contraseña, compara los encriptados
        const newHash = crypto.createHmac("sha256", usuario.salt).update(pass).digest("hex"); //usuario.salt ya tiene la contraseña guardada con el alfanumerico

        if (newHash === usuario.password) {
          console.log("Logueado");
        } else {
          console.log("Contraseña inválida");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = {
  UserManager,
};
