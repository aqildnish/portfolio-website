import { motion } from 'framer-motion'
import Skill from './Skill'

export default function Skills() {
  const skills = [
    { name: 'HTML', proficiency: '90%' },
    { name: 'CSS', proficiency: '85%' },
    { name: 'JavaScript', proficiency: '80%' },
    { name: 'React', proficiency: '75%' },
    { name: 'Node.js', proficiency: '70%' },
    { name: 'Python', proficiency: '75%' },
    { name: 'Networking', proficiency: '85%' },
    { name: 'Linux', proficiency: '80%' },
    { name: 'Windows Server', proficiency: '75%' },
    { name: 'Cisco', proficiency: '70%' },
    { name: 'Database', proficiency: '75%' },
    { name: 'Cloud Computing', proficiency: '65%' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex relative flex-col text-center md:text-left xl:flex-row max-w-[2000px] xl:px-10 min-h-screen justify-center xl:space-y-0 mx-auto items-center"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Skills
      </h3>

      <h3 className="absolute top-36 uppercase tracking-[3px] text-gray-500 text-sm">
        Hover over a skill for current proficiency
      </h3>

      <div className="grid grid-cols-4 gap-5">
        {skills.map((skill) => (
          <Skill key={skill.name} name={skill.name} proficiency={skill.proficiency} />
        ))}
      </div>
    </motion.div>
  )
} 