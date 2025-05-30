// src/layouts/AdminLayout/Sidebar.tsx
import { NavLink } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Home, Users, Settings } from 'lucide-react';
import { useState } from 'react';

const links = [
  { to: '/admin/users', label: 'Kullanıcılar', icon: Users },
  { to: '/admin/home-rooms', label: 'Home-Rooms', icon: Home },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
  // diğer admin linkleri
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  // ⚡ mobilde Sheet, desktop’ta sabit sidebar
  return (
    <>
      {/* mobile hamburger */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="m-2">
            <Home className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-56">
          <NavBody onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* desktop */}
      <aside className="hidden lg:block w-56 bg-background border-r">
        <NavBody />
      </aside>
    </>
  );
}

function NavBody({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1 p-4">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-2 rounded px-3 py-2 text-sm transition 
            ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`
          }
          onClick={onNavigate}
        >
          <Icon className="h-4 w-4" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
