import { motion } from 'framer-motion'
import ExperienceCard from './ExperienceCard'

export default function Experience() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen flex relative overflow-hidden flex-col text-left md:flex-row max-w-full px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Experience
      </h3>

      <div className="w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory">
        <ExperienceCard
          title="Network Computer Student"
          company="UiTM"
          skills={['Networking', 'Programming', 'System Administration']}
          points={[
            'Learning and developing skills in computer networking',
            'Studying programming fundamentals and applications',
            'Understanding system administration and maintenance'
          ]}
          dateStarted="2023"
          dateEnded="Present"
        />

        {/* Add more ExperienceCard components as needed */}
      </div>
    </motion.div>
  )
} 