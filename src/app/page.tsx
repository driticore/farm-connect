import FloatingFruits from "@/components/FloatingFruits";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ChatButton } from "@/components/MobileAppButton";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { CheckCircle2Icon, HandshakeIcon, MessageCircle, TruckIcon } from "lucide-react";
import Link from "next/link";

interface Perk {
  name: string;
  Icon: React.ElementType;
  description: string;
}

const perks: Perk[] = [
  {
    name: "Fresh Delivery from the farm",
    Icon: TruckIcon,
    description: "Enjoy fresh produce delivered straight to your doorstep in minutes through our innovative Farm-To-House system. Learn more on our about page."
  },
  {
    name: "Building a community",
    Icon: HandshakeIcon,
    description: "At FarmConnect, we believe in the power of community. Join our thriving network of farmers and buyers, where you can foster meaningful connections, share valuable insights, and promote sustainable agriculture for a healthier future."
  },
  {
    name: "Quality & Affordable",
    Icon: CheckCircle2Icon,
    description: "We're committed to providing the highest quality, farm-fresh products at prices that won't break the bank. Enjoy the best of both worlds with our range of affordable, premium goods, ensuring that everyone can access healthy, sustainable produce."
  },
];

const Home = () => {
  return (
    <>
      <div className="background-canvas"><FloatingFruits/></div>
      
      <MaxWidthWrapper className="min-w-full min-h-[87.5vh] relative">
        
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-4xl relative">
          //Heading - Hook
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Discover Your Perfect Harvest: FarmConnect - Your Gateway to{" "}
            <span className="text-green-800">
              Fresh, Local Produce and Sustainable Farming!
            </span>
            .
          </h1>
          //Subheading
          <p className="mt-6 text-lg max-w-prose">
            Showcase your farm's products, connect with potential buyers, and effortlessly track your sales.
            Join our community today and be part of the future of farming!
          </p>

          //Buttons
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products" passHref>
              <Button className={cn(buttonVariants(), "bg-black")}>
                Browse Market
              </Button>
            </Link>
            <Button variant='secondary'>Join our community &rarr;</Button>
          </div>
        </div>
      </MaxWidthWrapper>
      
      <section>
        <AuroraBackground>
          <MaxWidthWrapper className="py-20">
            <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-y-0">
              {perks.map((perk) => (
                <div 
                  key={perk.name} 
                  className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
                  <div className="md:flex-shrink-0 flex justify-center">
                    <div className="h-16 w-16 flex items-center justify-center rounded-full bg-green-500 text-black">
                      <perk.Icon className="w-1/3 h-1/3" />
                    </div>
                  </div>

                  <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                    <h3 className="text-base font-medium text-green-500">{perk.name}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{perk.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </MaxWidthWrapper>
        </AuroraBackground>
      </section>
      
      <div className="relative sm:w-[350px] sm:appearance-none">
        <ChatButton className="fixed right-10 bottom-9 flex items-center justify-center">
          <MessageCircle/>
        </ChatButton>
      </div>
    </>
  );
};

export default Home;
