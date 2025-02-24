import DynamicFormContainer from "../components/DynamicInputs";
import MagicButton from "../components/MagicButton";
import { useAuth } from "../contexts/auth/useContext";
import { InputProvider } from "../contexts/input/inputContext";

const AdminDashboard = () => {
  const { logout, user } = useAuth();
  return (
    <>
      <div className="fixed top-0 left-0 w-[15%] m-5 z-50">
        <p className="text-2xl font-bold">Bienvenido {user?.email}</p>
        <MagicButton
          className="rounded-sm text-sm"
          style="error"
          onClick={logout}
        >
          Salir de la cuenta
        </MagicButton>
      </div>
      <InputProvider>
        <DynamicFormContainer />
      </InputProvider>
    </>
  );
};

export default AdminDashboard;
