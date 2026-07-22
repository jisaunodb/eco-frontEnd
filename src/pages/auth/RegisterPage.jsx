import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, User as UserIcon, Phone, UserPlus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { registerUser } from "../../redux/slices/authSlice";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import toast from "react-hot-toast";
const registerSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password is required")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema)
  });
  const onSubmit = async (data) => {
    const result = await dispatch(
      registerUser({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password
      })
    );
    if (registerUser.fulfilled.match(result)) {
      toast.success("Registration successful! Welcome to EcoBazar.");
      navigate("/");
    } else {
      toast.error(result.payload || "Registration failed");
    }
  };
  return <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-soft flex flex-col gap-6">
        <div className="text-center flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white font-extrabold text-2xl shadow-md">
            E
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">Create Account</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Join EcoBazar for farm-fresh organic deliveries & discounts
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
    label="Full Name"
    type="text"
    placeholder="e.g. Sarah Jenkins"
    leftIcon={<UserIcon className="w-4 h-4" />}
    error={errors.name?.message}
    {...register("name")}
  />

          <Input
    label="Email Address"
    type="email"
    placeholder="e.g. sarah.jenkins@example.com"
    leftIcon={<Mail className="w-4 h-4" />}
    error={errors.email?.message}
    {...register("email")}
  />

          <Input
    label="Phone Number (Optional)"
    type="tel"
    placeholder="+1 (555) 000-0000"
    leftIcon={<Phone className="w-4 h-4" />}
    error={errors.phone?.message}
    {...register("phone")}
  />

          <Input
    label="Password"
    type="password"
    placeholder="At least 6 characters"
    leftIcon={<Lock className="w-4 h-4" />}
    error={errors.password?.message}
    {...register("password")}
  />

          <Input
    label="Confirm Password"
    type="password"
    placeholder="Re-enter password"
    leftIcon={<Lock className="w-4 h-4" />}
    error={errors.confirmPassword?.message}
    {...register("confirmPassword")}
  />

          <Button
    type="submit"
    size="lg"
    isLoading={isLoading}
    className="w-full mt-2"
    leftIcon={<UserPlus className="w-4 h-4" />}
  >
            Create Account
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>;
};
