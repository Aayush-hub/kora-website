import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface QuizQuestion {
  id: string;
  botMessage: string;
  type: "options" | "text" | "final";
  options?: { label: string; value: string; score: number }[];
  placeholder?: string;
  scoreKey?: string;
}

const questions: QuizQuestion[] = [
  {
    id: "greeting",
    botMessage: "Hi there! 👋 I'm so glad you're here. Let me help you find the perfect piece of land. First, what brings you to Kora Living?",
    type: "options",
    scoreKey: "intent",
    options: [
      { label: "🏡 I want a weekend farmhouse", value: "farmhouse", score: 3 },
      { label: "📈 Investment & appreciation", value: "investment", score: 4 },
      { label: "🌿 Escape from city life", value: "escape", score: 3 },
      { label: "🎁 Legacy for my family", value: "legacy", score: 5 },
    ],
  },
  {
    id: "budget",
    botMessage: "Great choice! Now, what's your comfortable investment range?",
    type: "options",
    scoreKey: "budget",
    options: [
      { label: "₹25 Lakh – ₹50 Lakh", value: "25-50L", score: 2 },
      { label: "₹50 Lakh – ₹1 Crore", value: "50L-1Cr", score: 4 },
      { label: "₹1 Crore – ₹3 Crore", value: "1-3Cr", score: 5 },
      { label: "₹3 Crore+", value: "3Cr+", score: 5 },
    ],
  },
  {
    id: "timeline",
    botMessage: "Perfect. And when are you looking to make this happen?",
    type: "options",
    scoreKey: "timeline",
    options: [
      { label: "Immediately — I'm ready", value: "immediate", score: 5 },
      { label: "Within 3 months", value: "3months", score: 4 },
      { label: "Within 6 months", value: "6months", score: 3 },
      { label: "Just exploring for now", value: "exploring", score: 1 },
    ],
  },
  {
    id: "location",
    botMessage: "Wonderful! Do you have a preferred location in mind?",
    type: "options",
    scoreKey: "location",
    options: [
      { label: "South of Delhi (Sohna/Manesar)", value: "south", score: 4 },
      { label: "North of Delhi (Sonipat/Kundli)", value: "north", score: 3 },
      { label: "NCR outskirts — anywhere green", value: "anywhere", score: 4 },
      { label: "Not sure, guide me", value: "unsure", score: 3 },
    ],
  },
  {
    id: "name",
    botMessage: "You have excellent taste! 😊 What should I call you?",
    type: "text",
    placeholder: "Your name",
    scoreKey: "name",
  },
  {
    id: "phone",
    botMessage: "And your phone number so our land advisor can reach you?",
    type: "text",
    placeholder: "Your phone number",
    scoreKey: "phone",
  },
  {
    id: "final",
    botMessage: "",
    type: "final",
  },
];

const TypingIndicator = () => (
  <div className="chat-bubble-bot flex items-center gap-1.5 py-4 w-20">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="w-2 h-2 rounded-full bg-muted-foreground/40"
        style={{ animation: `typing-dot 1.2s ${i * 0.2}s infinite` }}
      />
    ))}
  </div>
);

const ConversationalQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [messages, setMessages] = useState<{ type: "bot" | "user"; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const [textInput, setTextInput] = useState("");
  const [leadScore, setLeadScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      scrollToBottom();
    });
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (currentStep < questions.length && questions[currentStep].type !== "final") {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { type: "bot", text: questions[currentStep].botMessage }]);
      }, 1200);
      return () => clearTimeout(timer);
    }
    if (currentStep < questions.length && questions[currentStep].type === "final") {
      setIsTyping(true);
      const score = leadScore;
      const tier = score >= 15 ? "hot" : score >= 10 ? "warm" : "exploring";
      const finalMsg =
        tier === "hot"
          ? `Amazing, ${responses.name || "friend"}! Based on what you've told me, I can see you're serious about this. You qualify for an exclusive site visit. Let me connect you with our land advisor right away.`
          : tier === "warm"
            ? `Thank you, ${responses.name || "friend"}! You're clearly thinking about this the right way. Let me send you our detailed project brochure and available plots.`
            : `Thank you for your interest, ${responses.name || "friend"}! I'll share some information about Kora Living so you can explore at your own pace.`;

      const timer = setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { type: "bot", text: finalMsg }]);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const saveLead = async (latestResponses = responses, currentScore = leadScore) => {
    setIsSubmitting(true);
    try {
      const score = currentScore;
      const tier = score >= 15 ? "hot" : score >= 10 ? "warm" : "exploring";

      const { error } = await supabase.from("leads").insert({
        name: latestResponses.name || null,
        phone: latestResponses.phone || null,
        intent: latestResponses.intent || null,
        budget: latestResponses.budget || null,
        timeline: latestResponses.timeline || null,
        location: latestResponses.location || null,
        lead_score: score,
        lead_tier: tier,
        status: "new",
      });

      if (error) throw error;
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error saving lead:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOption = (option: { label: string; value: string; score: number }) => {
    const q = questions[currentStep];
    setResponses((prev) => ({ ...prev, [q.scoreKey || q.id]: option.value }));
    setLeadScore((prev) => prev + option.score);
    setMessages((prev) => [...prev, { type: "user", text: option.label }]);
    setCurrentStep((prev) => prev + 1);
  };

  const handleText = () => {
    if (!textInput.trim()) return;
    const q = questions[currentStep];
    const newResponses = { ...responses, [q.scoreKey || q.id]: textInput };
    setResponses(newResponses);
    setMessages((prev) => [...prev, { type: "user", text: textInput }]);
    setTextInput("");
    setCurrentStep((prev) => prev + 1);

    if (q.scoreKey === "phone") {
      saveLead(newResponses, leadScore);
    }
  };

  const progress = Math.min((currentStep / (questions.length - 1)) * 100, 100);
  const currentQ = currentStep < questions.length ? questions[currentStep] : null;
  const isComplete = currentQ?.type === "final" && !isTyping;

  return (
    <section id="quiz" className="section-padding bg-earth-warm">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
            Let's find your perfect match
          </p>
          <h2 className="text-display text-3xl md:text-4xl text-foreground">
            A quick <span className="italic text-forest">conversation</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden border border-border bg-background shadow-xl"
        >
          {/* Progress */}
          <div className="px-6 pt-5 pb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-body tracking-wider uppercase">Progress</span>
              <span className="text-xs text-muted-foreground font-body">{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-forest"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Chat area */}
          <div ref={chatContainerRef} className="h-[420px] overflow-y-auto px-6 py-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={msg.type === "bot" ? "chat-bubble-bot" : "chat-bubble-user"}>
                    <p className="text-sm leading-relaxed font-body">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <TypingIndicator />
              </motion.div>
            )}
          </div>

          {/* Input area */}
          <div className="border-t border-border px-6 py-4">
            {!isTyping && currentQ && currentQ.type === "options" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-2"
              >
                {currentQ.options?.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleOption(opt)}
                    className="px-4 py-2.5 rounded-full text-sm font-body border border-border bg-background hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    {opt.label}
                  </button>
                ))}
              </motion.div>
            )}

            {!isTyping && currentQ && currentQ.type === "text" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleText()}
                  placeholder={currentQ.placeholder}
                  className="flex-1 px-4 py-3 rounded-full bg-muted border border-border text-sm font-body focus:outline-none focus:ring-2 focus:ring-forest/30"
                />
                <button
                  onClick={handleText}
                  className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-forest-light transition-colors"
                >
                  <Send size={16} />
                </button>
              </motion.div>
            )}

            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="flex items-center gap-2 text-forest">
                  <CheckCircle2 size={20} />
                  <span className="text-sm font-body font-medium">Thank you for your response</span>
                </div>
                <button
                  className="btn-primary w-full"
                  onClick={() => {
                    const message = encodeURIComponent("Hi! I'm interested in Kora Living farmland plots. Can you share more details?");
                    window.open(`https://wa.me/919992511098?text=${message}`, '_blank');
                  }}
                >
                  {leadScore >= 15 ? "Book Site Visit" : "Get Details on WhatsApp"}
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConversationalQuiz;
