// src/app/[lang]/courses/[courseId]/layout.tsx
import { CourseProgressProvider } from '@/contexts/CourseProgressContext';

export default function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) {
  return (
    <CourseProgressProvider initialCourseId={Number(params.courseId)}>
      {children}
    </CourseProgressProvider>
  );
}