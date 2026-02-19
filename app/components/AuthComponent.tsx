import {Link} from "react-router";
import Logo from '../img/logo.svg';
export const AuthComponent = ({title, children, actionText, linkText, to, linkDescription, onValidate}: {title: string, children: React.ReactNode, actionText: string, linkText: string, to: string, linkDescription: string, onValidate: (e: React.MouseEvent<HTMLButtonElement>) => void}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
        <img src={Logo} alt="Logo" className="w-8 h-[25.6px]" />
        <div className="flex flex-col mt-20 rounded-[20px] p-8 max-w-100 w-full min-h-93.25 bg-blue-900 text-white">
            <h1 className="text-[32px] mb-10 font-normal">{title}</h1>
            <div className="flex flex-col gap-y-6">
              {children}
            </div>
            <button onClick={onValidate} className="mt-10 hover:bg-white hover:text-blue-950 cursor-pointer w-full bg-red-500 h-12 text-white py-2 px-4 rounded">{actionText}</button>
            <div className="flex mt-6 gap-4 items-center justify-center">
                <p className="m-0 text-sm">{linkDescription}</p>
                <div>
                    <Link to={to} className="mt-6 text-red-500">{linkText}</Link>
                </div>
            </div>
        </div>
    </div>
  )
}
