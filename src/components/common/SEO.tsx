// src/components/common/SEO.tsx
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
}

export const SEO = ({ title, description, keywords }: SEOProps) => {
  return (
    <Helmet>
      <title>{title} | آیان تراز</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <html lang="fa" dir="rtl" />
    </Helmet>
  );
};
