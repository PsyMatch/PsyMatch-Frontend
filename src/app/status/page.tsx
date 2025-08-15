import PsychologistStatus from "@/components/psychologistStatus.tsx/PsychologistStatus";

export default function StatusPage() {
  // Esto tiene que venir de la API
  const status: "pending" | "accepted" | "rejected" = "rejected";

  return <PsychologistStatus status={status} name="Dr. Federico Alvarez" />;
}