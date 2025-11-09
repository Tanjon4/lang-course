// app/[lang]/courses/page.tsx
'use client';

import Layout from "@/components/layout/BaseLayout";
import { useCourses } from '@/lib/hooks/useCourses';


export default function CoursesPage() {
  // return <CoursesComponent />;
  return(
    <Layout>
        <br /> <br />
        <h1 className="text-2xl font-bold">ireto avy ny lesona ao amin'io chapitre io </h1>
        
       
    </Layout>
  )

}


