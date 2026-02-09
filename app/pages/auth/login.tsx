import { AuthComponent } from "~/components/AuthComponent"
export function Login() {
  return (
    <AuthComponent title={"Login"} actionText="Login to your account" to="/auth/signup" linkText="Sign Up" linkDescription="Don't have an account?">
      <div className="flex flex-col gap-4">
        <label hidden htmlFor="email" className="px-2">Email</label>
        <input type="email" id="email" placeholder="Email" className="border-b-2 border-blue-500 pb-4 px-4" />
      </div>
      <div className="flex flex-col gap-4">
        <label hidden htmlFor="password" className="px-2">Password</label>
        <input type="password" id="password" placeholder="Password" className="border-b-2 border-blue-500 pb-4 px-4" />
      </div>
    </AuthComponent>
  )
}
