import hochschuleOffenburgLogo from '../assets/experience/hochschule-offenburg.webp'
import hahnSchickardLogo from '../assets/experience/hahn-schickard.webp'
import greenEarthXLogo from '../assets/experience/greenearthx.webp'
import oratioLogo from '../assets/experience/oratio.webp'
import actiaLogo from '../assets/experience/actia.webp'
import ieeeInsatRoboticsLogo from '../assets/experience/ieee-insat-robotics.webp'
import { formatDuration, formatPeriod } from './dates'

// Logos are { src, width, height } (intrinsic size of the optimized WebP).
// Dates are year-months; `end: null` means Present (resolved at build time).
const entries = [
  {
    start: '2026-03',
    end: null,
    title: 'AI Research Engineer',
    organization: 'Hochschule Offenburg & Hahn-Schickard',
    location: 'Offenburg, Germany',
    logos: [{ src: hochschuleOffenburgLogo, width: 144, height: 144 }, { src: hahnSchickardLogo, width: 144, height: 93 }],
    description: 'Building evidence-grounded AI systems that turn medical literature into validated probability distributions for clinical Bayesian networks.',
    highlights: [
      'Built a PydanticAI ReAct agent that searches medical literature, reasons over retrieved evidence, and generates validated probability distributions for clinical Bayesian networks.',
      'Designed a context-tree compression method for large Bayesian CPTs, reducing LLM elicitation calls by 79.4% on average.',
      'Built a concurrent agent evaluation runtime for benchmarking models and agent variants, with configuration-driven experiments, failure handling, tracing, and automated metrics.',
    ],
    meta: ['Healthcare', 'Bayesian networks', 'Agent evaluation'],
    technologies: [
      { name: 'Python', icon: 'python' },
      { name: 'PydanticAI', icon: 'pydanticai' },
      { name: 'Qdrant', icon: 'qdrant' },
      { name: 'OpenRouter', icon: 'openrouter' },
    ],
    current: true,
  },
  {
    start: '2025-11',
    end: '2026-03',
    title: 'AI Engineer',
    organization: 'GreenEarthX',
    location: 'Palo Alto, CA · Remote',
    logos: [{ src: greenEarthXLogo, width: 144, height: 144 }],
    description: 'Built agentic compliance and regulatory-reasoning systems for EU renewable-energy regulations.',
    highlights: [
      'Built a LangGraph compliance agent combining multi-step reasoning, RAG, and expert validation, achieving 88% accuracy across 100 compliance scenarios.',
      'Built a Neo4j knowledge graph from EU regulations, modeling amendments, citations, and cross-document dependencies for multi-hop reasoning.',
      'Deployed containerized FastAPI services on AWS ECS with Langfuse observability for LLM tracing, token usage, and production debugging.',
    ],
    meta: ['Regulatory compliance', 'Knowledge graphs', 'Agent infrastructure'],
    technologies: [
      { name: 'Python', icon: 'python' },
      { name: 'LangChain', icon: 'langchain' },
      { name: 'LangGraph', icon: 'langgraph' },
      { name: 'Neo4j', icon: 'neo4j' },
      { name: 'AWS', icon: 'aws' },
      { name: 'Langfuse', icon: 'langfuse' },
    ],
  },
  {
    start: '2025-06',
    end: '2025-11',
    title: 'AI Engineer',
    organization: 'Oratio Technologies',
    location: 'Tunis, Tunisia',
    logos: [{ src: oratioLogo, width: 144, height: 144 }],
    description: 'Built legal-information systems that made regulatory documents faster to ingest, retrieve, and evaluate.',
    highlights: [
      'Reduced average TTFT for a legal RAG system by 67%, from 15s to 5s, by optimizing async execution and introducing pooled, shared clients for MongoDB and Azure Cosmos DB Gremlin API.',
      'Designed and implemented a CDC and ETL platform provisioned with Terraform on Azure, synchronizing 30,000+ legal documents across MongoDB and Azure Cosmos DB Gremlin API.',
      'Built synthetic evaluation datasets and an LLM-as-judge framework integrated into CI/CD to detect RAG quality regressions before deployment.',
    ],
    meta: ['Legal chatbot', 'RAG performance', 'Document processing'],
    technologies: [
      { name: 'Python', icon: 'python' },
      { name: 'Azure' },
      { name: 'Terraform', icon: 'terraform' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'RAGAS' },
    ],
  },
  {
    start: '2024-06',
    end: '2024-09',
    title: 'ML Engineering Intern',
    organization: 'ACTIA Engineering Services',
    location: 'Ariana, Tunisia',
    logos: [{ src: actiaLogo, width: 144, height: 144 }],
    description: 'Worked on low-latency speech-command recognition for automotive systems on resource-constrained microcontrollers.',
    highlights: [
      'Designed, trained, and optimized a CNN speech-command recognition model using TensorFlow for automotive applications.',
    ],
    meta: ['Embedded ML', 'Automotive systems', 'Low-latency inference'],
    technologies: [
      { name: 'Python', icon: 'python' },
      { name: 'C/C++', icon: 'cpp' },
      { name: 'TensorFlow', icon: 'tensorflow' },
    ],
  },
  {
    start: '2023-09',
    end: '2024-07',
    title: 'Software Developer',
    organization: 'IEEE INSAT Robotics and Automation Society Chapter',
    employmentType: 'Part-time',
    location: 'Tunis, Tunisia · On-site',
    logos: [{ src: ieeeInsatRoboticsLogo, width: 100, height: 100 }],
    description: 'Led development of core software for an autonomous robot that qualified for the Eurobot 2024 international competition in France.',
    highlights: [
      'Designed a decision-making engine with a path planning algorithm fusing LiDAR, computer vision, and odometry for autonomous navigation.',
      'Engineered a task scheduler optimizing priorities by distance, resource availability, and multi-factor criteria.',
      'Architected a ROS system with service interfaces uniting LiDAR, camera, navigation, and task scheduling for seamless autonomous operation.',
      'Established reliable CAN Bus communication via SocketCAN and RS485/CAN HAT between Raspberry Pi 4 and STM32F407.',
    ],
    meta: ['Autonomous robotics', 'ROS', 'Embedded systems'],
    technologies: [
      { name: 'ROS1', icon: 'ros' },
      { name: 'Ubuntu', icon: 'ubuntu' },
      { name: 'Python', icon: 'python' },
      { name: 'Raspberry Pi', icon: 'raspberryPi' },
      { name: 'Bash', icon: 'bash' },
    ],
  },
]

const experienceEntries = entries.map(({ start, end, ...entry }) => ({
  ...entry,
  period: formatPeriod(start, end),
  duration: formatDuration(start, end),
}))

export default experienceEntries
