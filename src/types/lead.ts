export interface Lead {
  id: string;
  created_at: string;
  name: string | null;
  phone: string | null;
  intent: string | null;
  budget: string | null;
  timeline: string | null;
  location: string | null;
  lead_score: number;
  lead_tier: string;
  status: string;
  notes: string | null;
}

export type LeadInsert = Omit<Lead, 'id' | 'created_at'>;
