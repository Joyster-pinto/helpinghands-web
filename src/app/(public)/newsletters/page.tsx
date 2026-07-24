import { Metadata } from 'next';
import { FileText, Download, Calendar, ShieldCheck } from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Newsletters & Official Reports | Helping Hands Team Trust',
  description: 'Download monthly newsletters, trust deed, and annual audit reports.',
};

export default function NewslettersPage() {
  const newsletters2019 = [
    'December 2019', 'November 2019', 'October 2019', 'September 2019',
    'August 2019', 'July 2019', 'June 2019', 'May 2019',
    'April 2019', 'March 2019', 'February 2019', 'January 2019',
  ];

  const newsletters2018 = [
    'December 2018', 'November 2018', 'October 2018', 'September 2018',
    'August 2018', 'July 2018', 'June 2018', 'May 2018',
  ];

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.headerBanner}>
        <div className="container">
          <h1 className={styles.title}>Newsletters & Reports</h1>
          <p className={styles.breadcrumb}>Home / Newsletters & Reports</p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.contentSection}>
        <div className="container">
          {/* Key Official Documents */}
          <div className={styles.officialDocsBox}>
            <div className={styles.docItem}>
              <ShieldCheck size={32} className={styles.docIcon} />
              <div>
                <h3>Registered Trust Deed (Regd. 51/2018)</h3>
                <p>Official registration deed of Helping Hands Team Trust registered under June 2018.</p>
              </div>
              <button className="btn btn-primary btn-sm"><Download size={14} /> Download PDF</button>
            </div>

            <div className={styles.docItem}>
              <FileText size={32} className={styles.docIcon} />
              <div>
                <h3>Annual Audit Report 2018-19</h3>
                <p>Audited financial statements and beneficiary distribution reports for 2018-19.</p>
              </div>
              <button className="btn btn-outline btn-sm"><Download size={14} /> Download PDF</button>
            </div>
          </div>

          {/* 2019 Newsletters */}
          <div className={styles.yearSection}>
            <div className={styles.yearHeader}>
              <Calendar size={22} className={styles.yearIcon} />
              <h2>Year 2019 Newsletters</h2>
            </div>
            <div className={styles.grid}>
              {newsletters2019.map((item, idx) => (
                <div key={idx} className={styles.card}>
                  <FileText size={20} className={styles.fileIcon} />
                  <span>{item} Newsletter</span>
                  <button className={styles.downloadBtn} title="Download"><Download size={16} /></button>
                </div>
              ))}
            </div>
          </div>

          {/* 2018 Newsletters */}
          <div className={styles.yearSection}>
            <div className={styles.yearHeader}>
              <Calendar size={22} className={styles.yearIcon} />
              <h2>Year 2018 Newsletters</h2>
            </div>
            <div className={styles.grid}>
              {newsletters2018.map((item, idx) => (
                <div key={idx} className={styles.card}>
                  <FileText size={20} className={styles.fileIcon} />
                  <span>{item} Newsletter</span>
                  <button className={styles.downloadBtn} title="Download"><Download size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
