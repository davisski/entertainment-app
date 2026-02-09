import { AuthComponent } from "~/components/AuthComponent"
export function Signup() {
  return (
    <AuthComponent title={"Sign Up"} actionText="Create your account" to="/auth/login" linkText="Login" linkDescription="Already have an account?">
        <div className="flex flex-col gap-4">
            <label hidden htmlFor="email" className="px-2">Email</label>
            <input type="email" id="email" placeholder="Email" className="border-b-2 border-blue-500 pb-4 px-4" />
        </div>
        <div className="flex flex-col gap-4">
            <label hidden htmlFor="password" className="px-2">Password</label>
            <input type="password" id="password" placeholder="Password" className="border-b-2 border-blue-500 pb-4 px-4" />
        </div>
        <div className="flex flex-col gap-4">
            <label hidden htmlFor="confirm-password" className="px-2">Repeat Password</label>
            <input type="password" id="confirm-password" placeholder="Repeat Password" className="border-b-2 border-blue-500 pb-4 px-4" />
        </div>
    </AuthComponent>
  )
}

