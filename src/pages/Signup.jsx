import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../features/auth/authThunk";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { error } = useSelector((s) => s.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    dispatch(signupUser(data));
  };

  useEffect(() => {
    if (user) navigate("/home");
  }, [user, navigate]);

  return (
    <div className="min-h-screen max-w-screen flex flex-col md:flex-row justify-start items-center bg-black">
      <div className="h-[20vh] md:h-full w-[50%] flex justify-center items-center">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-20 w-20 md:h-35 lg:h-50 md:w-35 lg:w-50 invert"
        >
          <g>
            <path d="M21.742 21.75l-7.563-11.179 7.056-8.321h-2.456l-5.691 6.714-4.54-6.714H2.359l7.29 10.776L2.25 21.75h2.456l6.035-7.118 4.818 7.118h6.191-.008zM7.739 3.818L18.81 20.182h-2.447L5.29 3.818h2.447z"></path>
          </g>
        </svg>
      </div>
      <div className="h-fit w-[75%] md:w-[50%] lg p-3 md:p-8 flex justify-center items-center group">
        <div className="w-full md:w-[90%] lg:w-[75%] xl:w-[50%] flex flex-col text-white gap-10 md:gap-18">
          <div className="w-full text-center flex flex-col justify-start items-center gap-3">
            <h1 className="w-50 text-4xl md:text-5xl font-semibold group-has-hover:border-b-3 group-has-active:border-b-3 transition-all ease-in-out">
              Sign up
            </h1>
            <p className="text-lg md:text-xl">To get started</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5 md:gap-8">
              <div className="flex flex-col gap-3">
                <label className="w-15 text-xl font-semibold">Name</label>
                <input
                  className="autofill:shadow-[inset_0_0_0px_1000px_rgb(225,225,225)] p-2 rounded-xl border-2 border-neutral-300 focus-visible:border-neutral-200 focus-visible:border-3 outline-none"
                  type="text"
                  placeholder="Enter name"
                  {...register("name", {
                    required: true,
                  })}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="w-15 text-xl font-semibold">Email</label>
                <input
                  className="autofill:shadow-[inset_0_0_0px_1000px_rgb(225,225,225)] p-2 rounded-xl border-2 border-neutral-300 focus-visible:border-neutral-200 focus-visible:border-3 outline-none"
                  type="email"
                  placeholder="Enter email"
                  {...register("email", {
                    required: true,
                    minLength: {
                      value: 6,
                      message: "Minimum length should be atleast 6",
                    },
                  })}
                />
                {errors.email?.message && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="w-full flex flex-col gap-3">
                <label className="w-15 text-xl font-semibold">Password</label>
                <div className="w-full relative flex justify-end items-center group">
                  <input
                    className="w-full autofill:shadow-[inset_0_0_0px_1000px_rgb(225,225,225)] p-2 rounded-xl border-2 border-neutral-300 focus-visible:border-neutral-200 focus-visible:border-3 outline-none"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    {...register("password", {
                      required: true,
                      minLength: {
                        value: 8,
                        message: "Minimum length should be atleast 8",
                      },
                    })}
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="h-full w-10 bg-neutral-700 border border-neutral-300 rounded-r-xl absolute cursor-pointer select-none flex justify-center items-center"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                {errors.password?.message && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <button className="w-full p-2 font-semibold text-lg bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-200 text-black rounded-2xl flex justify-center items-center">
                  {loading ? (
                    <div className="h-full w-full flex justify-center items-center">
                      <div className="h-7 w-7 border-4 rounded-[50%] border-blue-950 border-t-blue-400 animate-spin"></div>
                    </div>
                  ) : (
                    "Sign up"
                  )}
                </button>
              </div>

              <div className="w-full text-center">
                {error && <p className="text-red-500">{error}</p>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
