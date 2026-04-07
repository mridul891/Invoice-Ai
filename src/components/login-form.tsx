"use client";
import { GoogleLogoIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";

import { handleSocialsignIn } from "@/actions/authActions";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <Button
            variant="outline"
            type="button"
            onClick={() => handleSocialsignIn("google")}
            className="cursor-pointer"
          >
            <GoogleLogoIcon size={32} />
            Login with Google
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
