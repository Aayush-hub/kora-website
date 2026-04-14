import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Lead } from "@/types/lead";
import { motion } from "framer-motion";
import { Search, Filter, ArrowLeft, Phone, User, MapPin, Clock, Target, IndianRupee, StickyNote, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ADMIN_EMAILS = ["aayush@zappify.in", "madhav@zappify.in"];

const STATUS_OPTIONS = ["new", "called", "in_progress", "follow_up", "converted", "lost"];
const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  called: "bg-yellow-100 text-yellow-800",
  in_progress: "bg-orange-100 text-orange-800",
  follow_up: "bg-purple-100 text-purple-800",
  converted: "bg-green-100 text-green-800",
  lost: "bg-red-100 text-red-800",
};

const TIER_COLORS: Record<string, string> = {
  hot: "bg-red-500 text-white",
  warm: "bg-amber-500 text-white",
  exploring: "bg-sky-500 text-white",
};

const INTENT_LABELS: Record<string, string> = {
  farmhouse: "Weekend Farmhouse",
  investment: "Investment & Appreciation",
  escape: "Escape City Life",
  legacy: "Family Legacy",
};

const BUDGET_LABELS: Record<string, string> = {
  "25-50L": "₹25L – ₹50L",
  "50L-1Cr": "₹50L – ₹1Cr",
  "1-3Cr": "₹1Cr – ₹3Cr",
  "3Cr+": "₹3Cr+",
};

const TIMELINE_LABELS: Record<string, string> = {
  immediate: "Immediately",
  "3months": "Within 3 months",
  "6months": "Within 6 months",
  exploring: "Just exploring",
};

const LOCATION_LABELS: Record<string, string> = {
  south: "South of Delhi",
  north: "North of Delhi",
  anywhere: "NCR outskirts",
  unsure: "Not sure",
};

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (!ADMIN_EMAILS.includes(data.user?.email || "")) {
        await supabase.auth.signOut();
        throw new Error("You don't have admin access.");
      }
      onLogin();
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-card rounded-2xl border border-border shadow-xl p-8"
      >
        <h1 className="text-display text-2xl text-foreground mb-2">Kora Living CRM</h1>
        <p className="text-muted-foreground font-body text-sm mb-8">Admin access only</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin email"
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-body font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const LeadCard = ({ lead, onStatusChange, onNotesChange }: {
  lead: Lead;
  onStatusChange: (id: string, status: string) => void;
  onNotesChange: (id: string, notes: string) => void;
}) => {
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState(lead.notes || "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <User size={14} className="text-muted-foreground" />
            <span className="font-body font-semibold text-foreground">{lead.name || "Unknown"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-muted-foreground" />
            <span className="font-body text-sm text-muted-foreground">{lead.phone || "N/A"}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${TIER_COLORS[lead.lead_tier] || "bg-muted text-muted-foreground"}`}>
            {lead.lead_tier?.toUpperCase()} • {lead.lead_score}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Target size={13} className="text-muted-foreground shrink-0" />
          <span className="font-body text-xs text-muted-foreground">{INTENT_LABELS[lead.intent || ""] || lead.intent || "—"}</span>
        </div>
        <div className="flex items-center gap-2">
          <IndianRupee size={13} className="text-muted-foreground shrink-0" />
          <span className="font-body text-xs text-muted-foreground">{BUDGET_LABELS[lead.budget || ""] || lead.budget || "—"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={13} className="text-muted-foreground shrink-0" />
          <span className="font-body text-xs text-muted-foreground">{TIMELINE_LABELS[lead.timeline || ""] || lead.timeline || "—"}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={13} className="text-muted-foreground shrink-0" />
          <span className="font-body text-xs text-muted-foreground">{LOCATION_LABELS[lead.location || ""] || lead.location || "—"}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="font-body text-xs text-muted-foreground">Status:</span>
        <select
          value={lead.status}
          onChange={(e) => onStatusChange(lead.id, e.target.value)}
          className={`px-2 py-1 rounded-lg text-xs font-medium border-0 cursor-pointer ${STATUS_COLORS[lead.status] || "bg-muted"}`}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s.replace("_", " ").toUpperCase()}</option>
          ))}
        </select>
      </div>

      <div>
        {editingNotes ? (
          <div className="flex gap-2">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-xs font-body focus:outline-none focus:ring-1 focus:ring-primary/30 resize-none"
              rows={2}
              placeholder="Add notes..."
            />
            <button
              onClick={() => { onNotesChange(lead.id, notes); setEditingNotes(false); }}
              className="px-3 py-1 rounded-lg bg-primary text-primary-foreground text-xs font-body"
            >
              Save
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditingNotes(true)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-body transition-colors"
          >
            <StickyNote size={12} />
            {lead.notes || "Add notes..."}
          </button>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-border">
        <span className="font-body text-[10px] text-muted-foreground">
          {new Date(lead.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
        </span>
      </div>
    </motion.div>
  );
};

const AdminCRM = () => {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [filterTier, setFilterTier] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session && ADMIN_EMAILS.includes(data.session.user.email || "")) {
        setAuthed(true);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!authed) return;
    fetchLeads();

    // Real-time subscription for new leads
    const channel = supabase
      .channel("leads-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "leads" },
        (payload) => {
          setLeads((prev) => [payload.new as Lead, ...prev]);
          toast.info(`New lead: ${(payload.new as Lead).name || "Unknown"}`);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "leads" },
        (payload) => {
          setLeads((prev) =>
            prev.map((l) => (l.id === (payload.new as Lead).id ? (payload.new as Lead) : l))
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [authed]);

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch leads");
      return;
    }
    setLeads(data || []);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) {
      toast.error("Failed to update status");
      return;
    }
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    toast.success("Status updated");
  };

  const updateNotes = async (id: string, notes: string) => {
    const { error } = await supabase.from("leads").update({ notes }).eq("id", id);
    if (error) {
      toast.error("Failed to save notes");
      return;
    }
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, notes } : l)));
    toast.success("Notes saved");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthed(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground font-body">Loading...</div>
      </div>
    );
  }

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  const filtered = leads.filter((l) => {
    const matchSearch =
      !search ||
      (l.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (l.phone || "").includes(search);
    const matchTier = filterTier === "all" || l.lead_tier === filterTier;
    const matchStatus = filterStatus === "all" || l.status === filterStatus;
    return matchSearch && matchTier && matchStatus;
  });

  const stats = {
    total: leads.length,
    hot: leads.filter((l) => l.lead_tier === "hot").length,
    warm: leads.filter((l) => l.lead_tier === "warm").length,
    converted: leads.filter((l) => l.status === "converted").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-display text-xl text-foreground">Kora CRM</h1>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-body transition-colors">
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Leads", value: stats.total, color: "text-foreground" },
            { label: "Hot Leads", value: stats.hot, color: "text-red-500" },
            { label: "Warm Leads", value: stats.warm, color: "text-amber-500" },
            { label: "Converted", value: stats.converted, color: "text-green-500" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground font-body mb-1">{s.label}</p>
              <p className={`text-2xl font-semibold font-body ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or phone..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-muted-foreground" />
              <select
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-card border border-border text-sm font-body cursor-pointer"
              >
                <option value="all">All Tiers</option>
                <option value="hot">Hot</option>
                <option value="warm">Warm</option>
                <option value="exploring">Exploring</option>
              </select>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-card border border-border text-sm font-body cursor-pointer"
            >
              <option value="all">All Status</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s.replace("_", " ").toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Leads Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground font-body">No leads found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onStatusChange={updateStatus}
                onNotesChange={updateNotes}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminCRM;
