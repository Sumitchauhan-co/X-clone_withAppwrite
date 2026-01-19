import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../features/auth/authThunk";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, error } = useSelector((s) => s.auth);
  const auth = useSelector((s) => s.auth);

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
    // reset();
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/x-clone/home");
    }
  }, [isAuthenticated, auth, navigate]);

  return (
    <div className="min-h-screen max-w-screen flex flex-col md:flex-row justify-start items-center bg-black">
      <div className="h-[25vh] md:h-full w-[50%] flex justify-center items-center">
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
      <div className="h-fit w-[75%] md:w-[50%] p-3 md:p-8 flex justify-center items-center group">
        <div className="w-full md:w-[90%] lg:w-[75%] xl:w-[50%] flex flex-col text-white gap-18">
          <div className="w-full text-center flex flex-col justify-start items-center gap-3">
            <h1 className="w-50 text-4xl md:text-5xl font-semibold group-has-hover:border-b-3 transition-all ease-in-out">
              Login
            </h1>
            <p className="text-lg md:text-xl">To get started</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-8">
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
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div>
                <button className="w-full p-2 font-semibold text-lg bg-neutral-100 hover:bg-neutral-200 text-black rounded-2xl flex justify-center items-center">
                  {loading ? "Logging" : "Login"}
                </button>
              </div>
              <div className="w-full flex justify-center text-sm sm:text-lg gap-2">
                <p className="text-neutral-400">Don't have an account?</p>
                <span className="cursor-pointer hover:underline text-lg sm:text-xl">
                  <Link to="/x-clone/signup">Signup</Link>
                </span>
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

export default Login;
