import features from "@/components/data/features";
import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import workingSteps from "@/components/data/working";
import { faqData } from "@/components/data/faq";
import { Arrow } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
export default function Home() {
  return (
    <div>
      <div className="grid-background"></div>

      <HeroSection />

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 space-y-8 md:px-6">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center">
            Powerful Features For Your Career Growth
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 hover:border-amber-400">
            {features.map((feature, index) => {
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg hover:border-blue-300 hover:-translate-y-2 hover:shadow-secondary-foreground transition-all duration-300 ease-in-ou hover:cursor-pointer"
                >
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <h1 className="text-4xl">{feature.icon}</h1>
                      <h3 className="text-2xl font-extrabold text-center">
                        {feature.title}
                      </h3>
                      <p className="py-4 text-gray-500 italic hover:text-sky-300">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 px-10 lg:py-32 bg-background">
        <div className="container mx-auto px-4 space-y-8 md:px-10">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center">
              How It Works?
            </h2>
            <p className="text-xl text-center mt-5 text-gray-400">
              Four simple steps to accelerate your career growth
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 hover:border-amber-400">
            {workingSteps.map((step, index) => {
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg hover:border-blue-300 hover:-translate-y-2 hover:shadow-secondary-foreground transition-all duration-300 ease-in-ou hover:cursor-pointer"
                >
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <h1 className="text-4xl">{step.icon}</h1>
                      <br></br>
                      <h3 className="text-2xl font-extrabold text-center">
                        {step.title}
                      </h3>
                      <p className="py-4 text-gray-500 italic hover:text-sky-300">
                        {step.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 px-10 lg:py-32 bg-background">
        <div className="container mx-auto px-4 space-y-8 md:px-10">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-center mt-5 text-gray-400">
              Find answers to some common questions about the app
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <Accordion type="single" collapsible>
            {faqData.map((faqData, index) => {
              return (
                
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faqData.question}</AccordionTrigger>
                    <AccordionContent> {faqData.answer}</AccordionContent>
                  </AccordionItem>
               
              );
            })}
             </Accordion>
          </div>
        </div>
      </section>
       <section className="w-full">
        <div className="mx-auto py-24 gradient rounded-lg">
          <div className="flex flex-col space-y-6 items-center justify-center max-w-3xl text-center mx-auto px-4">
            <h2 className="text-2xl  lg:text-5xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center text-primary-foreground">
              Ready for onboarding and getting better?
            </h2>
            <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
              Join us today and take the first step towards a smarter career journey!
            </p>
            <Link href='/dashboard' passHref>
            <Button
               size='lg'
               variant='secondary'
               className='h-11 mt-5 animate-bounce'>
                Start Your Journey today! <ArrowRight className="ml-2 h-4 w-4" />
               </Button>
            </Link>
          </div>
         
        </div>
      </section>
    </div>
  );
}
