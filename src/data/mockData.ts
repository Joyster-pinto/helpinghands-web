import { Beneficiary, Transaction, TrustMember, Activity, Meeting, Sponsor, Alumni, User } from '@/types';

// Sourced exclusively from MongoDB Atlas
export const mockUsers: User[] = [
  { id: 'u1', name: 'Fr. Administrator', email: 'admin@helpinghands-team.org', password: 'admin123', role: 'admin', phone: '+91 98419 29299', isActive: true, lastLogin: '2026-07-24T08:00:00Z', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'u2', name: 'John Treasurer', email: 'treasurer@helpinghands-team.org', password: 'treasurer123', role: 'treasurer', phone: '+91 98419 29298', isActive: true, lastLogin: '2026-07-23T14:00:00Z', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'u3', name: 'Mary Member', email: 'member@helpinghands-team.org', password: 'member123', role: 'trust_member', phone: '+91 98419 29297', isActive: true, lastLogin: '2026-07-22T10:00:00Z', createdAt: '2024-03-15T00:00:00Z' },
  { id: 'u4', name: 'Peter Auditor', email: 'auditor@helpinghands-team.org', password: 'auditor123', role: 'auditor', phone: '+91 98419 29296', isActive: true, lastLogin: '2026-07-20T09:00:00Z', createdAt: '2024-06-01T00:00:00Z' },
  { id: 'u5', name: 'Alumni User', email: 'alumni@helpinghands-team.org', password: 'alumni123', role: 'alumni', phone: '+91 98419 29295', isActive: true, lastLogin: '2026-07-24T12:00:00Z', createdAt: '2024-07-01T00:00:00Z' },
];

export const mockBeneficiaries: Beneficiary[] = [];
export const mockTransactions: Transaction[] = [];
export const mockMembers: TrustMember[] = [];
export const mockActivities: Activity[] = [];
export const mockMeetings: Meeting[] = [];
export const mockSponsors: Sponsor[] = [];
export const mockAlumni: Alumni[] = [];

export const dashboardStats = {
  totalBeneficiaries: 64,
  beneficiariesGrowth: '+8 this year',
  activeSponsors: 14,
  sponsorsGrowth: '+3 this year',
  totalFundsRaised: 2850000,
  currentBalance: 750000,
};
