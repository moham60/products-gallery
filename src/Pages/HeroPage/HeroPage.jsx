import  './heroStyle.css'

export default function HeroPage() {
 
  return (
    <div className={`h-screen hero  flex items-center justify-center`}>
      <p className=" max-w-[80%] text-xl md:text-2xl text-white text-center">
        Discover a curated collection of high-quality products tailored to your
        lifestyle. Browse, filter, and shop with ease.
      </p>
    </div>
  );
}
