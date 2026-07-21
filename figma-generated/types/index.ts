// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  children?: { href: string; label: string }[];
}

export type PersonRole = "student" | "teacher" | "alumni" | "staff";

export interface PersonProfile {
  id: string;
  name: string;
  role: PersonRole;
  avatar: string;
  avatarColor: string;
  series?: string;
  roll?: string;
  designation?: string;
  department?: string;
  email?: string;
  phone?: string;
  emailPublic?: boolean;
  phonePublic?: boolean;
  year?: string;
  company?: string;
  companyRole?: string;
  location?: string;
  linkedin?: string;
  specializations?: string[];
  courses?: string[];
  office?: string;
  graduationYear?: string;
  hometown?: string;
  bio?: string;
  publications?: { title: string; journal: string; year: string }[];
  career?: { year: string; role: string; company: string }[];
  postCount: number;
}

export interface FeedComment {
  authorId: string;
  text: string;
  time: string;
}
export interface FeedPost {
  id: string;
  authorId: string;
  content: string;
  imageUrl?: string;
  imageAlt?: string;
  timestamp: string;
  likes: number;
  tag?: string;
  comments: FeedComment[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  time: string;
}
export interface ChatConversation {
  id: string;
  participantId: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  messages: ChatMessage[];
}

export interface ClassEntry {
  subject: string;
  code: string;
  room: string;
  teacher: string;
  type: "class" | "lab";
  periodsStart: number;
  periodsCount: number;
}

export interface NoteReference {
  label: string;
  url: string;
}
export interface NoteAttachment {
  name: string;
  fileType: "pdf" | "image" | "doc";
  size: string;
}
export interface Note {
  id: string;
  title: string;
  semester: string;
  courseCode: string;
  courseName: string;
  topic: string;
  tags: string[];
  editorMode: "rich" | "latex";
  content: string;
  references: NoteReference[];
  attachments: NoteAttachment[];
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
  contributor?: string;
}

export interface GradeRow {
  id: string;
  subject: string;
  credits: string;
  marks: string;
}

export type PomodoroMode = "focus" | "short" | "long";

export interface AlumniMapEntry extends PersonProfile {
  lat: number;
  lng: number;
  country: string;
  city: string;
}
