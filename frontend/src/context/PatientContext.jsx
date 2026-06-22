import React, { createContext, useContext, useState, useEffect } from 'react';

const PatientContext = createContext();

// Initial demo data
const initialPatients = [
  {
    id: 1,
    name: "Sarah Mitchell",
    age: 34,
    cancerType: "Breast Cancer",
    stage: "Stage 2",
    location: "Austin, Texas",
    story: "Sarah is a single mother of two beautiful children, ages 6 and 8. She was diagnosed with stage 2 breast cancer in March 2023. As a freelance graphic designer without health insurance, the cost of chemotherapy and surgery seemed impossible to afford. Despite working two jobs, she couldn't save enough for the life-saving treatment she desperately needs. Sarah has already undergone two rounds of chemotherapy but needs to complete six more sessions along with a mastectomy. Her children need their mother. Your donation could save her life and keep this family together.",
    shortStory: "Sarah, a single mother of two, was diagnosed with stage 2 breast cancer. Without insurance, she's struggling to afford chemotherapy and surgery. She needs help to continue her treatment and be there for her children.",
    amountNeeded: 45000,
    amountRaised: 18500,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1516849677043-ef67c955e3b6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=400&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    treatmentStatus: "In Treatment",
    daysLeft: 15,
    hospitalName: "Texas Oncology Center",
    treatmentPlan: "6 Chemotherapy Sessions + Mastectomy",
    cryptoAddresses: {
      bitcoin: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      usdt: "TXtGQm9LZwGJ7K3mPq4g8B3hFv8cN2rD5s",
      bnb: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    },
  },
  {
    id: 2,
    name: "Michael Thompson",
    age: 52,
    cancerType: "Lung Cancer",
    stage: "Stage 3",
    location: "Denver, Colorado",
    story: "Michael served as a firefighter for 25 years, saving countless lives in his community. Now, he's fighting the battle of his life against stage 3 lung cancer. The cancer was discovered during a routine checkup, and it has progressed rapidly. Michael needs immediate immunotherapy treatment combined with radiation therapy. The total cost exceeds his retirement savings and insurance coverage. His wife, Linda, has been by his side every step of the way, but they've exhausted all their financial resources. This hero who ran into burning buildings now needs us to help him through his darkest hour.",
    shortStory: "Michael, a retired firefighter of 25 years, is battling stage 3 lung cancer. He needs immunotherapy and radiation treatment that exceeds his insurance coverage. Help a hero in his time of need.",
    amountNeeded: 67000,
    amountRaised: 31000,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=400&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    treatmentStatus: "Pending Treatment",
    daysLeft: 22,
    hospitalName: "University of Colorado Cancer Center",
    treatmentPlan: "Immunotherapy + Radiation Therapy",
    cryptoAddresses: {
      bitcoin: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
      usdt: "TYdQm9LZwGJ7K3mPq4g8B3hFv8cN2rD5sK",
      bnb: "0x952d35Cc6634C0532925a3b844Bc9e7595f0bEc2",
    },
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    age: 28,
    cancerType: "Leukemia",
    stage: "Acute Lymphoblastic",
    location: "Miami, Florida",
    story: "Emily is a vibrant young teacher whose life took an unexpected turn when she was diagnosed with Acute Lymphoblastic Leukemia. She teaches third grade at a public school and loves watching her students learn and grow. The diagnosis came just weeks before her wedding was scheduled. Instead of walking down the aisle, Emily found herself in a hospital bed beginning aggressive chemotherapy. She needs a bone marrow transplant, which costs $85,000, not including the extensive post-transplant care. Her students write her letters every week, asking when their favorite teacher is coming back. With your help, Emily can return to the classroom she loves.",
    shortStory: "Emily, a third-grade teacher, was diagnosed with leukemia weeks before her wedding. She needs a bone marrow transplant to survive. Her students are waiting for their favorite teacher to return.",
    amountNeeded: 85000,
    amountRaised: 42000,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1516849677043-ef67c955e3b6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=400&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    treatmentStatus: "In Treatment",
    daysLeft: 18,
    hospitalName: "Sylvester Comprehensive Cancer Center",
    treatmentPlan: "Chemotherapy + Bone Marrow Transplant",
    cryptoAddresses: {
      bitcoin: "bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4",
      usdt: "TZtGQm9LZwGJ7K3mPq4g8B3hFv8cN2rD5sM",
      bnb: "0x842d35Cc6634C0532925a3b844Bc9e7595f0bEc3",
    },
  },
  {
    id: 4,
    name: "Robert Chen",
    age: 45,
    cancerType: "Colon Cancer",
    stage: "Stage 3",
    location: "San Francisco, California",
    story: "Robert is a software engineer and father of three who was diagnosed with stage 3 colon cancer. He's the primary breadwinner for his family, and his diagnosis has been devastating both emotionally and financially. Robert needs surgery followed by 12 rounds of chemotherapy. His insurance covers only 60% of the treatment costs, leaving his family with an overwhelming financial burden. His youngest daughter, age 4, doesn't understand why daddy is always tired and at the hospital. Robert is determined to fight and watch his children grow up. He needs our support to access the complete treatment plan.",
    shortStory: "Robert, a father of three and software engineer, is fighting stage 3 colon cancer. He needs surgery and chemotherapy that his insurance only partially covers. Help him watch his children grow up.",
    amountNeeded: 55000,
    amountRaised: 27000,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1516849677043-ef67c955e3b6?w=600&h=400&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    treatmentStatus: "In Treatment",
    daysLeft: 25,
    hospitalName: "UCSF Medical Center",
    treatmentPlan: "Surgery + 12 Chemotherapy Sessions",
    cryptoAddresses: {
      bitcoin: "bc1pxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      usdt: "TUtGQm9LZwGJ7K3mPq4g8B3hFv8cN2rD5sN",
      bnb: "0x652d35Cc6634C0532925a3b844Bc9e7595f0bEc4",
    },
  },
  {
    id: 5,
    name: "Patricia Williams",
    age: 61,
    cancerType: "Ovarian Cancer",
    stage: "Stage 3",
    location: "Chicago, Illinois",
    story: "Patricia is a grandmother of seven who dedicated her life to nursing, caring for others for over 35 years. Now retired, she was looking forward to spending her golden years with her grandchildren when she received the devastating diagnosis of stage 3 ovarian cancer. Patricia needs a combination of surgery and chemotherapy, but her pension and savings are insufficient to cover the costs. She's known in her community as the woman who always helped everyone else. Now, it's our turn to help her. Her grandchildren have made a 'Grandma's Fighting Fund' jar, collecting their allowances to help. Let's fill that jar and give Patricia the fighting chance she deserves.",
    shortStory: "Patricia, a retired nurse of 35 years and grandmother of seven, is battling stage 3 ovarian cancer. She spent her life caring for others. Now she needs us to care for her.",
    amountNeeded: 48000,
    amountRaised: 22000,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1516849677043-ef67c955e3b6?w=600&h=400&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    treatmentStatus: "Pending Treatment",
    daysLeft: 30,
    hospitalName: "Northwestern Memorial Hospital",
    treatmentPlan: "Surgery + 8 Chemotherapy Sessions",
    cryptoAddresses: {
      bitcoin: "bc1qg5d6qejxtdg4y5r3zarvary0c5xw7kv8f3t5",
      usdt: "TQtGQm9LZwGJ7K3mPq4g8B3hFv8cN2rD5sP",
      bnb: "0x732d35Cc6634C0532925a3b844Bc9e7595f0bEc5",
    },
  },
  {
    id: 6,
    name: "David Martinez",
    age: 38,
    cancerType: "Brain Cancer",
    stage: "Glioblastoma",
    location: "Phoenix, Arizona",
    story: "David is a veteran who served two tours overseas and came home to build a life with his wife and twin boys. He runs a small construction business and coaches his sons' little league team. Six months ago, persistent headaches led to a devastating diagnosis: glioblastoma, an aggressive form of brain cancer. David needs immediate surgery followed by radiation and chemotherapy. The treatment protocol costs $92,000, and his VA benefits cover only a portion. His twin boys, age 10, made a pact to learn everything about baseball so they can coach one day if their dad can't. David fought for our country. Now let's fight for him.",
    shortStory: "David, a military veteran and father of twin boys, is battling aggressive brain cancer. He needs surgery and treatment that exceeds his VA benefits. This veteran fought for us. Let's fight for him.",
    amountNeeded: 92000,
    amountRaised: 38000,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1516849677043-ef67c955e3b6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=400&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    treatmentStatus: "Urgent",
    daysLeft: 10,
    hospitalName: "Mayo Clinic Arizona",
    treatmentPlan: "Brain Surgery + Radiation + Chemotherapy",
    cryptoAddresses: {
      bitcoin: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx5wlh",
      usdt: "TAtGQm9LZwGJ7K3mPq4g8B3hFv8cN2rD5sQ",
      bnb: "0x342d35Cc6634C0532925a3b844Bc9e7595f0bEc6",
    },
  },
];

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState(() => {
    const savedPatients = localStorage.getItem('patients');
    return savedPatients ? JSON.parse(savedPatients) : initialPatients;
  });

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  const addPatient = (patient) => {
    const newId = patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1;
    const newPatient = { ...patient, id: newId };
    setPatients([...patients, newPatient]);
    return newPatient;
  };

  const updatePatient = (id, updatedPatient) => {
    setPatients(patients.map(p => p.id === id ? { ...updatedPatient, id } : p));
  };

  const deletePatient = (id) => {
    setPatients(patients.filter(p => p.id !== id));
  };

  const getPatient = (id) => {
    return patients.find(p => p.id === parseInt(id));
  };

  return (
    <PatientContext.Provider value={{ patients, addPatient, updatePatient, deletePatient, getPatient }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatients = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatients must be used within a PatientProvider');
  }
  return context;
};