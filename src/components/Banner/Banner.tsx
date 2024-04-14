interface BannerProps {
  title: string;
  description: string;
  backgroundImage: string;
  height: string;
}

export default function Banner(props: BannerProps) {
  return (
    <div
      className='hero min-h-[75vh] bg-cover bg-center bg-no-repeat'
      style={{
        backgroundImage: `url(${props.backgroundImage})`,
      }}
    >
      <div className='hero-overlay bg-opacity-60'></div>
      <div className='hero-content text-center text-neutral-content'>
        <div className='max-w-md'>
          <h1 className='mb-5 text-5xl font-bold'>{props.title}</h1>
          <p className='mb-5'>{props.description}</p>
        </div>
      </div>
    </div>
  );
}
