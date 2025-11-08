import ExamComponent from "@/components/course/ExamComponent";

export default function ExamPage({ params }: { params: any }) {
  const examId = Number(params.lessonId);
  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <ExamComponent examId={examId} />
    </main>
  );
}
