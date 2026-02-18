export default function AnimatedBackground() {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full bg-pattern-light dark:bg-pattern-dark opacity-30" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 dark:bg-[hsl(var(--dark-primary))]/10 rounded-full filter blur-3xl animate-blob will-change-transform" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000 will-change-transform" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000 will-change-transform" />
    </>
  );
}
