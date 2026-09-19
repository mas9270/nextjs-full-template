import ThemeToggle from "@/components/common/theme-toggle";

export default function Header() {
  return (
    <header className="w-full p-2.5 flex items-center justify-between">
      <div className="flex gap-1.5">
        <ThemeToggle />
      </div>
      <div></div>
    </header>
  );
}
