import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { FaBarsProgress } from "react-icons/fa6"
import { GiProgression } from "react-icons/gi"
import { FaLaptopCode } from "react-icons/fa"


export function ServicesCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  const services = [
    {name: "Vettme Basic", icon: <FaBarsProgress />, image: "/service1.png", color: "bg-destructive"},
    {name: "Vettme PRO", icon: <GiProgression />, image: "/service2.png", color: "bg-purple-500"},
    {name: "Vettme API", icon: <FaLaptopCode />, image: "/service3.png", color: "bg-blue-500"},
  ]

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
    >
      <CarouselContent >
        {services.map((service, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="overflow-hidden">
                <CardContent className={`relative ${service.color} aspect-square text-center p-8 flex flex-col-reverse items-center justify-between`}>
                  <div className="shadow-3d flex flex-col items-center justify-center gap-2 p-3 rounded-lg">
                    <span className=" text-white uppercase">{service.name}</span>
                    <span className="roll h-full text-5xl text-gray-300">{service.icon}</span>
                  </div>
                  <img src={service.image} alt="services image" className="absolute top-0 w-full h-[150px]"/>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
