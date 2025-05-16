import { motion } from 'framer-motion'

export default function Projects() {
  const projects = [
    {
      name: "Portfolio Website",
      description: "A modern portfolio website built with Next.js and Tailwind CSS",
      image: "/placeholder-project.jpg",
      tech: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
      link: "#"
    },
    {
      name: "Network Monitoring Tool",
      description: "A tool for monitoring network performance and security",
      image: "/placeholder-project.jpg",
      tech: ["Python", "Flask", "SQLite", "Docker"],
      link: "#"
    },
    {
      name: "System Administration Dashboard",
      description: "A dashboard for managing system resources and services",
      image: "/placeholder-project.jpg",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      link: "#"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen relative flex overflow-hidden flex-col text-left md:flex-row max-w-full justify-evenly mx-auto items-center z-0"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Projects
      </h3>

      <div className="relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20">
        {projects.map((project, i) => (
          <div key={i} className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-44 h-screen">
            <motion.img
              initial={{
                y: -300,
                opacity: 0,
              }}
              transition={{ duration: 1.2 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              src={project.image}
              alt={project.name}
              className="w-[500px] h-[300px] object-cover"
            />

            <div className="space-y-10 px-0 md:px-10 max-w-6xl">
              <h4 className="text-4xl font-semibold text-center">
                <span className="underline decoration-[#F7AB0A]/50">
                  Project {i + 1} of {projects.length}:
                </span>{" "}
                {project.name}
              </h4>

              <div className="flex items-center space-x-2 justify-center">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 border border-gray-500 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <p className="text-lg text-center md:text-left">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full absolute top-[30%] bg-[#F7AB0A]/10 left-0 h-[500px] -skew-y-12" />
    </motion.div>
  )
} 