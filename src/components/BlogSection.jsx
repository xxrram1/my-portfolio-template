import React from 'react';
import { useTranslation } from 'react-i18next';
import { articles } from '../data'; // นำเข้าข้อมูลบทความจำลอง
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // ใช้ Link เพื่อเปลี่ยนหน้า

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  },
};

const BlogSection = () => {
    const { t } = useTranslation();

    // ในสถานการณ์จริง ส่วนนี้จะใช้ useEffect เพื่อ fetch ข้อมูลจาก Headless CMS
    // useEffect(() => {
    //   fetch('https://your-headless-cms.com/api/articles')
    //     .then(res => res.json())
    //     .then(data => setArticles(data));
    // }, []);

    return (
        <motion.section
            id="blog"
            className="py-24 px-8"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-4">
                        {t('blog.title')}
                    </div>
                    <h2 className="text-3xl font-light text-slate-900 dark:text-slate-50">
                        {t('blog.heading')}
                    </h2>
                    <div className="w-16 h-0.5 bg-slate-300 dark:bg-slate-600 mx-auto mt-6"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {articles.map(article => (
                        <Link to={`/article/${article.slug}`} key={article.id} className="group block">
                            <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:border-slate-400 dark:hover:border-slate-700">
                                <div className="aspect-video overflow-hidden">
                                     <img src={article.imageUrl} alt={t(article.titleKey)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{article.publishedDate}</p>
                                    <h3 className="text-xl font-medium text-slate-900 dark:text-slate-50 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                        {t(article.titleKey)}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow">
                                        {t(article.summaryKey)}
                                    </p>
                                    <div className="mt-auto text-sm font-bold text-indigo-600 dark:text-indigo-400">
                                        {t('blog.read_more')} &rarr;
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default BlogSection;