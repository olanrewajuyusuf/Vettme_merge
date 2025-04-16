import { ServicesCarousel } from "@/components/ServicesCarousel";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ArrowBigRight } from "lucide-react";


export default function Dashboard() {
  return (
    <>
    <div className="grid grid-cols-3 gap-5">
      <Card className="p-8 col-span-2">
        <CardTitle>
          <h1>Welcome to <span className="text-destructive">Vettme</span>!</h1>
        </CardTitle>
        <CardDescription className="my-5">
          Your best 3 in 1 verification solution.<br/> Gives control to the information
          and data of your Employees, Loan applicants, Logistic Drivers and more.
        </CardDescription>
        <div className="mt-10">
          <Button className="blue-red-gradient">Get Started <ArrowBigRight /></Button>
        </div>
      </Card>
      <ServicesCarousel />
    </div>
    </>
  )
}
