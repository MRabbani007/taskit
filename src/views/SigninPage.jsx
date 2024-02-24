// Imported Components
import SignIn from "../features/auth/SignIn";
import SignOut from "../features/auth/SignOut";
import useAuth from "../hooks/useAuth";

const SigninPage = () => {
  const { auth } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center text-slate-950">
      {auth?.user ? <SignOut /> : <SignIn />}
    </div>
  );
};

export default SigninPage;
