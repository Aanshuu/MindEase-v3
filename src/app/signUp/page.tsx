"use client";
import { useCurrentUser, pb } from "@/lib/pocketbase";
import { useState, useEffect } from "react";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import { Eye, EyeOff } from "lucide-react";
import { TransitionLink } from "@/lib/TransitionLink";
import { buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const user = await pb
        .collection("users")
        .create({ email, password, passwordConfirm: password });
      console.log("user registered", user);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("failed to register", err);
      setError(err.message);
    }
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);
      console.log("user logged in", authData);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("failed to login", err.message);
      setError(err.message);
    }
  };
  //   const loginSubmitHandler = async(){
  //   }
  const togglePasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <>
      {/* basic signup and login working */}

      {/* <div>
        <h1>Sign Up</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={handleLogin}>Login</button>
        {currentUser ? (
          <p>Welcome, {currentUser.email}!</p>
        ) : (
          <p>Please sign up or log in.</p>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div> */}

      <MaxWidthWrapper className="mb-12 mt-10 flex flex-col items-center justify-center text-center">
        <div className="mb-4 flex max-w-fit items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white px-8 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50 dark:border-gray-900 dark:bg-black dark:hover:border-gray-900 dark:hover:bg-black/50 dark:shadow-dark-md">
          <p className="text-sm font-semibold text-black dark:text-white">
            Welcome to MindEase
          </p>
        </div>
        <div className="flex flex-col items-center justify-center w-full max-w-sm h-auto overflow-hidden bg-transparent backdrop-blur-md p-8 rounded-lg shadow-lg dark:border-gray-900 dark:bg-black dark:hover:border-gray-900 dark:hover:bg-black/50 dark:shadow-dark-lg">
          <h2 className="text-xl font-medium text-black mb-6 text-center dark:text-white">
            Login
          </h2>
          {/* onSubmit={loginSubmitHandler} */}
          <form className="">
            <div className="flex flex-col relative w-full border-b-2 border-black dark:border-white mb-8">
              <input
                id="email"
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full px-3 py-2 mt-1 sm:text-sm focus:ring-0 bg-transparent border-none outline-none box-shadow-none text-black dark:text-white"
                required
              />
              <label
                htmlFor="email"
                className="absolute text-md font-medium ml-2 text-black dark:text-white transition-all transform -translate-y-1/2 top-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-0 peer-focus:-translate-y-5 peer-focus:text-sm peer-valid:top-0 peer-valid:-translate-y-5 peer-valid:text-sm"
              >
                Email
              </label>
            </div>
            <div className="relative w-full border-b-2 border-black dark:border-white mb-8">
              <div className="flex flex-col">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full px-3 py-2 mt-1 sm:text-sm focus:ring-0 bg-transparent border-none outline-none box-shadow-none text-black dark:text-white"
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute text-md font-medium ml-2 text-black dark:text-white transition-all transform -translate-y-1/2 top-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-0 peer-focus:-translate-y-5 peer-focus:text-sm peer-valid:top-0 peer-valid:-translate-y-5 peer-valid:text-sm"
                >
                  Password
                </label>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pb-1">
                {showPassword ? (
                  <Eye
                    className="text-black dark:text-white cursor-pointer"
                    onClick={togglePasswordHandler}
                  />
                ) : (
                  <EyeOff
                    className="text-black dark:text-white cursor-pointer"
                    onClick={togglePasswordHandler}
                  />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center mr-4">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-black dark:text-white"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <TransitionLink
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot Password?
                </TransitionLink>
              </div>
            </div>
            <button
              onClick={handleLogin}
              //   type="submit"
              className={buttonVariants({
                size: "default",
                className:
                  "w-full py-2 rounded-xl bg-black text-white shadow-lg dark:bg-white dark:text-black mb-2",
              })}
            >
              Login
            </button>
            <button
              onClick={handleSignUp}
              //   type="submit"
              className={buttonVariants({
                size: "default",
                className:
                  "w-full py-2 rounded-xl bg-black text-white shadow-lg dark:bg-white dark:text-black",
              })}
            >
              SignUp
            </button>
          </form>
          {/* google signIn */}

          {/* <div className="flex items-center justify-center mt-6 w-full">
            <div className="w-full h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500 mx-3 text-nowrap">
              Or sign in with
            </span>
            <div className="w-full h-px bg-gray-300"></div>
          </div>
          <div className="flex justify-center mt-4">
            <FcGoogle
              size={40}
              onClick={signinWithGoogleHandler}
              className="cursor-pointer"
            />
          </div> */}

          {/* register page for signup */}

          {/* <div className="flex items-center justify-center mt-6">
            <span className="text-sm text-gray-500">
              Don&apos;t have an account?
            </span>
            <TransitionLink
              href="/"
              className="ml-1 text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Register
            </TransitionLink>
          </div> */}
        </div>
      </MaxWidthWrapper>
      <div>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
