import { KanjiEntry } from './config';

export interface Skill {
  name: string;
  level: number; // percentage 0-100
  icon: string;
}

export interface SkillCategory {
  title: string;
  kanji?: KanjiEntry;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    kanji: { text: "視", translation: "Vision / Sight" },
    skills: [
      { name: "Deep Learning & Neural Networks", level: 90, icon: "Cpu" },
      { name: "Computer Vision & YOLO", level: 95, icon: "Eye" },
      { name: "NLP & Scikit-learn", level: 85, icon: "Sliders" },
      { name: "Multi-class Classification", level: 80, icon: "Maximize" }
    ]
  },
  {
    title: "Generative AI & LLMs",
    kanji: { text: "智", translation: "Intelligence / Wisdom" },
    skills: [
      { name: "RAG (Retrieval-Augmented Gen)", level: 95, icon: "Database" },
      { name: "LangChain & Ollama", level: 90, icon: "Link" },
      { name: "Vector Databases & ChromaDB", level: 85, icon: "Layers" }
    ]
  },
  {
    title: "Backend & APIs",
    kanji: { text: "創", translation: "Creation / Software" },
    skills: [
      { name: "Python & C++", level: 95, icon: "Terminal" },
      { name: "FastAPI & Django", level: 90, icon: "Server" },
      { name: "REST APIs & API Integration", level: 90, icon: "Network" },
      { name: "Java, HTML & CSS", level: 80, icon: "Code" }
    ]
  },
  {
    title: "Libraries & Developer Tools",
    kanji: { text: "器", translation: "Tool / Device" },
    skills: [
      { name: "NumPy, Pandas & Matplotlib", level: 90, icon: "Table" },
      { name: "Git & Version Control", level: 95, icon: "GitBranch" },
      { name: "VS Code, PyCharm & N8N", level: 85, icon: "Settings" },
      { name: "PyQt5, Pygame & LaTeX", level: 80, icon: "FileText" }
    ]
  }
];
