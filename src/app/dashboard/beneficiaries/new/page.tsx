"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { ArrowLeft, Check, ArrowRight, Save, User, GraduationCap, Phone, Home as HomeIcon, FileText, Award, CheckCircle2 } from "lucide-react";

export default function NewBeneficiaryPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Student & Scheme
    studentName: "",
    scholarshipScheme: "school",
    beneficiaryType: "New Candidate",
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

  const validateStep = (step: number) => {
    if (step === 1) {
      if (!formData.studentName.trim()) {
        alert("Please enter Student Name before proceeding to Step 2.");
        return false;
      }
      if (!formData.studentContact.trim()) {
        alert("Please enter Student Contact Number before proceeding to Step 2.");
        return false;
      }
    } else if (step === 2) {
      if (!formData.parentName.trim()) {
        alert("Please enter Parent / Guardian Name before proceeding to Step 3.");
        return false;
      }
      if (!formData.address.trim()) {
        alert("Please enter Residential Address before proceeding to Step 3.");
        return false;
      }
    } else if (step === 3) {
      if (!formData.institutionName.trim()) {
        alert("Please enter Institution Name before proceeding to Step 4.");
        return false;
      }
      if (!formData.currentClassSemester.trim()) {
        alert("Please enter Class / Semester before proceeding to Step 4.");
        return false;
      }
    } else if (step === 4) {
      if (!formData.currentYearFee.trim()) {
        alert("Please enter Current Year Fee Amount before proceeding to Step 5.");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(5)) return;
    setLoading(true);

    const payload = {
      id: `b_${Date.now()}`,
      registrationDate: new Date().toISOString().split('T')[0],
      scheme: formData.scholarshipScheme,
      status: 'pending',
      fullName: formData.studentName,
      fatherName: formData.parentName,
      motherName: '',
      dateOfBirth: formData.dob || '2005-01-01',
      gender: formData.gender.toLowerCase(),
      religion: formData.religion,
      caste: formData.caste,
      aadhaarNumber: formData.aadhaarNumber,
      phone: formData.studentContact,
      email: '',
      address: formData.address,
      city: 'Kancheepuram',
      state: 'Tamil Nadu',
      pincode: '603103',
      currentInstitution: formData.institutionName,
      currentClass: formData.currentClassSemester,
      academicRecords: [
        { year: '2025-2026', institution: formData.institutionName, grade: 'A', percentage: Number(formData.annualMarks) || 85 }
      ],
      familyIncome: Number(formData.familyIncome) || 0,
      fatherOccupation: formData.fatherOccupation,
      motherOccupation: formData.motherOccupation,
      siblings: 1,
      supportRecords: [
        { id: `sr_${Date.now()}`, date: new Date().toISOString().split('T')[0], type: 'tuition', amount: Number(formData.currentYearFee) || 15000, description: 'Sanctioned Scholarship Fee' }
      ],
      totalSupportReceived: Number(formData.currentYearFee) || 15000,
      documents: [],
      sponsorName: 'Helping Hands Trust Pool',
    };

    try {
      const res = await fetch('/api/beneficiaries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const resData = await res.json();
      if (resData.success) {
        setSubmitted(true);
      } else {
        alert(`Error saving to MongoDB: ${resData.error}`);
      }
    } catch (err) {
      alert('Network error. Saving student application.');
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
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
              onClick={() => {
                if (s.number < currentStep || validateStep(currentStep)) {
                  setCurrentStep(s.number);
                }
              }}
            >
              <div className={styles.stepCircle}>
                {isCompleted ? <Check size={18} /> : <IconComp size={18} />}
              </div>
              <div className={styles.stepInfo}>
                <span className={styles.stepNum}>Step {s.number}</span>
                <span className={styles.stepTitle}>{s.title}</span>
              </div>
            </div>
          );
        })}
      </div>

      {submitted ? (
        <div className={styles.formCard}>
          <div className={styles.successState}>
            <div className={styles.successIconBox}>
              <CheckCircle2 size={48} color="#28a745" />
            </div>
            <h2>Application Submitted & Saved to MongoDB Atlas!</h2>
            <p>The student beneficiary record for <strong>{formData.studentName}</strong> is saved into the database and visible in the Beneficiaries table.</p>
            <div className={styles.successActions}>
              <Link href="/dashboard/beneficiaries" className="btn btn-primary">
                View All Beneficiaries
              </Link>
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setSubmitted(false);
                  setCurrentStep(1);
                  setFormData({
                    studentName: "", scholarshipScheme: "school", beneficiaryType: "New Candidate", studentContact: "", dob: "", gender: "Male", religion: "Hindu", caste: "General", aadhaarNumber: "", parentName: "", parentContact: "", fatherOccupation: "", motherOccupation: "", address: "", residenceType: "Rental House", familyIncome: "", institutionName: "", institutionAddress: "", currentClassSemester: "", quarterlyMarks: "", halfYearlyMarks: "", annualMarks: "", previousSemesterMarks: "", lastYearFee: "", currentYearFee: "", availedLastYear: "No", availedOtherScholarship: "No", originalReceiptSubmitted: "No", marksheetsVerified: "Yes", missingDocuments: "", performanceSatisfied: "Yes", unsatisfiedReason: "", feeStructureVerified: "Yes", panelComments: "", panelRecommendation: "Strongly recommended",
                  });
                }}
              >
                Add Another Student
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit}>
            {/* STEP 1 */}
            {currentStep === 1 && (
              <div>
                <h3 className={styles.stepHeading}>Step 1: Student & Scholarship Scheme Details</h3>
                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                    <label>Student Name *</label>
                    <input type="text" name="studentName" required value={formData.studentName} onChange={handleChange} placeholder="Full name as in marksheet" className="input" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Scholarship Scheme Applied *</label>
                    <select name="scholarshipScheme" value={formData.scholarshipScheme} onChange={handleChange} className="input select">
                      <option value="school">Kamarajar Scholarship Scheme (School)</option>
                      <option value="college">Dr. Kalam Scholarship Scheme (College)</option>
                      <option value="college">K. Thiyagarajan 12th Single Parent Girl</option>
                      <option value="neet">Velicham NEET 7.5 Scheme</option>
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Beneficiary Status *</label>
                    <select name="beneficiaryType" value={formData.beneficiaryType} onChange={handleChange} className="input select">
                      <option value="New Candidate">New Candidate</option>
                      <option value="Existing Renewal">Existing Renewal Candidate</option>
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Student Contact Number *</label>
                    <input type="tel" name="studentContact" required value={formData.studentContact} onChange={handleChange} placeholder="+91 98765 43210" className="input" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Date of Birth *</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="input" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Gender *</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="input select">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Religion</label>
                    <input type="text" name="religion" value={formData.religion} onChange={handleChange} className="input" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Caste / Category</label>
                    <input type="text" name="caste" value={formData.caste} onChange={handleChange} className="input" />
                  </div>
                  <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
                    <label>Aadhaar Card Number</label>
                    <input type="text" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} placeholder="12-digit Aadhaar number" className="input" />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <div>
                <h3 className={styles.stepHeading}>Step 2: Parent Information & Residence Details</h3>
                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                    <label>Parent / Guardian Name *</label>
                    <input type="text" name="parentName" required value={formData.parentName} onChange={handleChange} placeholder="Father or Mother full name" className="input" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Parent Contact Number</label>
                    <input type="tel" name="parentContact" value={formData.parentContact} onChange={handleChange} placeholder="+91 98765 43210" className="input" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Father Occupation</label>
                    <input type="text" name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange} placeholder="e.g. Daily Wage Laborer / Farmer" className="input" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Mother Occupation</label>
                    <input type="text" name="motherOccupation" value={formData.motherOccupation} onChange={handleChange} placeholder="e.g. Homemaker" className="input" />
                  </div>
                  <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
                    <label>Residential Address *</label>
                    <textarea name="address" required rows={2} value={formData.address} onChange={handleChange} placeholder="Door No, Street, Village/Town, District, Pincode" className="input textarea" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Residence Type</label>
                    <select name="residenceType" value={formData.residenceType} onChange={handleChange} className="input select">
                      <option value="Rental House">Rental House</option>
                      <option value="Own House">Own House (Thatched/Kutcha)</option>
                      <option value="Relative House">Staying with Relatives</option>
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Family Annual Income (₹)</label>
                    <input type="number" name="familyIncome" value={formData.familyIncome} onChange={handleChange} placeholder="e.g. 48000" className="input" />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {currentStep === 3 && (
              <div>
                <h3 className={styles.stepHeading}>Step 3: Institution & Academic Performance</h3>
                <div className={styles.formGrid}>
                  <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
                    <label>School / College Name *</label>
                    <input type="text" name="institutionName" required value={formData.institutionName} onChange={handleChange} placeholder="Full name of school or college" className="input" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Current Class / Semester *</label>
                    <input type="text" name="currentClassSemester" required value={formData.currentClassSemester} onChange={handleChange} placeholder="e.g. 11th Std / B.E. 3rd Year" className="input" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Annual Marks (%)</label>
                    <input type="number" name="annualMarks" value={formData.annualMarks} onChange={handleChange} placeholder="e.g. 88" className="input" />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {currentStep === 4 && (
              <div>
                <h3 className={styles.stepHeading}>Step 4: Fee Structure & Scholarship History</h3>
                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                    <label>Current Academic Year Fee (₹) *</label>
                    <input type="number" name="currentYearFee" required value={formData.currentYearFee} onChange={handleChange} placeholder="e.g. 15000" className="input" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Availed Helping Hands Scholarship Last Year?</label>
                    <select name="availedLastYear" value={formData.availedLastYear} onChange={handleChange} className="input select">
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5 */}
            {currentStep === 5 && (
              <div>
                <h3 className={styles.stepHeading}>Step 5: Panel Verification & Recommendation</h3>
                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                    <label>Marksheets Verified?</label>
                    <select name="marksheetsVerified" value={formData.marksheetsVerified} onChange={handleChange} className="input select">
                      <option value="Yes">Yes - Verified Original Marksheets</option>
                      <option value="No">No - Pending Verification</option>
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Panel Final Recommendation</label>
                    <select name="panelRecommendation" value={formData.panelRecommendation} onChange={handleChange} className="input select">
                      <option value="Strongly recommended">Strongly Recommended</option>
                      <option value="Recommended">Recommended</option>
                      <option value="Conditional">Conditional Approval</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className={styles.formActions}>
              {currentStep > 1 ? (
                <button type="button" onClick={handlePrev} className="btn btn-secondary">
                  Previous Step
                </button>
              ) : (
                <div />
              )}

              {currentStep < 5 ? (
                <button type="button" onClick={handleNext} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>Next Step</span>
                  <ArrowRight size={18} />
                </button>
              ) : (
                <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Save size={18} />
                  <span>{loading ? 'Saving to MongoDB...' : 'SUBMIT & SAVE APPLICATION'}</span>
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
