import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Section from '../components/ui/Section'
import { articles } from '../utils/constants'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../utils/translations'

function formatDate(isoDate, lang) {
  const date = new Date(isoDate)
  return date.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function ArticleDetailPage() {
  const { id } = useParams()
  const { lang } = useLanguage()
  const t = translations[lang].articlesPage
  const article = articles.find(a => a.id === Number(id))

  const localizedArticle = (() => {
    if (!article) return null
    if (lang === 'zh' && t.articles) {
      const translated = t.articles.find(a => a.id === article.id)
      if (translated) return { ...article, ...translated }
    }
    return article
  })()

  if (!localizedArticle) {
    return (
      <div className="pt-24">
        <Section background="gray">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              {lang === 'zh' ? t.articleNotFound : 'Article Not Found'}
            </h1>
            <Link to="/articles" className="text-gray-400 hover:text-white underline">
              {lang === 'zh' ? t.backToArticles : '← Back to Articles'}
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
            {lang === 'zh' ? t.backToArticles : '← Back to Articles'}
          </Link>

          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <span>{localizedArticle.category}</span>
            <span>•</span>
            <span>{localizedArticle.readTime}</span>
            <span>•</span>
            <span>{formatDate(localizedArticle.date, lang)}</span>
            {localizedArticle.author && (
              <>
                <span>•</span>
                <span>{t.by}{localizedArticle.author}</span>
              </>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
            {localizedArticle.title}
          </h1>

          <p className="text-xl text-gray-400 mb-10 leading-relaxed border-l-4 border-white pl-6">
            {localizedArticle.summary}
          </p>

          {lang === 'zh' && localizedArticle.id === 1 ? (
            <article className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-white mb-6">为有意深入研究奥地利经济学的准学生提供院校清单</h2>

              <p className="text-gray-300 leading-relaxed mb-6">
                正如乔治梅森大学的Boettke教授所言，奥地利经济学派正处于蓬勃发展之中，但在当前学术界仍远非主流，认可度也相当有限。其将经济学视为"行为学"（praxeology）的独特理念，以及对个体选择与行动的高度重视，使奥地利经济学独树一帜，有别于主流经济学课堂上对谬误数学公式的机械重复。具有奥地利经济学倾向的经济学项目实属稀缺，网上现有的大多数院校清单也早已过时（最近的一份发布于2018年）。本文为您整理了一份值得参考的院校清单，但并不追求面面俱到——毕竟许多高中生更希望进入综合排名较高的学校，因此本文筛去了部分院校。全球确实有一批大学开设奥地利经济学课程（本文仅介绍美英两国院校，因为大多数学生的学术背景与这两个国家的录取要求最为匹配）。为确保清单的可靠性，作者已就相关项目向多位知名奥地利经济学家征询意见。
              </p>

              <h2 className="text-2xl font-bold text-white mt-10 mb-6">美国</h2>

              <h3 className="text-xl font-bold text-white mt-8 mb-4">纽约大学（New York University）</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                纽约大学是美国顶尖大学之一，坐落于全美最大的城市（其经济学研究生院排名全美第11位）。由于纽约是全球最重要的金融中心，这里是学习经济学与商业的理想之地。NYU拥有多位知名奥地利经济学学者，包括Mario Rizzo、David Harper，以及曾在此执教的Israel Kirzner。如果您希望在友好的学术氛围中学习和探讨奥地利经济学，可以关注NYU市场经济基础项目（Foundations of the Market Economy）举办的系列工作坊和活动。许多知名奥地利经济学家都曾在NYU接受训练，因为这里正是Ludwig von Mises的执教之地。但需注意，NYU是一所竞争激烈的大学，对成绩和GPA要求较高；其核心经济学课程技术性强、量化要求较重。此外，如果您对行为经济学感兴趣，跟随Mario Rizzo学习将为您带来有关自由意志主义家长制的全新视角。
              </p>

              <h3 className="text-xl font-bold text-white mt-8 mb-4">Hillsdale学院（Hillsdale College）</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Hillsdale学院是位于美国密歇根州的一所四年制私立文理学院（全美排名第39位），是深入学习奥地利经济学的绝佳之地。尽管在知名度上不及Williams College或Swarthmore College，但它仍是一所高度选拔性的机构——其录取率低至与全美前30名大学相当，申请者不仅需要顶尖成绩，还需与Hillsdale的价值理念高度契合。
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Hillsdale在奥地利经济学领域氛围浓厚，开设奥地利经济学入门与进阶课程，以及经济思想史课程。学院拥有曾在乔治梅森大学和纽约大学接受训练的教授，学生因此可以接触到知名奥地利经济学家的广泛学术网络。这一传统延续至今，使Hillsdale与奥地利经济学的渊源历久弥新。不过，准学生需了解，Hillsdale提供全面的文理教育，文学、宗教研究及其他人文与理科课程是必修基础，并非单纯的经济学项目。
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                对奥地利经济学爱好者而言，Hillsdale最大的吸引力在于：它珍藏着Ludwig von Mises的个人图书馆，其中包含Mises的私人信件及已发表与未发表的著作。
              </p>

              <h3 className="text-xl font-bold text-white mt-8 mb-4">Grove City学院（Grove City College）</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                全球共有两所大学保存有Ludwig von Mises档案：Hillsdale College和Grove City College。Grove City College是位于宾夕法尼亚州Grove City市的一所基督教文理学院，拥有接待知名奥地利经济学家的悠久传统。当Mises在纽约大学的首位博士生Hans Sennholtz教授于1956年加入该校并出任经济学系主任后，这里便成为学习奥地利经济学的首选之地。该校培养了一代又一代杰出的经济学家和教育家，其中包括今日奥地利经济学领域的领军学者Peter J. Boettke教授。Grove City College始终致力于薪火相传。
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Grove City College并非顶级排名院校，但其学术严谨性和校园氛围在同类院校中首屈一指。作为一所基督教大学，它要求学生参加教堂礼拜，并高度重视人文教育。总体而言，这是研究奥地利经济学的优质学府。
              </p>

              <h3 className="text-xl font-bold text-white mt-8 mb-4">乔治梅森大学（George Mason University）</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                乔治梅森大学是美国奥地利经济学领域最优秀的研究型大学之一。GMU不仅在经济学系拥有专攻奥地利经济学的教授，其Mercatus中心还为教师提供资助、举办工作坊和学术活动。GMU曾培养2位经济学诺贝尔奖得主（James Buchanan和Vernon Smith），是全球14所至少获得2项经济学诺贝尔奖大学之一。作为R1研究型大学，GMU提供经济学本科、硕士及博士课程。如果您希望在获得主流经济学和数学与计算方法扎实训练的同时深耕奥地利经济学，GMU是美国攻读经济学博士的最佳选择。若您倾向于转向计量经济学，GMU教师团队中也有出色的相关领域教授。
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                如果日后您希望探索其他经济学流派，这里同样给您充分的学术自由。GMU的2项诺贝尔奖分属公共选择理论（James Buchanan）和实验经济学（Vernon Smith），因此您还可以学习其他流派与奥地利经济学的异同。GMU教师团队汇聚了Peter Boettke、Christopher Coyne、Virgil Storr等奥地利经济学大家，以及Bryan Caplan、Tyler Cowen等知名自由市场经济学家。芝加哥学派和弗吉尼亚政治经济学派的多位教授也在GMU任教。此外，乔治梅森大学毗邻华盛顿特区，丰富的职业发展机会也是其一大竞争优势。
              </p>

              <h3 className="text-xl font-bold text-white mt-8 mb-4">新奥尔良洛约拉大学（Loyola University New Orleans）</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                新奥尔良洛约拉大学是一所位于路易斯安那州的耶稣会大学。尽管综合排名并不靠前，但其经济学教授阵容在全国名列前茅。商学院由著名的奥地利－自由意志主义经济学家Walter Block教授领衔，他同时也是米塞斯研究所的高级研究员。Block教授在同行评审期刊上发表了约650篇学术论文，在社会科学领域史无前例。他还帮助100余名本科生在学术期刊上发表论文，他在整个本科阶段所能提供的科研机会与学术训练，在其他任何地方都难以复制。他在学术界与商界积累的深厚经验，对于任何有志于主修经济学或社会科学的学生而言都极具价值。Walter Block博士还主持"人类行动读书会"（Human Action Conferences），精读Ludwig von Mises的经典著作《人类行动》（Human Action）。另外两位学者也具有奥地利经济学倾向，为学生提供扎实的数量训练。
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                注：Walter Block教授设有专项奖学金（四年共10万美元），专为有志于奥地利－自由意志主义研究的学生提供。
              </p>

              <h2 className="text-2xl font-bold text-white mt-10 mb-6">英国</h2>

              <h3 className="text-xl font-bold text-white mt-8 mb-4">伦敦政治经济学院（London School of Economics）</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                伦敦政治经济学院很可能是欧洲学习经济学的最佳研究型大学。LSE位于伦敦——全球最重要的金融中心之一，为学生提供卓越的教育资源和就业机会。知名奥地利经济学家Friedrich Hayek曾在LSE担任约二十年的经济学教授，时至今日，仍有教员在LSE的STICERD中心延续Hayek的学术传统（该中心设有经济学与自由政治经济学哈耶克项目）。LSE曾邀请Peter J. Boettke和Christopher Coyne等奥地利经济学领军学者前来授课。LSE的经济学项目可能是准学生竞争最为激烈的项目之一，对于希望同时接受严格技术训练和接触奥地利经济学的学生而言是极佳选择。
              </p>

              <h3 className="text-xl font-bold text-white mt-8 mb-4">伦敦国王学院（King's College London）</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                伦敦国王学院是学习奥地利经济学的优质院校。该校设有政治经济学系，经济学课程同时由商学院承担教学，系内拥有从事奥地利经济学、布鲁明顿政治经济学派及公共选择研究的经济学家。经济思想史是国王学院经济学项目所有学生的必修课，且各课程具有跨学科特点，融合经济学、政治学与哲学。国王学院是全球顶尖大学之一，申请难度不容小觑。与LSE一样，其伦敦地理位置带来的学术与就业机会同样出色。
              </p>

              <h2 className="text-2xl font-bold text-white mt-10 mb-6">补充说明</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                在美英两国，还有一些大学拥有奥地利－自由意志主义倾向的教授，但人数相对有限。以英国杜伦大学为例，该校有专攻奥地利经济学和公共选择的Kevin Dowd教授，但由于当今经济学系普遍以凯恩斯主义和新古典主义为主导，类似研究取向的教授未必占据多数。再以杜兰大学为例——这是一所位于路易斯安那州的高度选拔性大学（录取率仅11%），紧邻Walter Block任职的洛约拉大学，但其奥地利经济学倾向教授仅有两位，少于洛约拉的三位自由市场经济学家。因此，认真筛选申请院校至关重要。
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                此外，如果您希望研究公共选择理论、布鲁明顿政治经济学派等更为主流的自由市场经济学流派，可供选择的高排名院校会更多。在英国，牛津、剑桥、LSE和KCL均有专攻公共选择的教员。在美国，耶鲁、范德堡、加州大学欧文分校、匹兹堡大学、佛罗里达州立大学和南卫理公会大学也各有相关学者（尽管并非都属于弗吉尼亚公共选择传统）。其他自由市场经济学流派的院校还包括查普曼大学，诺贝尔奖得主Vernon Smith正在此执教。坦率而言，这类院校不胜枚举。
              </p>

              <h2 className="text-2xl font-bold text-white mt-10 mb-6">其他院校</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                以下院校同样将奥地利经济学纳入了正式课程，或拥有奥地利经济学方向的教师：
              </p>
              <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-2 mb-6">
                <li>The Citadel，南卡罗来纳州（美国）</li>
                <li>Wofford College，南卡罗来纳州（美国）</li>
                <li>Hampden-Sydney College，弗吉尼亚州（美国）</li>
                <li>Beloit College，明尼苏达州（美国）</li>
                <li>San Jose State University，加利福尼亚州（美国）</li>
                <li>Oklahoma State University，俄克拉荷马州（美国）</li>
                <li>Texas Tech University（自由市场研究所），得克萨斯州（美国）</li>
                <li>Angelo State University，得克萨斯州（美国）</li>
                <li>Southern Methodist University，得克萨斯州（美国）</li>
                <li>Baylor University，得克萨斯州（美国）</li>
                <li>Florida Gulf Coast University，佛罗里达州（美国）</li>
                <li>Florida State University，佛罗里达州（美国）</li>
                <li>University of Mississippi（Ole Miss），密西西比州（美国）</li>
                <li>Troy University，阿拉巴马州（美国）</li>
                <li>Rollins College，佛罗里达州（美国）</li>
                <li>Wabash College，印第安纳州（美国）</li>
                <li>Northwood University，密歇根州（美国）</li>
                <li>Durham University（英国）</li>
                <li>University of Manchester Business School（英国）</li>
              </ul>
            </article>
          ) : (
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
          )}
        </motion.div>
      </Section>
    </div>
  )
}
