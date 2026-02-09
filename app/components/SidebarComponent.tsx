import { Link } from "react-router";
import Logo from "../img/logo.svg";
import Avatar from "../img/image-avatar.png";
import { NavigationComponent } from "./NaviagtionComponent";
import { useTheme } from "../contexts/ThemeContext";
export const SidebarComponent = () => {
    const { isDark, toggleTheme } = useTheme();
  return (
        <div className="lg:d-none lg:pr-0 block pr-8">
            <div id="sidebar" className={`lg:mb-0 mb-6 fixed lg:w-24 w-full left-8 lg:rounded-[20px] lg:py-[33.7px] sm:py-[23.2px] md:py-[23.2px] z-10 rounded-[10px] lg:h-185 h-18 flex lg:flex-col flex-row items-center justify-between lg:px-0 px-6 ${isDark ? 'bg-blue-900' : 'bg-white-300'}`}>
                <div className="flex lg:flex-col w-full items-center">
                <img src={Logo} alt="Logo" className="lg:mb-6 mb-0 w-8"/>
                <NavigationComponent />              
                </div>

                {/* Account */}
                <div className="">

                {/* Theme switch */}
                <button className="text-white" onClick={toggleTheme}>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
                    >
                    <path
                        d="M12 4V2M12 22v-2M4 12H2m20 0h-2M4.22 4.22l-1.42-1.42M20.78 20.78l-1.42-1.42M4.22 19.78l-1.42 1.42M20.78 3.22l-1.42 1.42"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                    </svg>
                </button>

                <Link  to="/account">
                    <img className="w-10 h-10 border border-white rounded-full" src={Avatar} alt="Account" />
                </Link>
                </div>
                {/* Account */}
            </div>
        </div>
  )
}
