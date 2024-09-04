import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthProvider from "@/components/signin/AuthProvider";
import EmailProvider from "@/components/signin/EmailProvider";
import Link from "next/link";
const signin = () => {
  return (
    <div className="flex flex-col items-center mt-8">
      <Card className="border-none shadow-none">
        <CardHeader className="border-none">
          <CardTitle className="flex flex-col items-center text-4xl">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent className="border-none">
          <EmailProvider />
        </CardContent>
        <CardContent className="border-none">
          <AuthProvider />
        </CardContent>
        <CardFooter>
          <p>
            Don't have an account?
            <Link href="/signup">
            <span className="underline">Join us today</span>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default signin;
