"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { signInSchema, SignInFormValues } from "./schema";
import { useLoginMutation } from "@/lib/api/authApiSlice";
import { useAppDispatch } from "@/lib/hooks";
import { setCredentials } from "@/lib/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import CustomTextField from "@/components/inputs/CustomTextField";

const SignInForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading, error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormValues) => {
    try {
      const res = await login(data).unwrap();
      if (!res.data) {
        throw new Error("Login response did not include token data.");
      }

      dispatch(
        setCredentials({
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token,
        }),
      );
      router.push("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="w-full max-w-110">
      <div className="rounded-card border border-line bg-surface p-8 shadow-card">
        <div className="mb-8">
          <h1 className="font-bold text-xl text-ink">VoxCheck</h1>
          <p className="text-caption text-ink-muted mt-1">
            Civic verification console
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-title font-bold mb-1.5">Sign in</h2>
          <p className="text-body text-ink-muted">
            Reviewers only. Access is granted by an existing reviewer.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <CustomTextField
            label="Email"
            type="email"
            placeholder=""
            register={register("email")}
            errorMessage={errors.email}
          />

          <CustomTextField
            label="Password"
            type="password"
            placeholder=""
            checkPassword
            register={register("password")}
            errorMessage={errors.password}
          />

          {error && (
            <div className="text-sm text-red-500">
              Invalid credentials. Please try again.
            </div>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-badge"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-ui text-ink-muted">
            Need access?{" "}
            <Link
              href="/signup"
              className="text-primary font-medium hover:underline inline-flex items-center gap-1"
            >
              Sign Up <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </p>
        </div>
      </div>

      {/* <div className="mt-6 text-center">
        <p className="font-mono text-mono text-ink-faint">
          Overrides are logged and attributed to your reviewer ID
        </p>
      </div> */}
    </div>
  );
};

export default SignInForm;
