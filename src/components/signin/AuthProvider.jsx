import { Button } from "@/components/ui/button";
import { handleGoogleLogin } from "@/lib/Authaction";
import { FcGoogle } from "react-icons/fc";

const AuthProvider = () => {
  return (
    <form action={handleGoogleLogin}>
      <Button
        variant="ghost"
        size="lg"
        className="gap-4 group rounded-full flex justify-start w-full"
      >
        <FcGoogle className="w-5 h-5" /> Continue with Google
      </Button>
    </form>
  );
};

export default AuthProvider;
