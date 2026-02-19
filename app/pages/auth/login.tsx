import { AuthComponent } from "~/components/AuthComponent"
import { useAuthValidation } from "~/hooks/auth";
export function Login() {
  const { formData, errors, validate, validateInput } = useAuthValidation();
  return (
    <AuthComponent title={"Login"} actionText="Login to your account" to="/auth/signup" linkText="Sign Up" linkDescription="Don't have an account?" 
    onValidate={validate}>
      <div className="flex flex-col gap-4 relative">
        <label hidden htmlFor="email" className="px-2">Email</label>
        <input value={formData.email} onChange={validateInput} type="email" name="email" id="email" placeholder="Email" className={`border-b-2  pb-4 px-4 ${errors.email ? 'border-red-500' : 'border-blue-500'}`} />
        {errors.email && <span className="text-red-500 text-sm absolute top-[5%] right-2">{errors.email}</span>}
      </div>
      <div className="flex flex-col gap-4 relative">
        <label hidden htmlFor="password" className="px-2">Password</label>
        <input value={formData.password} onChange={validateInput} type="password" name="password" id="password" placeholder="Password" className={`border-b-2  pb-4 px-4 ${errors.password ? 'border-red-500' : 'border-blue-500'}`} />
        {errors.password && <span className="text-red-500 text-sm absolute top-[5%] right-2">{errors.password}</span>}
      </div>
    </AuthComponent>
  )
}
