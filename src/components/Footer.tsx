import koraLogo from "@/assets/kora-logo.png";

const Footer = () => (
  <footer className="px-6 py-12 md:px-12 border-t border-border">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <img src={koraLogo} alt="Kora Living" className="h-10 w-auto opacity-70" loading="lazy" />
      <p className="text-xs text-muted-foreground font-body tracking-wider">
        © {new Date().getFullYear()} Kora Living. All rights reserved. | Crafted with care.
      </p>
    </div>
  </footer>
);

export default Footer;
