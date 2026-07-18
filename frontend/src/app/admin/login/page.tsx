"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Shield, ArrowLeft, Loader2, Eye, EyeOff, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@campusai.com",
      password: "admin123",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    const result = await login(data.email, data.password);

    if (result.success) {
      router.push("/admin/dashboard");
    } else {
      setError(result.error || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

      {/* Back button */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground glass px-3.5 py-2 rounded-xl transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex p-3.5 rounded-2xl gradient-accent text-white shadow-xl glow mb-4">
            <Shield className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">Admin Portal</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Management & AI Knowledge Base Governance
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8"
        >
          <div className="glass-card p-8 rounded-2xl border border-white/10 shadow-2xl">
            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Admin Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@campusai.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Security Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                  />
                  <label htmlFor="remember" className="text-xs text-muted-foreground cursor-pointer">
                    Remember session
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full gradient-accent text-white h-11 text-base font-semibold shadow-lg hover:opacity-95"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="h-4 w-4" /> Access Admin Console
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/5 text-center">
              <div className="text-xs text-muted-foreground">
                Demo Credentials: <span className="font-mono text-accent font-bold">admin@campusai.com</span> / <span className="font-mono text-accent font-bold">admin123</span>
              </div>
              <div className="mt-3">
                <Link href="/student/login" className="text-xs text-primary hover:underline inline-flex items-center gap-1 font-medium">
                  ← Switch to Student Login
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
