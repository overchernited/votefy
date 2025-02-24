import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomInput from "../components/CustomInput";
import MagicButton from "../components/MagicButton";
import { useForm, Controller } from "react-hook-form";
import { faCrown, faKey, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import loginUser from "../services/auth";
import { useState } from "react";
import { InputProvider } from "../contexts/input/inputContext";

interface FormData {
  email: string;
  password: string;
}

const AdminLogin = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange", // Valida en tiempo real
    defaultValues: {
      email: "", // Valor por defecto
      password: "", // Puedes dejarlo vacío o con algún valor
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await loginUser(data.email, data.password);
    } catch (err: unknown) {
      let errorMessage = "Ocurrió un error inesperado";

      if (err instanceof Error) {
        errorMessage = err.message; // Si es un objeto Error, usa su mensaje
      } else if (typeof err === "string") {
        errorMessage = err; // Si ya es un string, úsalo directamente
      }

      setErrorMessage(errorMessage);
    }
  };

  const validationError =
    errors.email?.message || errors.password?.message || errorMessage;

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="h-[80%] md:w-[40%] xl:w-[30%] xl:h-[65%] shadow-xl rounded-2xl shadow-zinc-500 p-5 relative">
        {validationError && (
          <div className="flex flex-row items-center justify-center">
            <p className="text-white bg-red-700 p-2 rounded-xl text-sm text-center absolute bottom-[100%]">
              {validationError}
            </p>
          </div>
        )}
        <div className="flex flex-row text-4xl xl:text-5xl m-2 justify-center text-center">
          <FontAwesomeIcon icon={faCrown} className="text-[#1784ddd2]" />
          <p className="font-bold ml-2 text-shadow-lg">
            Iniciar sesión como administrador
          </p>
        </div>
        <form
          className="mt-5 flex flex-col justify-center items-center h-[50%] relative"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputProvider>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "El email es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Ingrese un correo válido",
                },
              }}
              render={({ field: { onChange, onBlur } }) => (
                <CustomInput
                  name="Email"
                  onChange={onChange}
                  onBlur={onBlur}
                  placeholder="E-mail"
                  icon={faEnvelope}
                  className="w-[80%]"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: "La contraseña es obligatoria" }}
              render={({ field: { value, onChange, onBlur } }) => (
                <CustomInput
                  name="password"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  placeholder="Contraseña"
                  icon={faKey}
                  className="w-[80%]"
                />
              )}
            />
          </InputProvider>

          <MagicButton
            style="styled"
            type="submit"
            className="w-full absolute top-[105%]"
            disabled={!isValid}
          >
            Iniciar Sesión
          </MagicButton>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
