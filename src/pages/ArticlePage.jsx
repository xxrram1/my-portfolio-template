import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { articles } from '../data';
import { motion } from 'framer-motion';
import SEO from '../components/SEO'; // --- เพิ่มเข้ามา ---
import { ArrowLeft } from 'lucide-react';

const ArticlePage = () => {
    const { slug } = useParams();
    const { t } = useTranslation();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const foundArticle = articles.find(a => a.slug === slug);
        setArticle(foundArticle);
        window.scrollTo(0, 0);
    }, [slug]);

    if (!article) return null;

    return (
        <>
            <SEO 
                title={`${t(article.titleKey)} | Blog`}
                description={t(article.summaryKey)}
                type="article"
            />
            <motion.div 

            className="py-32 px-8 bg-white dark:bg-slate-950"

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            exit={{ opacity: 0 }}

            transition={{ duration: 0.5 }}

        >

            <div className="max-w-4xl mx-auto">

                <div className="mb-8">

                    <Link to="/#blog" className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline">

                        <ArrowLeft size={16} />

                        {t('nav.blog')}

                    </Link>

                </div>

                <h1 className="text-4xl md:text-5xl font-light text-slate-900 dark:text-slate-50 mb-4 leading-tight">

                    {t(article.titleKey)}

                </h1>

                <p className="text-slate-500 dark:text-slate-400 mb-8">{article.publishedDate}</p>



                <img src={article.imageUrl} alt={t(article.titleKey)} className="w-full aspect-video object-cover rounded-lg mb-12 shadow-lg"/>



                <div className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line selection:bg-indigo-500/20">

                    <p>{t(article.contentKey)}</p>

                </div>

            </div>

        </motion.div>
        </>
    );
};

export default ArticlePage;
