export default function Button({ as: As = "button", className = "", ...props }) {
  return (
    <As
      className={`inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors ${className}`}
      {...props}
    />
  );
}
