// app/[lang]/courses/page.tsx
'use client';

import Layout from "@/components/layout/BaseLayout";
import { useCourses } from '@/lib/hooks/useCourses';
import CourseGlobalComponent from '@/components/course/CourseGlobalComponent'


export default function CoursesPage() {
  // return <CoursesComponent />;
  return(
    <Layout>
        <br /> <br />
        <CourseGlobalComponent />
        
       
    </Layout>
  )

}


