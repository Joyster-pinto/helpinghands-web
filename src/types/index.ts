// ============================================================
// Helping Hands Team Trust — TypeScript Type Definitions
// ============================================================

// ---- User & Auth Types ----
export type UserRole = 'admin' | 'treasurer' | 'trust_member' | 'auditor' | 'alumni';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // hashed in production
  role: UserRole;
  avatar?: string;
  phone?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

// ---- Beneficiary Types ----
export type BeneficiaryScheme = 'school' | 'college' | 'neet';
export type BeneficiaryStatus = 'active' | 'graduated' | 'discontinued' | 'pending';
export type Gender = 'male' | 'female' | 'other';

export interface AcademicRecord {
  year: string;
  institution: string;
  grade: string;
  percentage: number;
  remarks?: string;
}

export interface SupportRecord {
  id: string;
  date: string;
  type: string; // tuition, books, uniform, exam fees, etc.
  amount: number;
  description: string;
  sponsorId?: string;
}

export interface Beneficiary {
  id: string;
  registrationDate: string;
  scheme: BeneficiaryScheme;
  status: BeneficiaryStatus;
  // Personal Details
  fullName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  gender: Gender;
  religion: string;
  caste: string;
  aadhaarNumber?: string;
  // Contact
  phone: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  // Academic
  currentInstitution: string;
  currentClass: string;
  academicRecords: AcademicRecord[];
  // Family
  familyIncome: number;
  fatherOccupation: string;
  motherOccupation: string;
  siblings: number;
  // Support
  supportRecords: SupportRecord[];
  totalSupportReceived: number;
  // Documents (paths/URLs)
  photo?: string;
  documents: string[];
  // Sponsor mapping
  sponsorId?: string;
  sponsorName?: string;
}

// ---- Transaction / Accounts Types ----
export type TransactionType = 'donation' | 'expense' | 'member_contribution' | 'sponsorship';
export type TransactionCategory = 
  | 'tuition_fees' | 'books_stationery' | 'uniforms' | 'exam_fees' 
  | 'medical' | 'travel' | 'event' | 'administration' 
  | 'general_donation' | 'specific_donation' | 'member_fee'
  | 'other';

export interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  category: TransactionCategory;
  amount: number;
  description: string;
  paidTo?: string;
  receivedFrom?: string;
  beneficiaryId?: string;
  sponsorId?: string;
  memberId?: string;
  receiptNumber?: string;
  paymentMode: 'cash' | 'bank_transfer' | 'upi' | 'cheque' | 'online';
  createdBy: string;
}

export interface FinancialSummary {
  openingBalance: number;
  closingBalance: number;
  totalDonations: number;
  totalExpenses: number;
  totalMemberContributions: number;
  totalSponsorships: number;
  period: string;
}

// ---- Trust Member Types ----
export type MemberStatus = 'active' | 'inactive' | 'honorary';
export type MemberDesignation = 
  | 'chairperson' | 'vice_chairperson' | 'secretary' 
  | 'joint_secretary' | 'treasurer' | 'member';

export interface TrustMember {
  id: string;
  name: string;
  designation: MemberDesignation;
  status: MemberStatus;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  photo?: string;
  occupation: string;
  totalContributions: number;
  bio?: string;
}

// ---- Activity Types ----
export type ActivityStatus = 'planned' | 'ongoing' | 'completed' | 'cancelled';

export interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  status: ActivityStatus;
  budget: number;
  actualSpent: number;
  beneficiariesCovered: number;
  organizer: string;
  photos: string[];
  videos: string[];
  outcome?: string;
  category: string;
}

// ---- Meeting Types ----
export type MeetingType = 'regular' | 'special' | 'agm' | 'emergency';
export type ActionItemStatus = 'pending' | 'in_progress' | 'completed' | 'overdue';

export interface ActionItem {
  id: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  status: ActionItemStatus;
  completedDate?: string;
}

export interface Meeting {
  id: string;
  title: string;
  type: MeetingType;
  date: string;
  time: string;
  venue: string;
  agenda: string[];
  attendees: string[];
  absentees: string[];
  minutesOfMeeting: string;
  resolutions: string[];
  actionItems: ActionItem[];
  documents: string[];
  createdBy: string;
}

// ---- Sponsorship Types ----
export type SponsorshipStatus = 'active' | 'completed' | 'paused' | 'cancelled';
export type SponsorType = 'individual' | 'corporate' | 'foundation';

export interface Sponsor {
  id: string;
  name: string;
  type: SponsorType;
  email: string;
  phone: string;
  address: string;
  organization?: string;
  totalCommitted: number;
  totalPaid: number;
  beneficiaries: string[]; // beneficiary IDs
  startDate: string;
  endDate?: string;
  status: SponsorshipStatus;
  communications: CommunicationLog[];
  renewalDate?: string;
}

export interface CommunicationLog {
  id: string;
  date: string;
  type: 'email' | 'phone' | 'meeting' | 'letter';
  subject: string;
  notes: string;
  followUpDate?: string;
}

// ---- Alumni Types ----
export type AlumniStatus = 'employed' | 'studying' | 'self_employed' | 'other';

export interface Alumni {
  id: string;
  name: string;
  email: string;
  phone: string;
  graduationYear: string;
  scheme: BeneficiaryScheme;
  institution: string;
  degree: string;
  currentStatus: AlumniStatus;
  currentOrganization?: string;
  currentRole?: string;
  location: string;
  achievements: string[];
  isMentor: boolean;
  isVolunteer: boolean;
  totalContributions: number;
  photo?: string;
  linkedIn?: string;
}

// ---- Report Types ----
export type ReportType = 
  | 'beneficiary' | 'financial' | 'member' 
  | 'activity' | 'meeting' | 'sponsorship' | 'alumni';

export interface ReportFilter {
  type: ReportType;
  startDate?: string;
  endDate?: string;
  scheme?: BeneficiaryScheme;
  status?: string;
}

// ---- Navigation Types ----
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  roles?: UserRole[];
  children?: NavItem[];
}

// ---- Dashboard Types ----
export interface DashboardStat {
  label: string;
  value: number | string;
  change?: number;
  changeLabel?: string;
  icon: string;
}
