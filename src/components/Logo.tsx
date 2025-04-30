import images from "@/assets/Images";
export default function Logo() {
  return (
    <div className="w-full h-[50px] mt-8 flex items-center justify-center">
      <img src={images.logo} alt="Vettme Logo" className="w-[110px]" />
    </div>
  );
}