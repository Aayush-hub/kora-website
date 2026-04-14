
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

import EmotionalSection from "@/components/EmotionalSection";
import ConversationalQuiz from "@/components/ConversationalQuiz";
import LandValueStats from "@/components/LandValueStats";
import VideoBreakSection from "@/components/VideoBreakSection";
import StorytellingSection from "@/components/StorytellingSection";
import ValueProposition from "@/components/ValueProposition";
import FreedomSection from "@/components/FreedomSection";
import KoraPromise from "@/components/KoraPromise";
import SiteVisitSection from "@/components/SiteVisitSection";
import PlotGallery from "@/components/PlotGallery";
import SocialProof from "@/components/SocialProof";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
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
  </div>
);

export default Index;
