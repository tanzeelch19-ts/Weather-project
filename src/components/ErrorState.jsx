import { AlertIcon } from "../components/icons.jsx";

export default function ErrorState({ message, onRetry }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center text-center gap-3.5 py-12 px-5 text-accent-rose"
    >
      <AlertIcon size={32} />
      <p className="text-text-secondary text-[14.5px] max-w-[320px]">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="bg-panel-solid border border-panel-border-strong text-text-primary px-4.5 py-2 rounded-sm2 font-body text-[13.5px] cursor-pointer hover:border-accent-blue"
      >
        Try again
      </button>
    </div>
  );
}