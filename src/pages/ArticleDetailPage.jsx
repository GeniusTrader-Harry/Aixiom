import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Section from '../components/ui/Section'
import { articles } from '../utils/constants'

function formatDate(isoDate) {
  const date = new Date(isoDate)
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

export default function ArticleDetailPage() {
  const { id } = useParams()
  const article = articles.find(a => a.id === Number(id))

  if (!article) {
    return (
      <div className="pt-24">
        <Section background="gray">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
            <Link to="/articles" className="text-gray-400 hover:text-white underline">
              ← Back to Articles
            </Link>
          </div>
        </Section>
      </div>
    )
  }

  return (
    <div className="pt-24">
      <Section background="gray">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Link to="/articles" className="text-gray-400 hover:text-white transition-colors mb-8 inline-block">
            ← Back to Articles
          </Link>

          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <span>{article.category}</span>
            <span>•</span>
            <span>{article.readTime}</span>
            <span>•</span>
            <span>{formatDate(article.date)}</span>
            {article.author && (
              <>
                <span>•</span>
                <span>By {article.author}</span>
              </>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
            {article.title}
          </h1>

          <p className="text-xl text-gray-400 mb-10 leading-relaxed border-l-4 border-white pl-6">
            {article.summary}
          </p>

          <article className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mb-6">A List of Universities and Colleges for Prospective Students Interested in Austrian Economics</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              Economics of the Austrian school, as asserted by Professor Boettke at George Mason University, is an expanding industry, but it is by no means currently a mainstream school of thought or widely recognized in academia. Its distinctive practice of regarding economics as "praxeology" and emphasis on individual choices and actions, however, make Austrian economics separate itself from the mediocrity of daily regurgitation of fallacious mathematical equations in mainstream economics classes. Austrian-friendly economics programs are rare to find, and most of the lists available online are very outdated (the most recent one was posted in 2018). This article provides a list of universities and colleges you should consider, but it is by no means comprehensive because many high school students want to get into a decent-ranked school. Therefore, I have excluded some universities, but there are a handful of them worldwide teaching Austrian economics (I will only explain US and UK universities because most have the qualifications compatible with the university admissions in the two countries). I have asked notable Austrian economists about these programs, and, therefore, this list has relatively high validity.
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-6">Country: USA</h2>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">New York University</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              New York University is a top US university located in the largest city in the United States (its graduate school is ranked #11 in Economics). It is an ideal place to learn Economics and Business since it is the largest financial sector in the world. NYU has prominent Austrian economists, including Mario Rizzo, David Harper and formerly Israel Kirzner. If you want a friendly environment to study and discuss Austrian Economics, you can look at the workshops and activities held at the Foundations of the Market Economy program at NYU. Many prominent Austrian Economists were trained at NYU because it was where Ludwig von Mises taught. However, it is important to note that NYU is a highly selective university that requires excellent grades and GPAs. Since it is also a technically rigorous program, it is expected that economics at NYU is quantitatively heavy in its core courses. What is more, if you are interested in behavioural economics, studying under Mario Rizzo will provide you with refreshing perspectives regarding libertarian paternalism.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">Hillsdale College</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Hillsdale College is a four-year private liberal arts college in Michigan, United States (ranked #39 in the United States), which is a superb place to learn Austrian economics in depth. Although Hillsdale is not as prestigious as Williams College, Swarthmore College, or West Point, it is still a highly selective institution. In fact, Hillsdale College's acceptance rate is as low as a T30 US university, so one must have the top grades in possession and share the values of Hillsdale to have a chance at getting in.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Hillsdale College is heavily Austrian. It has introductory and advanced courses in Austrian Economics, as well as a course in the history of economic thought. Hillsdale has professors previously trained at George Mason University and New York University, and, therefore, you can gain access to a strong network of prominent Austrian economists. Hillsdale College has a long history of embracing Austrian economics as this tradition continues. However, prospective students should note that Hillsdale provides a comprehensive liberal arts education that covers literature, religious studies, and other humanities and science subjects as your foundational studies, not just economics.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              The biggest selling point of Hillsdale for students interested in Austrian economics is that it houses the personal library of the prominent Austrian, Ludwig von Mises. It contains Mises's personal letters and works, published and unpublished.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">Grove City College</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              There are two universities/colleges in the world housing archives of Ludwig von Mises: Hillsdale College and Grove City College. Grove City College is a Christian liberal arts college located in Grove City, Pennsylvania, with a rich history of hosting prominent Austrian economists. It became a nonpareil college to learn Austrian economics when Professor Hans Sennholtz, Mises's first PhD student at New York University, joined the faculty and became the department chair in economics in 1956. Grove City College alumni later became successful economists and educators, including today's leading scholar in Austrian economics, Professor Peter J Boettke. GCC has always maintained its focus on training generations and generations of passionate students specializing in Austrian economics.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Grove City College is not a top-rank school, but its academic rigour and social environment are among the best. It is a Christian university that requires students' participation in church services with a strong emphasis on humanities education. Overall, it is a premier place to study Austrian economics.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">George Mason University</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              George Mason University is an outstanding research university in Austrian economics. Not only does GMU have professors in the Department of Economics who specialize in Austrian Economics, but its Mercatus Center also provides faculty support, funding, workshops, and events. George Mason University housed 2 Nobel Laureates (James Buchanan and Vernon Smith) in economics, which is one of the fourteen universities worldwide that ever won at least 2 Nobel Prizes in economics. GMU is an R1 research institution offering undergraduate, master's, and doctoral programs in economics with courses in Austrian economics. GMU is the best university in the United States to get a PhD in Economics if you want to specialize in Austrian economics along with compulsory conventional training in mainstream economics and mathematical/computational methods. If you decide to specialize in econometrics instead to gain more empirical relevance, the GMU faculty has great professors in those fields as well.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              If you change your mind that you want to explore other schools of thought, it will be at your liberty to change your academic focus. The 2 Nobel Prizes from GMU in Economics were in Public Choice and Experimental Economics respectively (James Buchanan and Vernon Smith), so you could learn about other schools of thought and their affinities and differences. The GMU faculty has prominent Austrians like Peter Boettke, Christopher Coyne, and Virgil Storr, as well as famous free-enterprisers like Bryan Caplan and Tyler Cowen. GMU has attracted distinguished scholars who graduated from the best universities in the world to support your learning. Many professors of the Chicago School and the Virginian School of Political Economy are also teaching at GMU. Therefore, GMU should be considered if you want to study economics at an undergraduate level, although the support from faculty and peers will be better if you go to a liberal arts institution. What is more, George Mason University is located near Washington DC, so the abundant career opportunities are also a selling point for GMU.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">Loyola University New Orleans</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Loyola University New Orleans is a Jesuit university located in New Orleans, Louisiana. It is not a highly-ranked institution, but its economic professors are among the best in the country. The Business School of Loyola New Orleans is led by the renowned Austro-libertarian economist Walter Block, Harold E. Wirth Eminent Scholar Endowed Chair and Professor of Economics, and he is also a senior fellow at the Mises Institute. Professor Block has published around 650 research papers in refereed journals, which is unprecedented in the field of social science. He also helped over 100 undergraduate students publish their papers in academic journals, and the research opportunities and training he can provide throughout your undergraduate studies cannot be found elsewhere. His expertise and experience in academia and the business world are extremely valuable for anyone who wants to major in economics and social sciences. Dr. Walter Block also hosts the Human Action Conferences, closely reading the most iconic treatise in economics "Human Action" by Ludwig von Mises. The other two scholars are also Austrian-friendly economists, providing essential quantitative training for students so that every economics student can learn the technical tools to understand the language of modern economics.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              NOTE: Professor Walter Block has his own scholarship program (100k for four years) for those interested in Austrio-libertarian studies.
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-6">Country: UK</h2>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">London School of Economics</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              The London School of Economics is possibly the best research university in Europe to study Economics. It is located in London, which is one of the largest financial centres, providing excellent educational and employment opportunities for London students. The prominent Austrian economist Frederick Hayek was a Professor of Economics at LSE for around twenty years, and there are still faculty members upholding Hayek's philosophy at LSE STICERD (It has a Hayek Program in Economics and Liberal Political Economy). LSE has invited leading Austrians to lecture at the university, including Professor Peter J Boettke and Professor Christopher Coyne. LSE's economics program is possibly the most competitive for prospective students. LSE is, therefore, an excellent school for students determined to receive rigorous technical training as well as some exposure to Austrian economics.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">King's College London</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              King's College London is an excellent school to learn Austrian economics. The university has a Department of Political Economy, while the economics program is also taught by the business school. The department houses economists who work on Austrian economics, the Bloomington School of Political Economy, and Public Choice. For economics courses, a course that covers the history of economic thought is compulsory for all students enrolled in the Economics Program of King's College London. The courses at this university are interdisciplinary, covering economics, politics, and philosophy. King's College London is one of the top global universities, and, therefore, the admissions difficulty shall not be underestimated. Just like LSE, it provides outstanding academic and employment opportunities as it is located in London.
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-6">Note</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              There are other good universities in the USA and the UK that have Austrio-libertarian professors, but they do not have a lot of them on the faculty. For example, Durham University has Professor Kevin Dowd, who specialises in Austrian Economics and Public Choice, but the university may not have a majority of such professors with similar research inclinations because economics departments now are heavily Keynesian and Neoclassical. For another example, Tulane University, a highly selective university in Louisiana (with an acceptance rate of just 11%) which is situated just right next to Walter Block's Loyola University New Orleans, only has two professors that have Austrian leanings compared to three recognised free-enterprisers at Loyola. Therefore, it is imperative to carefully select the universities that you will apply to.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              What is more, if you want to study more mainstream free-enterprise schools, like Public Choice and Bloomington School of Political Economy, there are more highly ranked colleges you can choose from. For the UK, Oxford, Cambridge, LSE, and KCL all have faculty members specialising in Public Choice. For the US, Yale, Vanderbilt, the University of California Irvine, the University of Pittsburgh, Florida State University, and Southern Methodist University, although not all of them fall in the Virginian tradition of Public Choice. Other free-enterprise schools include Chapman University, where Nobel Laureate Vernon Smith is teaching. To be frank, there are so many others in this category.
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-6">Additional Institutions</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              There are other colleges in addition to the abovementioned that have Austrian economics as part of their official program or there are Austrian economists on the faculty:
            </p>
            <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-2 mb-6">
              <li>The Citadel, South Carolina (USA)</li>
              <li>Wofford College, South Carolina (USA)</li>
              <li>Hampden-Sydney College, Virginia (USA)</li>
              <li>Beloit College, Minnesota (USA)</li>
              <li>San Jose State University, California (USA)</li>
              <li>Oklahoma State University, Oklahoma (USA)</li>
              <li>Texas Tech University (Free Market Institute), Texas (USA)</li>
              <li>Angelo State University, Texas (USA)</li>
              <li>Southern Methodist University, Texas (USA)</li>
              <li>Baylor University, Texas (USA)</li>
              <li>Florida Gulf Coast University, Florida (USA)</li>
              <li>Florida State University, Florida (USA)</li>
              <li>University of Mississippi (Ole Miss), Mississippi (USA)</li>
              <li>Troy University, Alabama (USA)</li>
              <li>Rollins College, Florida (USA)</li>
              <li>Wabash College, Indiana (USA)</li>
              <li>Northwood University, Michigan (USA)</li>
              <li>Durham University (UK)</li>
              <li>University of Manchester Business School (UK)</li>
            </ul>
          </article>
        </motion.div>
      </Section>
    </div>
  )
}
