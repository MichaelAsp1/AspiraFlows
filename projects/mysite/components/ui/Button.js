export default function Button({ as: As = "button", className = "", ...props }) {
  return (
    <As
      className={`inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
