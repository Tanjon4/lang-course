// src/app/[lang]/courses/[courseId]/page.tsx
import LanguageLearning from '@/components/course/LanguageLearning';
import Layout from '@/components/layout/BaseLayout';

interface PageProps {
  params: {
    lang: string;
    courseId: string;
  };
}

export default function CoursePage({ params }: PageProps) {
  return (
    <Layout>
      <br /> <br />
      <LanguageLearning />
    </Layout>
  );
}