import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

const EmotionalSection = lazy(() => import("@/components/EmotionalSection"));
const ConversationalQuiz = lazy(() => import("@/components/ConversationalQuiz"));
const LandValueStats = lazy(() => import("@/components/LandValueStats"));
const VideoBreakSection = lazy(() => import("@/components/VideoBreakSection"));
const StorytellingSection = lazy(() => import("@/components/StorytellingSection"));
const ValueProposition = lazy(() => import("@/components/ValueProposition"));
const FreedomSection = lazy(() => import("@/components/FreedomSection"));
const KoraPromise = lazy(() => import("@/components/KoraPromise"));
const SiteVisitSection = lazy(() => import("@/components/SiteVisitSection"));
const PlotGallery = lazy(() => import("@/components/PlotGallery"));
const SocialProof = lazy(() => import("@/components/SocialProof"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <Suspense fallback={null}>
      <EmotionalSection />
      <ConversationalQuiz />
      <LandValueStats />
      <VideoBreakSection />
      <StorytellingSection />
      <ValueProposition />
      <FreedomSection />
      <KoraPromise />
      <SiteVisitSection />
      <PlotGallery />
      <SocialProof />
      <FAQSection />
      <CTASection />
      <Footer />
      <WhatsAppButton />
    </Suspense>
  </div>
);

export default Index;
