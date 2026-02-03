import playIcon from "../img/play-icon.svg";

export const HoverComponent = ({small = true} : {small: boolean}) => {
  return (
    <>
        <div className="absolute w-full h-full z-20 top-0 left-0 bg-black opacity-50 flex items-center justify-center"></div>
        <div className="absolute z-30 w-29.25 h-12 bg-white opacity-50 flex items-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] justify-evenly gap-4 rounded-full"></div>
        <div className={`translate-x-[-50%] translate-y-[-50%] absolute z-40 top-[50%] left-[${small ? '46%' : '48%'}] flex items-center gap-4`}>
            <img className="h-7.5 w-7.5" src={playIcon} alt="Play" />
            <span className="text-white">Play</span>
        </div>
    </>
  )
}
