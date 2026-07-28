import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { User as UserIcon, Mail, Phone, Save } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateProfile } from "../../redux/slices/authSlice";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import toast from "react-hot-toast";
import axios from "axios";

import { updateUserProfile } from "../../redux/slices/authSlice";
export const UserProfilePage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [isSaving, setIsSaving] = useState(false);
  const { register, handleSubmit,reset  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phoneNumber: user?.phone || ""
    }
  });
  // const onSubmit = async (data) => {
  //   setIsSaving(true);
  //   const result = await dispatch(updateProfile(data));
  //   setIsSaving(false);
  //   if (updateProfile.fulfilled.match(result)) {
  //     toast.success("Profile information updated!");
  //     let datas = await axios.post(`http://localhost:5000/UpdateUserController/${user?._id}`,data)

  //   } else {
  //     toast.error("Failed to update profile.");
  //   }
  // };



  const onSubmit = async (data) => {
  setIsSaving(true);
  try {
    const datas = await axios.post(
      `http://localhost:5000/update/${user?._id}`,
      data
    );

    if (datas.data.success) {
      toast.success("Profile information updated!");
      dispatch(updateUserProfile(datas.data.data));

      reset({
        name: datas.data.data.name || "",
        email: datas.data.data.email || "",
        phoneNumber: datas.data.data.phoneNumber || ""
      });
    } else {
      toast.error(datas.data.message || "Failed to update profile.");
    }
  } catch (error) {
    console.log('Update failed', error);
    toast.error(error.response?.data?.message || "Failed to update profile.");
  } finally {
    setIsSaving(false);
  }
};





  //  const onSubmit = async (data) => {
  //   setIsSaving(true);
  //   try {
  //     const datas = await axios.post(
  //       `http://localhost:5000/update/${user?._id}`,
  //       data
  //     );

      // if (datas.data.success) {
      //   toast.success("Profile information updated!");
      //   dispatch(update(datas.data.data));
      // } else {
      //   toast.error(datas.data.message || "Failed to update profile.");
      // }



  //   } catch (error) {
  //     console.log('Update failed', error);
  //     toast.error(error.response?.data?.message || "Failed to update profile.");
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };


  // useEffect(()=>{
  //   async function getData(){
  //     let datas = await axios.get(`http://localhost:5000/singleusers`)

  //     console.log(datas);

  //   }
  //   getData()
  // })


  useEffect(() => {
  async function getData() {
    try {
      const datas = await axios.get(`http://localhost:5000/singleusers/${user?._id}`);
      console.log('Fetched user:', datas.data);

      reset({
        name: datas.data.data.name || "",
        email: datas.data.data.email || "",
        phoneNumber: datas.data.data.phoneNumber || ""
      });
    } catch (error) {
      console.log('Failed to fetch profile', error);
    }
  }
  if (user?._id) {

    getData();
  }
}, [user?._id]);

  return <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Personal Information</h2>
        <p className="text-xs text-slate-500 mt-1">
          Manage your profile details and contact preferences
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
    label="Full Name"
    leftIcon={<UserIcon className="w-4 h-4" />}
    {...register("name")}
  />

        <Input
    label="Email Address"
    type="email"
    leftIcon={<Mail className="w-4 h-4" />}
    {...register("email")}
  />

        <Input
    label="Phone Number"
    type="tel"
    leftIcon={<Phone className="w-4 h-4" />}
    {...register("phoneNumber")}
  />

        <Button
    type="submit"
    size="lg"
    isLoading={isSaving}
    className="w-max mt-2"
    leftIcon={<Save className="w-4 h-4" />}
  >
          Save Changes
        </Button>
      </form>
    </div>;
};
