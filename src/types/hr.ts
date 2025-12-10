export type PersonnelCategory = 'specialist_doctor' | 'occupational_doctor' | 'pharmacist' | 'dentist' | 'paramedical';

export type PromotionDuration = 'minimum' | 'average' | 'maximum';
export type PromotionStatus = 'pending' | 'approved' | 'rejected';

export interface Grade {
  id: string;
  code: string;
  designationEn: string;
  designationFr: string;
  designationAr: string;
}

export interface Body {
  id: string;
  code: string;
  designationEn: string;
  designationFr: string;
  designationAr: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  headCount: number;
}

export interface Domain {
  id: string;
  name: string;
  specialties: string[];
}

export interface Personnel {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  originalRank: string;
  currentRank: string;
  reference: string;
  step: number;
  category: PersonnelCategory;
  departmentId: string;
  specialty?: string;
  hireDate: string;
  status: 'active' | 'retired' | 'transferred' | 'on_leave';
  imageUrl?: string;
}

export interface Promotion {
  id: string;
  personnelId: string;
  previousRank: string;
  newRank: string;
  previousStep: number;
  newStep: number;
  duration: PromotionDuration;
  effectiveDate: string;
  decisionNumber: string;
  status?: PromotionStatus;
  rejectionReason?: string;
}

export interface Retiree {
  id: string;
  personnelId: string;
  retirementDate: string;
  yearsOfService: number;
  lastRank: string;
  lastStep: number;
}

export type SalaryRequestStatus = 'pending' | 'under_review' | 'approved' | 'rejected';

export interface SalaryRequest {
  id: string;
  personnelId: string;
  currentSalary: number;
  requestedSalary: number;
  requestedIncrease: number; // percentage
  justification: string;
  status: SalaryRequestStatus;
  submittedDate: string;
  reviewedDate?: string;
  reviewedBy?: string;
  reviewComments?: string;
  effectiveDate?: string;
}

export interface GradeAssignment {
  id: string;
  personnelId: string;
  gradeId: string;
  assignedDate: string;
  effectiveDate: string; // Can be different if delayed
  notes?: string; // e.g., "Delayed due to sick leave"
  modifiedBy?: string;
  modifiedDate?: string;
}
