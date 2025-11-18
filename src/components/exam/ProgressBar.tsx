// /components/ProgressBar.tsx
import { FC } from "react";

type Props = {
  current: number;
  total: number;
};

const ProgressBar: FC<Props> = ({ current, total }) => {
  const percentage = (current / total) * 100;
  return (
    <div className="w-full bg-gray-200 h-3 rounded-full mb-4">
      <div
        className="bg-indigo-500 h-3 rounded-full transition-all"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
