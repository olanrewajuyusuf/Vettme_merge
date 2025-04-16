import images from "@/assets/Images";

export default function EmailVerified() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Activation process...</h1>
      <div className="mt-10 w-[300px] flex items-center justify-center flex-col text-center">
        <img src={images.key} alt="Email" className="w-[150px]" />
        <p className="mt-4">
          Your email has been verified successfully. 
          Kindly wait for the activation email within 24 hours while your 
          Company's Compliance is being verified by our back office.
        </p>
      </div>
    </div>
  );
}
