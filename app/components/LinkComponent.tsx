import { useState } from "react";
import { NavLink } from "react-router";

export const LinkComponent = ({ to, label, icons }: { to: string; label: string; icons: { active: string; default: string, hover: string } }) => {
    const [mouseEnter, setMouseEnter] = useState(false);
  return (
    <NavLink
          to={to}
          end
          onMouseEnter={() => {
            setMouseEnter(true);
          }}
          onMouseLeave={() => {
            setMouseEnter(false);
          }}
        >
            {({ isActive }) => (
                <>
                    <img className="w-5" src={isActive ?  mouseEnter ? icons.hover : icons.active : mouseEnter ? icons.hover : icons.default} alt={label} />
                </>
            )}
    </NavLink>
        
  )
}
