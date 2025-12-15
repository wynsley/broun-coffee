function AboutUsMainTitle({ text, ...props }) {
  return (
    <h1 
      className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-20 text-center tracking-wide drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]"
      {...props}
    >
      {text}
    </h1>
  )
}

export { AboutUsMainTitle }