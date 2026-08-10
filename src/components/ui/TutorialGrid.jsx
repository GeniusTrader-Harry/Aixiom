import { motion } from 'framer-motion'

// Responsive grid of YouTube tutorial embeds. `videos` is an array of
// { id, start?, title } from translations.tutorials.videos.
export default function TutorialGrid({ videos }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {videos.map((video, i) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="rounded-2xl border border-gray-800 bg-gray-900/60 overflow-hidden"
        >
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${video.id}${video.start ? `?start=${video.start}` : ''}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="px-6 py-4 text-white font-semibold">{video.title}</div>
        </motion.div>
      ))}
    </div>
  )
}
