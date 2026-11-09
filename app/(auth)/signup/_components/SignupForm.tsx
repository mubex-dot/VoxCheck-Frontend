"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useRegisterMutation } from "@/lib/api/apiSlice";
import { getErrorMessage } from "@/lib/api/error";
import { Button } from "@/components/ui/button";
import CustomTextField from "@/components/inputs/CustomTextField";
import CustomCheckbox from "@/components/inputs/CustomCheckbox";
import { CreateAccountFormValues, createAccountSchema } from "./schema";

const CreateAccountForm = () => {
  const router = useRouter();
  const [registerMutation, { isLoading, error }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountFormValues>({
    resolver: zodResolver(createAccountSchema),
  });

  const onSubmit = async (data: CreateAccountFormValues) => {
    try {
      const res = await registerMutation({
        email: data.email,
        password: data.password,
        full_name: data.full_name || null,
      }).unwrap();

      if (!res.data) {
        throw new Error("Registration response did not include account data.");
      }

      router.push("/login");
    } catch (err) {
      console.error("Registration failed", err);
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
          <h2 className="text-title font-serif mb-1.5">Create account</h2>
          <p className="text-body text-ink-muted">
            Reviewers only. New accounts need approval before override rights.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <CustomTextField
            label="Full name"
            type="text"
            placeholder="Jane Doe"
            register={register("full_name")}
            errorMessage={errors.full_name}
          />

          <CustomTextField
            label="Email"
            type="email"
            placeholder="you@example.com"
            register={register("email")}
            errorMessage={errors.email}
          />

          <CustomTextField
            label="Password"
            type="password"
            subLabel="At least 8 characters."
            placeholder=""
            checkPassword
            register={register("password")}
            errorMessage={errors.password}
          />

          <CustomTextField
            label="Confirm password"
            type="password"
            placeholder=""
            checkPassword
            register={register("confirmPassword")}
            errorMessage={errors.confirmPassword}
          />

          <div className="pt-2 pb-2">
            <CustomCheckbox
              label={
                <span>
                  I agree that my overrides are logged under my reviewer ID.{" "}
                  <span className="text-alert">*</span>
                </span>
              }
              register={register("agree")}
              errorMessage={errors.agree}
            />
          </div>

          {error && (
            <div className="text-sm text-red-500">
              {getErrorMessage(error, "Registration failed. Please try again.")}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-badge"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </div>

      <div className="mt-6 flex flex-col items-center gap-2">
        <p className="text-ui text-ink-muted">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-medium hover:underline inline-flex items-center gap-1"
          >
            Sign in <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CreateAccountForm;
