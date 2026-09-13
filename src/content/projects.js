import ckeeperImage from '../assets/projects/ckeeper-cover.png'
import embeddedSpeechImage from '../assets/projects/embedded-speech-inference.png'
import gptImage from '../assets/projects/gpt-2-loss-train.png'
import ieeeInsatEurobotImage from '../assets/projects/ieee-insat-eurobot-2024.png'
import localumeImage from '../assets/projects/localume.png'
import oncologyImage from '../assets/projects/oncology-system.png'
import rerailImage from '../assets/projects/rerail-rails-status.png'

const projects = [
  {
    period: 'Sep 2025 — Dec 2025',
    title: 'GPT-2 from Scratch',
    description: 'Built and trained a 35M-parameter GPT-2 model in PyTorch from scratch, with a custom tokenizer, pretraining pipeline, and instruction fine-tuning. Documented the full process from dataset preparation to model training.',
    meta: ['Deep learning', 'PyTorch', 'LLMs'],
    technologies: [
      { name: 'Python', icon: 'python' },
      { name: 'PyTorch', icon: 'pytorch' },
      { name: 'Hugging Face', icon: 'huggingFace' },
    ],
    media: [{ src: gptImage, alt: 'GPT-2 from Scratch project preview' }],
    links: [
      { label: 'Read the GPT-2 build log', kind: 'url', href: 'https://karimbenboubaker.me/posts/artificial-intelligence/gpt-from-scratch/' },
      { label: 'View source on GitHub', kind: 'github', href: 'https://github.com/Med-Karim-Ben-Boubaker/gpt-2-from-scratch' },
    ],
  },
  {
    period: 'May 2025 — Oct 2025',
    title: 'Ckeeper: Agentic DevOps Platform',
    description: 'Co-founded an AI-native DevOps startup and helped build an MVP for cloud-aware incident diagnosis, workflow automation, and root-cause analysis. Contributed to product ideation, development, and pitching; the team placed among the top five of 30 teams in the OSTX Bootcamp Ideation Program.',
    meta: ['DevOps', 'Startup', 'Entrepreneurship'],
    technologies: [
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'Qdrant', icon: 'qdrant' },
      { name: 'LangGraph', icon: 'langgraph' },
      { name: 'Google Cloud Platform', icon: 'googleCloud' },
      { name: 'Terraform', icon: 'terraform' },
    ],
    media: [{ src: ckeeperImage, alt: 'Ckeeper Agentic DevOps Platform project preview' }],
    links: [
      { label: 'View the Ckeeper presentation', kind: 'pdf', href: 'https://www.linkedin.com/in/mohamed-karim-ben-boubaker/overlay/Project/1153334096/treasury/?profileId=ACoAADG7jRwBxfizq2Kx102TECyWMpmBnNDgrkM' },
      { label: 'View source on GitHub', kind: 'github', href: 'https://github.com/ckeeper-io/devops-agent' },
      { label: 'Read the startup announcement', kind: 'url', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7368667819904851968/' },
    ],
  },
  {
    period: 'Mar 2025 — Jun 2025',
    title: 'Personalized oncology education Q&A system',
    description: 'Built a personalized Q&A system for cancer-therapy education with the Tunisian Oncology Association. The system was designed to provide grounded educational answers outside clinical consultations and support oncology teams.',
    meta: ['RAG', 'Vector databases', 'Chatbot'],
    technologies: [
      { name: 'Python', icon: 'python' },
      { name: 'FastAPI', icon: 'fastapi' },
    ],
    media: [{ src: oncologyImage, alt: 'Personalized oncology education Q&A system project preview' }],
    links: [
      { label: 'Read the project report', kind: 'pdf', href: 'https://www.linkedin.com/in/mohamed-karim-ben-boubaker/overlay/Project/751279696/treasury/?profileId=ACoAADG7jRwBxfizq2Kx102TECyWMpmBnNDgrkM' },
      { label: 'View source on GitHub', kind: 'github', href: 'https://github.com/PFA2025/Cancer-QA-System' },
    ],
  },
  {
    period: 'Dec 2024 — Jan 2025',
    title: 'Localume',
    description: 'Built a desktop application for semantic document search using vector embeddings, with real-time directory monitoring and automatic indexing to keep the local search index up to date.',
    meta: ['Vector databases', 'Watchdogs', 'Semantic search'],
    technologies: [
      { name: 'Python', icon: 'python' },
    ],
    media: [{ src: localumeImage, alt: 'Localume semantic document search project preview' }],
    links: [
      { label: 'View the Localume project page', kind: 'url', href: 'https://www.linkedin.com/in/mohamed-karim-ben-boubaker/overlay/Project/1390468996/treasury/?profileId=ACoAADG7jRwBxfizq2Kx102TECyWMpmBnNDgrkM' },
      { label: 'View source on GitHub', kind: 'github', href: 'https://github.com/Med-Karim-Ben-Boubaker/localume' },
    ],
  },
  {
    period: 'Oct 2024 — Nov 2024',
    title: 'Rerail: Railway Track Inspection',
    description: 'Collaborated on a railway track-inspection MVP for the Hack for Good 3.0 hackathon. CodeTribe placed second among 17 teams with a computer-vision system using annotated rail-defect images, YOLO models, local inference, and FastAPI.',
    meta: ['Computer vision', 'YOLO', 'Data annotation'],
    technologies: [
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'TensorFlow', icon: 'tensorflow' },
      { name: 'YOLO', icon: 'yolo' },
    ],
    media: [{ src: rerailImage, alt: 'Rerail railway track inspection project preview' }],
    links: [
      { label: 'View the Rerail project page', kind: 'url', href: 'https://www.linkedin.com/in/mohamed-karim-ben-boubaker/overlay/Project/1157063098/treasury/?profileId=ACoAADG7jRwBxfizq2Kx102TECyWMpmBnNDgrkM' },
      { label: 'View all Rerail media', kind: 'url', href: 'https://www.linkedin.com/in/mohamed-karim-ben-boubaker/overlay/Project/1157063098/image-list/?profileId=ACoAADG7jRwBxfizq2Kx102TECyWMpmBnNDgrkM' },
    ],
  },
  {
    period: 'Jul 2024 — Sep 2024',
    title: 'Embedded speech recognition on STM32F407',
    description: 'Built an embedded speech-command recognizer for the STM32F407 Discovery board (112 KB of RAM), recognizing “yes” and “no” and classifying other sounds as noise with on-device audio processing and deep learning.',
    meta: ['Speech recognition', 'CNNs', 'Embedded systems'],
    technologies: [
      { name: 'TensorFlow', icon: 'tensorflow' },
      { name: 'C++', icon: 'cpp' },
    ],
    media: [{ src: embeddedSpeechImage, alt: 'Embedded speech recognition project preview' }],
    links: [
      { label: 'View source on GitHub', kind: 'github', href: 'https://github.com/Med-Karim-Ben-Boubaker/Embedded-Speech-Recognition-STM32F407' },
      { label: 'View the embedded speech presentation', kind: 'pdf', href: 'https://www.linkedin.com/in/mohamed-karim-ben-boubaker/overlay/Project/1929811109/treasury/?profileId=ACoAADG7jRwBxfizq2Kx102TECyWMpmBnNDgrkM' },
    ],
  },
  {
    period: 'Sep 2023 — Jul 2024',
    title: 'Autonomous robot software',
    description: 'Led core software development for an autonomous robot that qualified for Eurobot 2024, designing ROS-based navigation and task scheduling with LiDAR, computer vision, odometry, and CAN bus communication between a Raspberry Pi 4 and STM32F407.',
    meta: ['Autonomous robotics', 'Algorithm Design', 'Embedded systems'],
    technologies: [
      { name: 'ROS1', icon: 'ros' },
      { name: 'Ubuntu', icon: 'ubuntu' },
      { name: 'Python', icon: 'python' },
      { name: 'Raspberry Pi', icon: 'raspberryPi' },
      { name: 'Bash', icon: 'bash' },
    ],
    media: [{ src: ieeeInsatEurobotImage, alt: 'IEEE INSAT autonomous Eurobot project preview' }],
  },
]

export default projects
