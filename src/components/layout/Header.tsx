
import { Moon, Sun, Code, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Header = ({ toggleDarkMode, isDarkMode }: HeaderProps) => {
  return (
    <header className="border-b border-border">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">Tangle Blueprint</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
