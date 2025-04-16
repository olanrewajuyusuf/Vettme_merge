import images from "@/assets/Images";

const Nav = ({title}: {title: string | undefined}) => {
  return (
    <div className="w-full bg-white h-[70px] flex justify-between items-center px-0 md:px-5 mb-5 border-b-[1px] border-stroke-clr">
        <img src={images.logo} alt="Vettme" className="h-8 pl-5" />

        <div className="w-full bg-white h-[70px] flex items-center justify-end px-[30px] gap-1 md:gap-2 border-b-[1px] border-stroke-clr">
              <span className="w-8 h-8 sm:w-[40px] sm:h-[40px] rounded-full grid place-items-center text-white border-[1px] bg-blue-400">
                {title?.slice(0, 2).toUpperCase()}
              </span>
              <hr className="h-7 w-[1px] bg-stroke-clr" />
              <p className="font-medium"><span className="text-blue-400">{title}</span></p>
        </div>
    </div>
  )
}

export default Nav;