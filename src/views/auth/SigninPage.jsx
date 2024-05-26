// Imported Components
import SignIn from "../../features/auth/SignIn";
import SignOut from "../../features/auth/SignOut";
import useAuth from "../../hooks/useAuth";

const SigninPage = () => {
  const { auth } = useAuth();

  return (
    <main className="flex flex-col items-center justify-center">
      {auth?.user ? <SignOut /> : <SignIn />}
    </main>
  );
};

export default SigninPage;
