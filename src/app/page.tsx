import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { DomainsSection } from "@/components/home/DomainsSection";
import { EventsPreview } from "@/components/home/EventsPreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsSection />
      <DomainsSection />
      <EventsPreview />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
