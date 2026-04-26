import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import img1 from "@/assets/img/img1.jpg";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();

  const correctUser = "Royal Store";
  const correctPassword = "1234";

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (user === correctUser && password === correctPassword) {
      navigate("/form"); // ✅ redirect
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center relative">
      <h1 className="absolute left-1/2 top-16 -translate-x-1/2 font-extrabold text-5xl tracking-wider">
        ROYAL STORE
      </h1>
      <div className={cn("flex flex-col gap-6 w-5xl", className)} {...props}>
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form onSubmit={handleLogin} className="p-6 md:p-8">
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-balance text-muted-foreground">
                    Login with your account
                  </p>
                </div>

                <Field>
                  <FieldLabel htmlFor="user">Username</FieldLabel>
                  <Input
                    id="user"
                    type="text"
                    placeholder="Royal Store"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Field>

                <Field>
                  <Button type="submit">Login</Button>
                </Field>
              </FieldGroup>
            </form>

            <div className="relative hidden bg-muted md:block">
              <img
                src={img1}
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
