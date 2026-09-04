import { Icon } from '@iconify/react/dist/offline'
import awsIcon from '@iconify-icons/thesvg/aws'
import cplusplusIcon from '@iconify-icons/thesvg/cplusplus'
import fastapiIcon from '@iconify-icons/thesvg/fastapi'
import gnuBashIcon from '@iconify-icons/thesvg/gnu-bash'
import githubIcon from '@iconify-icons/thesvg/github'
import huggingFaceIcon from '@iconify-icons/thesvg/hugging-face'
import jupyterIcon from '@iconify-icons/thesvg/jupyter'
import langchainIcon from '@iconify-icons/thesvg/langchain'
import langfuseIcon from '@iconify-icons/thesvg/langfuse'
import langgraphIcon from '@iconify-icons/thesvg/langgraph'
import mongodbIcon from '@iconify-icons/thesvg/mongodb'
import neo4jIcon from '@iconify-icons/thesvg/neo4j'
import obsidianIcon from '@iconify-icons/thesvg/obsidian'
import openrouterIcon from '@iconify-icons/thesvg/openrouter'
import pydanticaiIcon from '@iconify-icons/thesvg/pydanticai'
import pythonIcon from '@iconify-icons/thesvg/python'
import pytorchIcon from '@iconify-icons/thesvg/pytorch'
import qdrantIcon from '@iconify-icons/simple-icons/qdrant'
import raspberryPiIcon from '@iconify-icons/thesvg/raspberry-pi'
import reactIcon from '@iconify-icons/thesvg/react'
import rosIcon from '@iconify-icons/thesvg/ros'
import tensorflowIcon from '@iconify-icons/thesvg/tensorflow'
import terraformIcon from '@iconify-icons/thesvg/terraform'
import ubuntuIcon from '@iconify-icons/thesvg/ubuntu'
import viteIcon from '@iconify-icons/thesvg/vite'

// Keep this registry explicit: display names are not converted to provider slugs at runtime.
const technologyIcons = {
  aws: awsIcon,
  cpp: cplusplusIcon,
  fastapi: fastapiIcon,
  github: githubIcon,
  huggingFace: huggingFaceIcon,
  jupyter: jupyterIcon,
  langchain: langchainIcon,
  langfuse: langfuseIcon,
  langgraph: langgraphIcon,
  mongodb: mongodbIcon,
  neo4j: neo4jIcon,
  obsidian: obsidianIcon,
  openrouter: openrouterIcon,
  pydanticai: pydanticaiIcon,
  python: pythonIcon,
  pytorch: pytorchIcon,
  qdrant: qdrantIcon,
  raspberryPi: raspberryPiIcon,
  react: reactIcon,
  ros: rosIcon,
  tensorflow: tensorflowIcon,
  terraform: terraformIcon,
  ubuntu: ubuntuIcon,
  vite: viteIcon,
  bash: gnuBashIcon,
}

function TechnologyIcon({ icon }) {
  const iconData = technologyIcons[icon]

  if (!iconData) return null

  return (
    <Icon
      className="project-technology-icon"
      icon={iconData}
      aria-hidden="true"
      focusable="false"
    />
  )
}

export default function ProjectTechnologies({ title, items }) {
  return (
    <div className="project-technologies">
      <p className="project-technologies-label">Technologies &amp; tools</p>
      <ul className="project-technologies-list" aria-label={`${title} technologies and tools`}>
        {items.map(({ name, icon }, index) => (
          <li className="project-technology" key={`${name}-${icon}-${index}`}>
            <TechnologyIcon icon={icon} />
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
