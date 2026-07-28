import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, LogIn, Sparkles } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginUser } from "../../redux/slices/authSlice";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import toast from "react-hot-toast";
import axios from "axios";
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});
export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const onSubmit = async (data) => {
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      toast.success("Welcome back to EcoBazar!");
      const user = result.payload.user;
      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {

        try {

          let datas = await axios.post('http://localhost:5000/login',data)

          localStorage.setItem('ecobazar_user',JSON.stringify(datas.data.data))
          navigate("/");
          console.log(data);
        } catch (error) {
          console.log('api login failed',error);

        }



      }
    } else {
      toast.error(result.payload || "Login failed");
    }
  };
  const fillCustomerDemo = () => {
    setValue("email", "sarah.jenkins@example.com");
    setValue("password", "password123");
  };
  const fillAdminDemo = () => {
    setValue("email", "admin@ecobazar.com");
    setValue("password", "admin123");
  };
  return <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-soft flex flex-col gap-6">
        <div className="text-center flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white font-extrabold text-2xl shadow-md">
            E
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">Welcome Back</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign in to access your EcoBazar account & organic orders
          </p>
        </div>

        {
    /* Demo Fast Login Buttons */
  }
        {/* <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> One-Click Demo Credentials
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
    type="button"
    onClick={fillCustomerDemo}
    className="px-3 py-1.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-bold hover:bg-emerald-200 transition-colors"
  >
              Demo Customer
            </button>
            <button
    type="button"
    onClick={fillAdminDemo}
    className="px-3 py-1.5 bg-slate-900 text-white dark:bg-slate-700 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
  >
              Demo Admin
            </button>
          </div>
        </div> */}

        {error && <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-600 text-xs font-medium">
            {error}
          </div>}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
    label="Email Address"
    type="email"
    placeholder="e.g. sarah.jenkins@example.com"
    leftIcon={<Mail className="w-4 h-4" />}
    error={errors.email?.message}
    {...register("email")}
  />

          <Input
    label="Password"
    type="password"
    placeholder="••••••••"
    leftIcon={<Lock className="w-4 h-4" />}
    error={errors.password?.message}
    {...register("password")}
  />

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
              <input type="checkbox" className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-emerald-600 hover:underline font-semibold">
              Forgot password?
            </Link>
          </div>

          <Button
    type="submit"
    size="lg"
    isLoading={isLoading}
    className="w-full mt-2"
    leftIcon={<LogIn className="w-4 h-4" />}
  >
            Sign In
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
          Don't have an account?{" "}
          <Link to="/register" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>;
};
