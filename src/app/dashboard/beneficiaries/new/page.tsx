"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { ArrowLeft, Check, ArrowRight, Save, User, GraduationCap, Phone, Home as HomeIcon, FileText, Award } from "lucide-react";

export default function NewBeneficiaryPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Student & Scheme
    studentName: "",
    scholarshipScheme: "Kamarajar Scholarship Scheme (School)",
    beneficiaryType: "New",
    studentContact: "",
    dob: "",
    gender: "Male",
    religion: "Hindu",
    caste: "General",
    aadhaarNumber: "",

    // Step 2: Parent & Residence
    parentName: "",
    parentContact: "",
    fatherOccupation: "",
    motherOccupation: "",
    address: "",
    residenceType: "Rental House",
    familyIncome: "",

    // Step 3: Institution & Academic Marks
    institutionName: "",
    institutionAddress: "",
    currentClassSemester: "",
    quarterlyMarks: "",
    halfYearlyMarks: "",
    annualMarks: "",
    previousSemesterMarks: "",

    // Step 4: Fees & Scholarship History
    lastYearFee: "",
    currentYearFee: "",
    availedLastYear: "No",
    availedOtherScholarship: "No",
    originalReceiptSubmitted: "No",

    // Step 5: Verification & Panel Recommendations
    marksheetsVerified: "Yes",
    missingDocuments: "",
    performanceSatisfied: "Yes",
    unsatisfiedReason: "",
    feeStructureVerified: "Yes",
    panelComments: "",
    panelRecommendation: "Strongly recommended",
  });

  const steps = [
    { number: 1, title: "Student & Scheme", icon: User },
    { number: 2, title: "Parent & Address", icon: HomeIcon },
    { number: 3, title: "Academic & Marks", icon: GraduationCap },
    { number: 4, title: "Fees & History", icon: FileText },
    { number: 5, title: "Panel Verification", icon: Award },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/dashboard/beneficiaries" className={styles.backBtn}>
          <ArrowLeft size={18} /> Back to Beneficiaries
        </Link>
        <h1 className={styles.title}>Student Beneficiary Application (Selection Interview)</h1>
      </div>

      {/* Progress Steps */}
      <div className={styles.wizardSteps}>
        {steps.map((s) => {
          const IconComp = s.icon;
          const isCompleted = currentStep > s.number;
          const isActive = currentStep === s.number;
          return (
            <div 
              key={s.number} 
              className={`${styles.stepItem} ${isActive ? styles.activeStep : ""} ${isCompleted ? styles.completedStep : ""}`}
              onClick={() => isCompleted && setCurrentStep(s.number)}
            >
              <div className={styles.stepCircle}>
                {isCompleted ? <Check size={16} /> : <IconComp size={18} />}
              </div>
              <div className={styles.stepInfo}>
                <span className={styles.stepNum}>Step {s.number}</span>
                <span className={styles.stepTitle}>{s.title}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Form Container */}
      <div className={styles.formCard}>
        {submitted ? (
          <div className={styles.successState}>
            <div className={styles.successIconBox}><Check size={48} /></div>
            <h2>Beneficiary Application Submitted!</h2>
            <p>The student application and panel recommendations have been recorded in the Trust system.</p>
            <div className={styles.successActions}>
              <Link href="/dashboard/beneficiaries" className="btn btn-primary">View All Beneficiaries</Link>
              <button onClick={() => { setSubmitted(false); setCurrentStep(1); }} className="btn btn-outline">Add Another Student</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* STEP 1: Student & Scheme */}
            {currentStep === 1 && (
              <div className={styles.stepContent}>
                <h3 className={styles.stepHeading}>Step 1: Student & Scholarship Scheme Details</h3>
                
                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                    <label>Student Name *</label>
                    <input type="text" name="studentName" required className="input" placeholder="Full name as in marksheet" value={formData.studentName} onChange={handleChange} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Scholarship Scheme Applied *</label>
                    <select name="scholarshipScheme" className="input select" value={formData.scholarshipScheme} onChange={handleChange}>
                      <option value="Kamarajar Scholarship Scheme (School)">Kamarajar Scholarship Scheme (School)</option>
                      <option value="Kalam Scholarship Scheme (College)">Kalam Scholarship Scheme (College)</option>
                      <option value="Mr.K.Thiyagarajan Scholarship Scheme (12th single parent girl child)">Mr. K. Thiyagarajan Scholarship Scheme (12th single parent girl child)</option>
                      <option value="Velicham NEET 7.5 Scholarship Scheme (12th completed Government school child)">Velicham NEET 7.5 Scholarship Scheme (12th completed Govt school child)</option>
                    </select>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Beneficiary Status *</label>
                    <select name="beneficiaryType" className="input select" value={formData.beneficiaryType} onChange={handleChange}>
                      <option value="New">New Candidate</option>
                      <option value="Existing">Existing Beneficiary (Renewal)</option>
                    </select>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Student Contact Number *</label>
                    <input type="tel" name="studentContact" required className="input" placeholder="+91 98765 43210" value={formData.studentContact} onChange={handleChange} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Date of Birth *</label>
                    <input type="date" name="dob" required className="input" value={formData.dob} onChange={handleChange} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Gender *</label>
                    <select name="gender" className="input select" value={formData.gender} onChange={handleChange}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Transgender">Transgender</option>
                    </select>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Religion</label>
                    <input type="text" name="religion" className="input" placeholder="e.g. Hindu / Muslim / Christian" value={formData.religion} onChange={handleChange} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Caste / Category</label>
                    <input type="text" name="caste" className="input" placeholder="e.g. BC / MBC / SC / ST / General" value={formData.caste} onChange={handleChange} />
                  </div>

                  <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
                    <label>Aadhaar Card Number</label>
                    <input type="text" name="aadhaarNumber" className="input" placeholder="12-digit Aadhaar number" value={formData.aadhaarNumber} onChange={handleChange} />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Parent & Address */}
            {currentStep === 2 && (
              <div className={styles.stepContent}>
                <h3 className={styles.stepHeading}>Step 2: Parent, Family & Address Information</h3>

                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                    <label>Parent / Guardian Name *</label>
                    <input type="text" name="parentName" required className="input" placeholder="Father or Mother name" value={formData.parentName} onChange={handleChange} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Parent Contact Number *</label>
                    <input type="tel" name="parentContact" required className="input" placeholder="+91 98765 43210" value={formData.parentContact} onChange={handleChange} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Father's Occupation</label>
                    <input type="text" name="fatherOccupation" className="input" placeholder="e.g. Daily Wage Laborer / Deceased" value={formData.fatherOccupation} onChange={handleChange} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Mother's Occupation</label>
                    <input type="text" name="motherOccupation" className="input" placeholder="e.g. Housewife / Domestic help" value={formData.motherOccupation} onChange={handleChange} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Annual Family Income (₹) *</label>
                    <input type="number" name="familyIncome" required className="input" placeholder="e.g. 60000" value={formData.familyIncome} onChange={handleChange} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Residence Type *</label>
                    <select name="residenceType" className="input select" value={formData.residenceType} onChange={handleChange}>
                      <option value="Rental House">Rental House</option>
                      <option value="Own House">Own House</option>
                    </select>
                  </div>

                  <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
                    <label>Residential Address *</label>
                    <textarea name="address" rows={3} required className="input textarea" placeholder="Full door no, street name, town/village, district & pincode" value={formData.address} onChange={handleChange} />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Academic Details & Marks */}
            {currentStep === 3 && (
              <div className={styles.stepContent}>
                <h3 className={styles.stepHeading}>Step 3: School / College & Academic Marks</h3>

                <div className={styles.formGrid}>
                  <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
                    <label>School / College Name *</label>
                    <input type="text" name="institutionName" required className="input" placeholder="Full name of school or college" value={formData.institutionName} onChange={handleChange} />
                  </div>

                  <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
                    <label>School / College Address & Contact Number *</label>
                    <input type="text" name="institutionAddress" required className="input" placeholder="Institution location and principal/office phone" value={formData.institutionAddress} onChange={handleChange} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Class / Year & Semester *</label>
                    <input type="text" name="currentClassSemester" required className="input" placeholder="e.g. 10th Std / B.Sc 2nd Year (Sem 3)" value={formData.currentClassSemester} onChange={handleChange} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Quarterly Exam % / Sem 1 Marks *</label>
                    <input type="text" name="quarterlyMarks" required className="input" placeholder="e.g. 85% or 8.5 CGPA" value={formData.quarterlyMarks} onChange={handleChange} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Half Yearly % / Sem 2 Marks *</label>
                    <input type="text" name="halfYearlyMarks" required className="input" placeholder="e.g. 88% or 8.8 CGPA" value={formData.halfYearlyMarks} onChange={handleChange} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Annual Exam % / Sem 3 Marks *</label>
                    <input type="text" name="annualMarks" required className="input" placeholder="e.g. 90% or 9.0 CGPA" value={formData.annualMarks} onChange={handleChange} />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Fees & History */}
            {currentStep === 4 && (
              <div className={styles.stepContent}>
                <h3 className={styles.stepHeading}>Step 4: Fee Structure & Past Scholarship History</h3>

                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                    <label>Last Year Total Fee (2025-26) (₹) *</label>
                    <input type="number" name="lastYearFee" required className="input" placeholder="e.g. 15000" value={formData.lastYearFee} onChange={handleChange} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Current Year Total Fee (2026-27) (₹) *</label>
                    <input type="number" name="currentYearFee" required className="input" placeholder="e.g. 18000" value={formData.currentYearFee} onChange={handleChange} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Availed Scholarship Last Year? *</label>
                    <select name="availedLastYear" className="input select" value={formData.availedLastYear} onChange={handleChange}>
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Availed Other Non-Trust Scholarship? *</label>
                    <select name="availedOtherScholarship" className="input select" value={formData.availedOtherScholarship} onChange={handleChange}>
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>

                  <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
                    <label>Original Fee Receipt Submitted? (If availed last year)</label>
                    <select name="originalReceiptSubmitted" className="input select" value={formData.originalReceiptSubmitted} onChange={handleChange}>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Verification & Panel Recommendations */}
            {currentStep === 5 && (
              <div className={styles.stepContent}>
                <h3 className={styles.stepHeading}>Step 5: Panel Verification & Final Recommendations</h3>

                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                    <label>All Marksheets Verified by Panel? *</label>
                    <select name="marksheetsVerified" className="input select" value={formData.marksheetsVerified} onChange={handleChange}>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Official Fee Structure Verified by Panel? *</label>
                    <select name="feeStructureVerified" className="input select" value={formData.feeStructureVerified} onChange={handleChange}>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Satisfied with Student Academic Performance? *</label>
                    <select name="performanceSatisfied" className="input select" value={formData.performanceSatisfied} onChange={handleChange}>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Panel Recommendation *</label>
                    <select name="panelRecommendation" className="input select" value={formData.panelRecommendation} onChange={handleChange}>
                      <option value="Strongly recommended">Strongly Recommended</option>
                      <option value="Recommended">Recommended</option>
                      <option value="Wait listed">Wait Listed</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
                    <label>Panel Members Detailed Comments *</label>
                    <textarea name="panelComments" rows={3} required className="input textarea" placeholder="Enter comments on house visit, family background verification, and interview feedback..." value={formData.panelComments} onChange={handleChange} />
                  </div>
                </div>
              </div>
            )}

            {/* Step Navigation Bar */}
            <div className={styles.formActions}>
              {currentStep > 1 && (
                <button type="button" onClick={handlePrev} className="btn btn-secondary">
                  <ArrowLeft size={16} /> Previous Step
                </button>
              )}
              {currentStep < 5 ? (
                <button type="button" onClick={handleNext} className="btn btn-primary" style={{ marginLeft: "auto" }}>
                  Next Step <ArrowRight size={16} />
                </button>
              ) : (
                <button type="submit" className="btn btn-primary" style={{ marginLeft: "auto" }}>
                  <Save size={16} /> Submit & Save Application
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
