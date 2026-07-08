export interface TimelineItemData {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  tags?: string[];
}

export const timelineData: TimelineItemData[] = [
  {
    id: "somaiya-btech",
    year: "Aug. 2025 - May 2029",
    title: "B-Tech in Computer Engineering",
    company: "KJ Somaiya School Of Engineering",
    description: "Studying foundational and advanced topics in Computer Engineering, with an active focus on Machine Learning, Algorithms, and Software Development.",
    tags: ["Computer Engineering", "B-Tech", "Vidyavihar"]
  },
  {
    id: "smlra-rep",
    year: "Oct. 2025 - Present",
    title: "First Year Representative",
    company: "Somaiya Machine Learning Research Association",
    description: "Leading student initiatives and coordinating technical workshops for a community focused on Artificial Intelligence and Machine Learning.",
    tags: ["Leadership", "Community Building", "Workshops", "AI/ML"]
  },
  {
    id: "riidl-growth",
    year: "Feb. 2026",
    title: "Competition Winner (1st Place)",
    company: "riidl Startup Growth Challenge",
    description: "Awarded 1st Place for demonstrating exceptional growth strategies and executing a high-impact marketing sprint for an incubated startup. Implemented data-driven marketing experiments to validate product-market fit using social media outreach and funnel optimization.",
    tags: ["Growth Hacking", "Marketing", "Data Analytics", "Strategy"]
  },
  {
    id: "jio-intern",
    year: "June 2026 - Present",
    title: "Computer Vision & AI Intern",
    company: "Jio Platforms Limited",
    description: "Developing and deploying advanced Computer Vision models, specializing in the integration of YOLO architectures for real-time object detection and spatial analysis. Architecting end-to-end AI pipelines combining custom-trained models with existing systems, and optimizing model inference speeds and dataset preprocessing pipelines.",
    tags: ["Computer Vision", "YOLO", "AI Pipelines", "Model Optimization"]
  }
];
