import { Archive, Briefcase, FolderKanban, MessageCircle, Sparkles, type LucideIcon } from "lucide-react";

/** One icon per page section, shared by the desktop nav and the mobile tab bar. */
export const SECTION_ICONS: Record<string, LucideIcon> = {
  "#roles": Sparkles,
  "#work": FolderKanban,
  "#archive": Archive,
  "#experience": Briefcase,
  "#contact": MessageCircle,
};
