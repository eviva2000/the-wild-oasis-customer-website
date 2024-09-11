import { signInAction } from "../_lib/actions";

// since the entire work flow of the sign in happens in the server , this button component is a server component and we can not use onClick event on this button, instead we can use server action to handle the sign in process
function SignInButton() {
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
