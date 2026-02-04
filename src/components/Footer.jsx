const Footer = () => {
  return (
    <footer className="bg-black/70 backdrop-blur-lg border-t border-white/10 text-white/70">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">

        <div>
          <p className="font-semibold text-white">DevConnect</p>
          <p className="opacity-60">Connect • Build • Grow 🚀</p>
        </div>

        <div className="flex gap-6 opacity-70">
          <a className="hover:text-white transition cursor-pointer">Twitter</a>
          <a className="hover:text-white transition cursor-pointer">YouTube</a>
          <a className="hover:text-white transition cursor-pointer">Facebook</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
