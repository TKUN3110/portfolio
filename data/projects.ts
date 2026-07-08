export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  image?: string; // Optional path to image
  featured?: boolean;
}

export const projectsData: Project[] = [
  {
    id: "breast-cancer-pipeline",
    title: "Breast Cancer Diagnostic Pipeline",
    subtitle: "Python, PyTorch, OpenCV, NumPy, Matplotlib",
    description: "Engineered a computer vision and deep learning pipeline utilizing OpenCV for automated tissue segmentation and artifact removal. Developed a binary Convolutional Neural Network (CNN) with a strict focus on clinical risk mitigation, optimizing malignant classification to drastically minimize dangerous false negatives. Implemented Grad-CAM visual activation mapping to mathematically validate morphological drivers behind detected cellular malignancy.",
    tech: ["Python", "PyTorch", "OpenCV", "NumPy", "Matplotlib"],
    github: "https://github.com/TKUN3110",
    featured: true
  },
  {
    id: "eco-sentry",
    title: "Eco-Sentry: Edge AI Recycling (RAG)",
    subtitle: "LangChain, ChromaDB, Llama 3 via Ollama",
    description: "Developed an Edge AI system that utilizes Local RAG to provide real-time, context-aware recycling instructions based on visual object detection. Implemented an embedded vector database using ChromaDB and all-MiniLM-L6-v2 embeddings to enable high-speed local retrieval of municipal waste guidelines. Optimized model performance for edge deployment by utilizing quantized Llama 3 via Ollama, ensuring low-latency inference without cloud dependency.",
    tech: ["LangChain", "ChromaDB", "Llama 3", "Ollama", "Python"],
    github: "https://github.com/TKUN3110",
    featured: true
  },
  {
    id: "genomic-classifier",
    title: "Genomic Sequence ML Classifier",
    subtitle: "Python, Pandas, BioPython, Scikit-Learn",
    description: "Cleaned and transformed raw, unstructured FASTA genomic data into numerical matrices using k-mer extraction. Trained and evaluated a machine learning classifier Random Forest to identify DNA promoter regions. Developed an end-to-end Python pipeline, handling everything from initial data scrubbing to final predictive modeling.",
    tech: ["Python", "Pandas", "BioPython", "Scikit-Learn"],
    github: "https://github.com/TKUN3110",
    featured: false
  }
];
