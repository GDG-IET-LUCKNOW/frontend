export function Footer() {
  return (
    <footer className="border-t border-glass-border bg-background/50 backdrop-blur-lg pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start space-y-2">
          <span className="font-bold text-xl tracking-tight">IETECH</span>
        </div>
        
        <p className="max-w-md text-foreground/60 leading-relaxed mb-8">
          Empowering the next generation of developers and tech innovators.
        </p>

        <div className="flex items-center space-x-6 text-sm text-foreground/60">
          <a href="#" className="hover:text-primary transition-colors">Instagram</a>
          <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-primary transition-colors">Discord</a>
        </div>
      </div>
      
      <div className="border-t border-glass-border/30 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-foreground/40 font-medium">
        &copy; {new Date().getFullYear()} IETECH. All rights reserved.
      </div>
    </footer>
  );
}
