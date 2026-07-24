"use client";

import React, { useState } from 'react';
import { Camera, Calendar, Tag } from 'lucide-react';
import styles from './page.module.css';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const galleryItems = [
    {
      title: "Government School Note Books, Bags & Stationary Distribution",
      date: "28th June 2019",
      category: "Distribution Drives",
      image: "/images/IMG-20190628-WA0015.jpg",
    },
    {
      title: "Udavum Karangal (#3) - S.Patti Middle School, Dharmapuri Dt",
      date: "March 2019",
      category: "Udavum Karangal",
      image: "/images/IMG-20190327-WA0054.jpg",
    },
    {
      title: "Payirchi Pattarai (#1) - Govt School, Vayalur, Thiruvannamalai",
      date: "May 2019",
      category: "Payirchi Pattarai",
      image: "/images/IMG-20190504-WA0031.jpg",
    },
    {
      title: "Academic Renewal Meeting 2019-20 at Karappakkam",
      date: "31st March 2019",
      category: "Trust Meetings",
      image: "/images/IMG-20190331-WA0022.jpg",
    },
    {
      title: "Government School Uniform Donating Ceremony",
      date: "July 2019",
      category: "Distribution Drives",
      image: "/images/IMG-20190704-WA0017.jpg",
    },
    {
      title: "Udavum Karangal (#2) - Sangilivadi Govt Primary School",
      date: "December 2018",
      category: "Udavum Karangal",
      image: "/images/IMG-20181208-WA0033.jpg",
    },
    {
      title: "House Visit By Verification Team 2019-20",
      date: "February 2019",
      category: "House Visits",
      image: "/images/IMG-20190204-WA0003_1.jpg",
    },
    {
      title: "Gaja Relief Camp - Vedharanyam & Thanjavur",
      date: "November 2018",
      category: "Disaster Relief",
      image: "/images/IMG-20181107-WA0006.jpg",
    },
    {
      title: "Annual Student Distribution & Gathering 2018",
      date: "April 2018",
      category: "Trust Meetings",
      image: "/images/IMG-20180428-WA0003.jpg",
    },
    {
      title: "First Founding Team Meeting & Orientation",
      date: "July 2017",
      category: "Trust Meetings",
      image: "/images/IMG_20170729_181042.jpg",
    },
  ];

  const categories = ['All', 'Distribution Drives', 'Udavum Karangal', 'Payirchi Pattarai', 'Trust Meetings', 'House Visits', 'Disaster Relief'];

  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.headerBanner}>
        <div className="container">
          <h1 className={styles.title}>Photo & Media Gallery</h1>
          <p className={styles.breadcrumb}>Home / Gallery</p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.contentSection}>
        <div className="container">
          {/* Category Tabs */}
          <div className={styles.filterTabs}>
            {categories.map((cat, idx) => (
              <button 
                key={idx}
                className={`${styles.tabBtn} ${activeCategory === cat ? styles.activeTab : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className={styles.galleryGrid}>
            {filteredItems.map((item, idx) => (
              <div key={idx} className={styles.galleryCard}>
                <div className={styles.imageBox}>
                  <img src={item.image} alt={item.title} className={styles.img} />
                  <div className={styles.overlay}>
                    <span className={styles.categoryBadge}><Tag size={12} /> {item.category}</span>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDate}><Calendar size={13} /> {item.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
