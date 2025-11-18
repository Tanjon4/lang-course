'use client';
import Layout from '@/components/layout/BaseLayout';
import QuizPage from '@/components/course/ExamComponent';

export default function ContactUs() {
    return(
    <Layout>
        <br /> <br />
        <div className="min-h-screen bg-linear-to-br from-white to-gray-50">
            <QuizPage />
        </div>
    </Layout>
    )
}