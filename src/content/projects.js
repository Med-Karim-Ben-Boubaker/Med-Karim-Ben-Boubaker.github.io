import ckeeperImage from '../assets/projects/ckeeper.png'
import embeddedSpeechImage from '../assets/projects/embedded-speech.png'
import gptImage from '../assets/projects/gpt-2-from-scratch.png'
import oncologyArchitectureImage from '../assets/projects/oncology-architecture.png'
import oncologyImage from '../assets/projects/oncology.png'
import rerailImage from '../assets/projects/rerail.png'

const projects = [
  {
    period: 'Sep 2025 — Dec 2025',
    status: 'Completed · deep learning',
    title: 'GPT-2 from Scratch',
    description: 'Implemented and trained a GPT-2 architecture LLM from first principles to understand Transformers, LLM training phases, and dataset engineering at a deep level.',
    highlights: [
      'Produced a 35M-parameter GPT-2 model in PyTorch with a custom tokenizer, pretraining loops, and instruction fine-tuning.',
      'Documented the complete process from dataset engineering through model training.',
    ],
    meta: ['Deep learning', 'PyTorch', 'LLMs'],
    technologies: [
      { name: 'Python', icon: 'python' },
      { name: 'PyTorch' },
      { name: 'GitHub', icon: 'github' },
    ],
    media: [{ src: gptImage, alt: 'GPT-2 from Scratch project preview' }],
    links: [
      { label: 'Read the GPT-2 build log', href: 'https://karimbenboubaker.me/posts/artificial-intelligence/gpt-from-scratch/' },
      { label: 'View source on GitHub', href: 'https://github.com/Med-Karim-Ben-Boubaker/gpt-2-from-scratch' },
    ],
  },
  {
    period: 'May 2025 — Oct 2025',
    status: 'Completed · startup project',
    title: 'Ckeeper: Agentic DevOps Platform',
    description: 'Co-founded an AI-native DevOps startup building a platform for cloud-aware incident diagnosis, workflow automation, and root-cause analysis for engineering teams.',
    highlights: [
      'Collaborated on product ideation, MVP development, and startup pitching.',
      'Ranked Top 5 among 30 teams in the OSTX Bootcamp Ideation Program.',
    ],
    meta: ['DevOps', 'Incident diagnosis', 'Entrepreneurship'],
    technologies: [
      { name: 'Python', icon: 'python' },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'GitHub', icon: 'github' },
    ],
    media: [{ src: ckeeperImage, alt: 'Ckeeper Agentic DevOps Platform project preview' }],
    links: [
      { label: 'View the Ckeeper presentation', href: 'https://www.linkedin.com/in/mohamed-karim-ben-boubaker/overlay/Project/1153334096/treasury/?profileId=ACoAADG7jRwBxfizq2Kx102TECyWMpmBnNDgrkM' },
      { label: 'View the DevOps agent on GitHub', href: 'https://github.com/ckeeper-io/devops-agent' },
      { label: 'Open the startup announcement', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7368667819904851968/' },
    ],
  },
  {
    period: 'Mar 2025 — Jun 2025',
    status: 'Completed · healthcare AI',
    title: 'Personalized Oncology Education Question-Answering System',
    organization: 'Associated with INSAT · Institut National des Sciences Appliquées et de Technologie',
    description: 'A personalized therapy Q&A system for cancer patient education, developed in collaboration with the Tunisian Oncology Association.',
    highlights: [
      'Designed to reduce the workload on oncology doctors by providing reliable, direct answers to cancer-related questions.',
      'Focused on patient understanding, access to educational information, and support outside clinical consultations.',
    ],
    meta: ['RAG', 'Vector databases', 'Patient education'],
    technologies: [
      { name: 'Python', icon: 'python' },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'GitHub', icon: 'github' },
    ],
    media: [
      { src: oncologyArchitectureImage, alt: 'Architecture diagram for the oncology question-answering system' },
      { src: oncologyImage, alt: 'Personalized Oncology Education Question-Answering System project details' },
    ],
    links: [
      { label: 'Read the end-of-year project report', href: 'https://www.linkedin.com/in/mohamed-karim-ben-boubaker/overlay/Project/751279696/treasury/?profileId=ACoAADG7jRwBxfizq2Kx102TECyWMpmBnNDgrkM' },
      { label: 'View the project on GitHub', href: 'https://github.com/PFA2025/Cancer-QA-System' },
    ],
  },
  {
    period: 'Dec 2024 — Jan 2025',
    status: 'Completed · knowledge tooling',
    title: 'Localume',
    description: 'A desktop application for semantic search across documents using vector embeddings and retrieval technology.',
    highlights: [
      'Monitors specified directories in real time and automatically indexes new or modified files.',
      'Keeps a searchable local database up to date as documents change.',
    ],
    meta: ['Vector databases', 'Tkinter', 'Semantic search'],
    technologies: [
      { name: 'Python', icon: 'python' },
      { name: 'GitHub', icon: 'github' },
    ],
    visualLabel: 'Localume',
    visualDetail: 'Semantic document search',
    links: [
      { label: 'Open the Localume project resource', href: 'https://www.linkedin.com/in/mohamed-karim-ben-boubaker/overlay/Project/1390468996/treasury/?profileId=ACoAADG7jRwBxfizq2Kx102TECyWMpmBnNDgrkM' },
      { label: 'View Localume on GitHub', href: 'https://github.com/Med-Karim-Ben-Boubaker/localume' },
    ],
  },
  {
    period: 'Oct 2024 — Nov 2024',
    status: 'Completed · hackathon project',
    title: 'Rerail: Hack for Good 3.0 Junior Entreprise INSAT',
    description: 'Collaborated on an MVP for a railway health monitoring service during the Hack for Good 3.0 hackathon, organized by Junior Entreprise INSAT.',
    highlights: [
      'Our team, CodeTribe, ranked 2nd among 17 participating teams with a computer vision solution for automated railway track inspection.',
      'Trained YOLO models on self-annotated rail-defect images using Roboflow, ran local inference, and served the model through FastAPI.',
    ],
    meta: ['Computer vision', 'YOLO', 'Data annotation'],
    technologies: [
      { name: 'Python', icon: 'python' },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'TensorFlow', icon: 'tensorflow' },
    ],
    media: [{ src: rerailImage, alt: 'Rerail railway track inspection project preview' }],
    links: [
      { label: 'View the Rerail project media', href: 'https://www.linkedin.com/in/mohamed-karim-ben-boubaker/overlay/Project/1157063098/treasury/?profileId=ACoAADG7jRwBxfizq2Kx102TECyWMpmBnNDgrkM' },
      { label: 'View all four project media items', href: 'https://www.linkedin.com/in/mohamed-karim-ben-boubaker/overlay/Project/1157063098/image-list/?profileId=ACoAADG7jRwBxfizq2Kx102TECyWMpmBnNDgrkM' },
    ],
  },
  {
    period: 'Jul 2024 — Sep 2024',
    status: 'Completed · embedded AI',
    title: 'Embedded Speech Recognition System on STM32F407G-DISC1 Board',
    organization: 'Associated with ACTIA Engineering Services',
    description: 'An embedded speech command recognition system for an STM32F407 Discovery board with 112KB of RAM.',
    highlights: [
      'Predicts the keywords “yes” and “no” while classifying other sounds as noise.',
      'Uses embedded audio processing and deep learning techniques for efficient recognition on a microcontroller.',
    ],
    meta: ['Speech recognition', 'CNNs', 'Embedded systems'],
    technologies: [
      { name: 'TensorFlow', icon: 'tensorflow' },
      { name: 'C++', icon: 'cpp' },
      { name: 'GitHub', icon: 'github' },
    ],
    media: [{ src: embeddedSpeechImage, alt: 'Embedded speech recognition project preview' }],
    links: [
      { label: 'View the project on GitHub', href: 'https://github.com/Med-Karim-Ben-Boubaker/Embedded-Speech-Recognition-STM32F407' },
      { label: 'View the embedded AI presentation', href: 'https://www.linkedin.com/in/mohamed-karim-ben-boubaker/overlay/Project/1929811109/treasury/?profileId=ACoAADG7jRwBxfizq2Kx102TECyWMpmBnNDgrkM' },
    ],
  },
]

export default projects
