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
    {name: "Vettme Basic", icon: <FaBarsProgress />},
    {name: "Vettme PRO", icon: <GiProgression />},
    {name: "Vettme API", icon: <FaLaptopCode />},
  ]

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
    >
      <CarouselContent>
        {services.map((service, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="aspect-square text-center p-8">
                    <h3 className="text-2xl">{service.name}</h3>
                    <span className="roll h-full text-9xl text-gray-300 flex items-center justify-center">{service.icon}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
