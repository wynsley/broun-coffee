function AboutUsFloatingImage({ src, alt, ...props }) {
  return (
    <div 
      className="md:w-1/3 flex justify-center items-center my-10 md:my-0 relative"
      {...props}
    >
      <div className="absolute inset-0 bg-[#FFBB00] blur-[100px] opacity-10 rounded-full animate-pulse"></div>

      <img 
        src={src} 
        alt={alt} 
        className="relative z-10 w-64 sm:w-72 md:w-96 object-contain drop-shadow-2xl transition-transform duration-500 hover:rotate-3"
      />
    </div>
  )
}

export { AboutUsFloatingImage }