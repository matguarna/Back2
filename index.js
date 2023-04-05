const { UserManager } = require("./userManager");

const manager = new UserManager();

const env = async () => {
  let primeraConsultaUsuarios = await manager.consultarUsuarios();
  //console.log(primeraConsultaUsuarios); //Debe devolver vacio

  let user = {
    nombre: "Matias 1",
    apellido: "Guarna",
    edad: "29",
    curso: "Back End",
    pass: "123",
  };

  //Crea el usuario "user"
  //   let result = await manager.crearUsuario(user);
  //   console.log(result); //Debe devolver el usuario con un id

  let segundaConsultaUsuarios = await manager.consultarUsuarios();
  console.log(segundaConsultaUsuarios); //Debe devolver el usuario

  manager.validarUsuario("Matias 1", "123");
};

env();
