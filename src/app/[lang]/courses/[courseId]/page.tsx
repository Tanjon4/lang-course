// src/app/[lang]/courses/[courseId]/page.tsx
import { Metadata } from 'next';
import LanguageLearning from '@/components/course/LanguageLearning';
import Layout from '@/components/layout/BaseLayout';

interface CoursePageProps {
  params: {
    lang: string;
    courseId: string;
  };
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { courseId, lang } = params;
  
  return {
    title: `Cours de Langue - ${courseId}`,
    description: `Apprenez une nouvelle langue avec notre cours interactif ${courseId}`,
    openGraph: {
      title: `Cours de Langue - ${courseId}`,
      description: `Apprenez une nouvelle langue avec notre cours interactif ${courseId}`,
      type: 'website',
    },
  };
}

export default function CoursePage({ params }: CoursePageProps) {
  return (
    <Layout>
      <br /><br />
        <LanguageLearning courseId={Number(params.courseId)} />
     
    </Layout>
  );
}