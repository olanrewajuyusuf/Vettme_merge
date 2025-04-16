import { ClipboardIcon } from "@radix-ui/react-icons";

export default function EmptyState() {
  return (
    <div className="min-h-[300px] w-full h-full flex flex-col items-center justify-center gap-3">
      <span className="scale-[400%] opacity-30 mb-4">
        <ClipboardIcon />
      </span>
      <p>There's nothing here yet</p>
    </div>
  );
}
