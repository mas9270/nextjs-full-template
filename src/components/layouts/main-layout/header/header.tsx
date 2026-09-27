import AuthButtons from "@/components/common/auth-buttons";
import LanguageToggle from "@/components/common/language-toggle";
import ThemeToggle from "@/components/common/theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/60 bg-background/80 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div
          className="flex items-center gap-2 rounded-xl p-1 
        "
        >
          <ThemeToggle />
          <div className="h-4 w-px bg-border/60" />
          <LanguageToggle />
        </div>

        <div className="flex items-center gap-3">
          <AuthButtons />
        </div>
      </div>
    </header>
  );
}
