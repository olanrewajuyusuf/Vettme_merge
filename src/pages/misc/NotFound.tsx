import images from "@/assets/Images";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full h-screen gap-6">
      <div className="h-16 flex items-center px-6">
        <img src={images.logo} alt="Vettme" className="w-[80px]" />
      </div>
      <div className="w-full mt-20 flex items-center gap-[4vw] pl-[10vw]">
        <img
          src={images.notFound}
          alt="Not Found Image"
          className="w-[200px]"
        />
        <div className="flex flex-col gap-4">
          <h1 className="font-black text-4xl">Page Not Found</h1>
          <p>
            Sorry, the page you're looking for does not exist yet. Let's take
            you back home
          </p>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button className="pry-btn">Go Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}