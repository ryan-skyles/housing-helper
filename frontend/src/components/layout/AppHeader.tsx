import { Menu, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MenuNav from "@/components/layout/MenuNav";

const AppHeader = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-card border-b border-border">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Home className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-display font-semibold text-foreground text-lg">HousingAid</span>
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-72 p-0">
          <SheetHeader className="p-6 pb-2">
            <SheetTitle className="font-display">Menu</SheetTitle>
          </SheetHeader>
          <MenuNav />
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default AppHeader;
