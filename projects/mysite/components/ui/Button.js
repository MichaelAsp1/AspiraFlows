export default function Button({ as: As = "button", className = "", ...props }) {
  return (
    <As
      className={`inline-flex items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-2 text-white hover:from-cyan-400 hover:to-purple-400 disabled:opacity-50 transition-colors neon-glow-cyan ${className}`}
      {...props}
    />
  );
}
