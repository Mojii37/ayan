export interface MetaTag {
  name: string;
  content: string;
}

export interface OpenGraph {
  title: string;
  description: string;
  image: string;
  url: string;
  type: 'website' | 'article';
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  robots: string;
  canonical: string;
  metaTags: MetaTag[];
  openGraph: OpenGraph;
  schema: Record<string, unknown>;
}

export interface SEOIssue {
  type: 'error' | 'warning' | 'success';
  message: string;
  priority: 'high' | 'medium' | 'low';
  howToFix: string;
}

export interface SEOAnalysis {
  score: number;
  issues: SEOIssue[];
}