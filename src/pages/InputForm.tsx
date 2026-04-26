import { Link } from "react-router-dom";
import LoginForm from "@/components/login-form1";

export default function InputForm() {
  return (
    <div className="h-screen bg-muted p-6">
      <h1 className="text-center mb-12 text-5xl font-serif font-semibold tracking-wider">
        Royal Sotre
      </h1>
      <div className="flex justify-center">
        <LoginForm />
      </div>

      <div className="text-center mt-12">
        <Link
          to="/table"
          className="underline font-serif tracking-widest hover:text-muted-foreground"
        >
          GO TO TABLE
        </Link>
      </div>
    </div>
  );
}
