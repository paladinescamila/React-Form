import React, {useState} from "react";
import { Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError } from "./elements/Formulario";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import ComponenteInput from "./components/ComponenteInput";

export default function App() {

  const [usuario, cambiarUsuario] = useState({campo: '', valido: null});
  const [nombre, cambiarNombre] = useState({campo: '', valido: null});
  const [password, cambiarPassword] = useState({campo: '', valido: null});
  const [password2, cambiarPassword2] = useState({campo: '', valido: null});
  const [correo, cambiarCorreo] = useState({campo: '', valido: null});
  const [telefono, cambiarTelefono] = useState({campo: '', valido: null});
  const [terminos, cambiarTerminos] = useState(false);
  const [formularioValido, cambiarFormularioValido] = useState(null);

  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
  }

  const validarPassword2 = () => {
    if (password.campo.length > 0){
      if (password.campo !== password2.campo){
        cambiarPassword2((prevState) => {
          return {...prevState, valido: "false"}
        });
      } else {
        cambiarPassword2((prevState) => {
          return {...prevState, valido: "true"}
        });
      }
    }
  }

  const onChangeTerminos = (e) => {
    cambiarTerminos(e.target.checked);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      usuario.valido === "true" && 
      nombre.valido === "true" && 
      password.valido === "true" && 
      password2.valido === "true" && 
      correo.valido === "true" && 
      telefono.valido === "true" &&
      terminos
      ){
        cambiarFormularioValido(true);
        cambiarUsuario({campo: '', valido: null});
        cambiarNombre({campo: '', valido: null});
        cambiarPassword({campo: '', valido: null});
        cambiarPassword2({campo: '', valido: null});
        cambiarCorreo({campo: '', valido: null});
        cambiarTelefono({campo: '', valido: null});
      } else {
        cambiarFormularioValido(false);
      }
  }

	return (
		<main>
			<Formulario action="" onSubmit={onSubmit}>        
        <ComponenteInput 
          estado={usuario}
          cambiarEstado={cambiarUsuario}
          tipo="text"
          label="Usuario"
          placeholder="john123"
          name="usuario"
          leyendaError="El usuario tiene que ser de 4 a 16 dígitos y sólo puede contener números, letras y guión bajo."
          expresionRegular={expresiones.usuario}
        />
        <ComponenteInput 
          estado={nombre}
          cambiarEstado={cambiarNombre}
          tipo="text"
          label="Nombre"
          placeholder="John Doe"
          name="nombre"
          leyendaError="El nombre solo puede contener letras y espacios."
          expresionRegular={expresiones.nombre}
        />
        <ComponenteInput 
          estado={password}
          cambiarEstado={cambiarPassword}
          tipo="password"
          label="Contraseña"
          name="password1"
          leyendaError="La contraseña tiene que ser de 4 a 12 dígitos."
          expresionRegular={expresiones.password}
        />
        <ComponenteInput 
          estado={password2}
          cambiarEstado={cambiarPassword2}
          tipo="password"
          label="Repetir contraseña"
          name="password2"
          leyendaError="Ambas contraseñas deben ser iguales."
          funcion={validarPassword2}
        />
        <ComponenteInput 
          estado={correo}
          cambiarEstado={cambiarCorreo}
          tipo="email"
          label="Correo electrónico"
          placeholder="Por ejemplo 'johnsmith'"
          name="correo"
          leyendaError="El correo solo puede contener letras, números, puntos, guiones y guion bajo."
          expresionRegular={expresiones.correo}
        />
        <ComponenteInput 
          estado={telefono}
          cambiarEstado={cambiarTelefono}
          tipo="text"
          label="Teléfono"
          placeholder="1234567899"
          name="telefono"
          leyendaError="El telefono solo puede contener números y el máximo son 14 dígitos."
          expresionRegular={expresiones.telefono}
        />

        <ContenedorTerminos>
          <Label>
            <input  
              type="checkbox" 
              name="terminos" 
              id="terminos" 
              checked={terminos}
              onChange={onChangeTerminos}
            ></input>
            Acepto los Términos y Condiciones
          </Label>
        </ContenedorTerminos>
        {formularioValido === false && <MensajeError>
          <p>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <b>Error:</b> Por favor rellenael formulario correctamente.</p>
        </MensajeError>}
        <ContenedorBotonCentrado>
          <Boton type="submit">Enviar</Boton>
          {formularioValido === false && <MensajeExito>¡El formulario se envió exitosamente!</MensajeExito>}
        </ContenedorBotonCentrado>
			</Formulario>
		</main>
	);
}
