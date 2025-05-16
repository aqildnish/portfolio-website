import { motion } from 'framer-motion'

type Props = {
  title: string
  company: string
  skills: string[]
  points: string[]
  dateStarted: string
  dateEnded: string
}

export default function ExperienceCard({
  title,
  company,
  skills,
  points,
  dateStarted,
  dateEnded,
}: Props) {
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[900px] snap-center bg-[#292929] p-10 hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200 overflow-hidden">
      <motion.img
        initial={{
          y: -100,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center"
        src="/placeholder-company.jpg"
        alt={company}
      />

      <div className="px-0 md:px-10">
        <h4 className="text-4xl font-light">{title}</h4>
        <p className="font-bold text-2xl mt-1">{company}</p>
        <div className="flex space-x-2 my-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="h-10 w-10 rounded-full flex items-center justify-center bg-white/10"
            >
              {skill[0]}
            </span>
          ))}
        </div>
        <p className="uppercase py-5 text-gray-300">
          {dateStarted} - {dateEnded}
        </p>

        <ul className="list-disc space-y-4 ml-5 text-lg">
          {points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </article>
  )
} 