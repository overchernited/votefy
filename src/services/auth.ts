import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


const loginUser = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuario autenticado:", userCredential.user);
      alert("Inicio de sesión exitoso");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      alert("Error: valide las credenciales proporcionados por el administrador");
    }
  };


export default loginUser