function Animation({link}) {
  return (
    <section className="h-[80%]">
    <video
      src={link}
      className="w-full h-full rounded-md"
      autoPlay
      muted
      playsInline
      onMouseOver={(e) => e.preventDefault()}
      />
      </section>
  );
}

export default Animation;
