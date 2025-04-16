import images from "@/assets/Images";

export default function ScreenNotice() {
  return (
    <div className="w-full h-full px-[4vw] my-6">
      <img src={images.logo} alt="" className="h-8" />
      <div className="flex items-center justify-center w-full h-full flex-col gap-12">
        <img
          src={images.screens}
          alt=""
          className="max-w-[400px] w-full mx-auto -mt-[30vh]"
        />
        <h2 className="text-center">
          You'll need a bigger screen to use this app
        </h2>
      </div>
    </div>
  );
}
