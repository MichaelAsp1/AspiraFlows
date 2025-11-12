import { IconCalendar, IconChart, IconDb, IconShield, IconSpark, IconTarget, IconZap } from "./Icons";

export const SITE = {
  brand: "AspiraFlows",
};

export const HOW_IT_WORKS = [
  {
    title: "Audit",
    desc: "We identify repetitive processes and the tools you already use. Quick wins first.",
    icon: <IconTarget />,
  },
  {
    title: "Build",
    desc: "We connect your stack with AI and no-code workflows. Data in, outcomes out.",
    icon: <IconSpark />,
  },
  {
    title: "Optimize",
    desc: "We add tracking and dashboards, then iterate to improve speed and outcomes.",
    icon: <IconChart />,
  },
];

export const USE_CASES = [
  {
    title: "Real Estate",
    desc: "Automate property lead capture, buyer follow-ups, and agent scheduling.",
    icon: <IconCalendar />,
  },
  {
    title: "Wellness & Spas",
    desc: "Streamline bookings, reminders, and client re-engagement with smart sequences.",
    icon: <IconShield />,
  },
  {
    title: "Agencies",
    desc: "Prospect research, multi-contact outreach, and performance dashboards.",
    icon: <IconZap />,
  },
  {
    title: "B2B Services",
    desc: "Investor/partner sourcing, AI-personalized outreach, CRM hygiene.",
    icon: <IconDb />,
  },
];

export const SYSTEMS = [
  {
    title: "Lead Generation Pipelines",
    desc: "From job signals or listings to verified contacts and enriched profiles.",
    icon: <IconTarget />,
    points: ["Source → Enrich → Verify", "Role mapping (DM / influencer / user)", "Email + LinkedIn ready"],
  },
  {
    title: "AI Messaging Engines",
    desc: "On-brand introductions, icebreakers, and follow-ups tailored to role and company.",
    icon: <IconSpark />,
    points: ["Few-shot prompts", "Role-aware personalization", "Sequence logic & throttling"],
  },
  {
    title: "CRM & Workflow Automation",
    desc: "Sync forms, emails, and pipelines with Airtable / HubSpot / Notion.",
    icon: <IconDb />,
    points: ["Deduping & hygiene", "Auto-tasks & reminders", "Slack / email alerts"],
  },
  {
    title: "Analytics & Insight Dashboards",
    desc: "Visibility from send → reply → meeting. Know what to scale.",
    icon: <IconChart />,
    points: ["Funnel metrics", "Cohort views", "At-a-glance KPIs"],
  },
];

export const RESULTS = [
  { kpi: "6+ hrs/week saved", desc: "Fewer manual tasks & faster follow-ups.", icon: <IconCalendar /> },
  { kpi: "2–3× more responses", desc: "Role-aware outreach and consistent sending.", icon: <IconSpark /> },
  { kpi: "Clean, live data", desc: "Dashboards with the metrics that matter.", icon: <IconChart /> },
];
