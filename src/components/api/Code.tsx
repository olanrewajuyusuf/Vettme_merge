export default function Code({
    header,
    body,
}: {
header: string;
body: string;
}) {
    return (
      <div className="rounded-lg border-[1px] border-gray-200 bg-gray-100 code w-full max-w-2xl">
        <p className="text-xs border-b-[1px] border-b-gray-200 p-2">{header}</p>
        <pre className="px-2 py-4 text-sm">{body}</pre>
      </div>
    );
}