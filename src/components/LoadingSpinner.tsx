import { LoaderCircle } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  text?: string;
}

const LoadingSpinner = ({
  size = 20,
  text,
}: LoadingSpinnerProps) => {
  return (
    <span className="inline-flex items-center justify-center gap-2">
      <LoaderCircle
        size={size}
        className="animate-spin"
      />
      {text && <span>{text}</span>}
    </span>
  );
};

export default LoadingSpinner;