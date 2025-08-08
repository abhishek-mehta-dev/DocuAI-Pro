"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useLogout } from "@/hooks/useUser";
import { useHeaderVisibility } from "@/context/store/useHeaderVisibility";
import { useRouter } from "next/navigation";
import { Menu, X, Zap, User, Settings, LogOut, CreditCard, FileText, HelpCircle, ChevronDown, Bell, Search, Moon, Sun } from 'lucide-react';
import routes from "@/lib/routes";
import { useDispatch } from "react-redux";
import { showMessage } from "@/context/store/messageSlice";

const ROUTES_WITHOUT_HEADER = ["/admin"];

// Default routes - can be imported from lib/routes if available


const navigationLinks = [
  { name: "Features", href: "#features", external: false },
  { name: "Pricing", href: "#pricing", external: false },
  { name: "Testimonials", href: "#testimonials", external: false },
  { name: "Help", href: "/help", external: false },
];

export default function Header() {
  const pathname = usePathname();
  const { isHeaderVisible } = useHeaderVisibility();
  const { isAuthenticated, user, refreshUser } = useAuth();
  const { logoutUser } = useLogout();
  const dispatch = useDispatch();
  const router = useRouter();
  const shouldHideHeader = ROUTES_WITHOUT_HEADER.some((route) =>
    pathname.startsWith(route)
  );

  // New interactive state
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notifications] = useState(3); // Mock notification count

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Existing conditional return preserved
  if (!isHeaderVisible || shouldHideHeader) return null;

  const handleLogout = async () => {
    const logout = await logoutUser();

    if (logout) {
      dispatch(
        showMessage({ message: "Logout Successfully", type: "success" })
      );
      router.push(routes.home);
    }
  };

  const handleNavClick = (href, external = false) => {
    if (external) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(href);
    }
    setIsMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Here you would typically update your theme context or localStorage
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search functionality
      console.log('Searching for:', searchQuery);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header className={`
        sticky top-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-white border-b border-gray-100'
        }
      `}>
        <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-4">
          {/* Logo - Enhanced */}
          <div className="flex items-center gap-3">
            <Link href={routes.home} className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                DocuAI Pro
              </span>
              <Badge variant="secondary" className="text-xs hidden sm:inline-flex">
                AI Powered
              </Badge>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigationLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href, link.external)}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hidden sm:flex"
            >
              <Search className="w-4 h-4" />
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden sm:flex"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative hidden sm:flex">
                  <Bell className="w-4 h-4" />
                  {notifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500">
                      {notifications}
                    </Badge>
                  )}
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-100">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.first_name} />
                        <AvatarFallback>
                          {user?.first_name?.[0] || user?.username?.[0] || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:inline text-sm font-medium">
                        {user?.first_name || user?.username || "Profile"}
                      </span>
                      <ChevronDown className="w-4 h-4 hidden sm:inline" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium">{user?.first_name || user?.username}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push(routes.profile)}>
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(routes.dashboard)}>
                      <FileText className="w-4 h-4 mr-2" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(routes.billing)}>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(routes.settings)}>
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => router.push(routes.login)}
                  className="text-sm hidden sm:flex"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => router.push(routes.register)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Get Started
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="border-t bg-white px-4 py-3">
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documentation, features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-lg">DocuAI Pro</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <nav className="space-y-4">
                {navigationLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href, link.external)}
                    className="block w-full text-left py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {link.name}
                  </button>
                ))}

                <div className="border-t pt-4 mt-6">
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.first_name} />
                          <AvatarFallback>
                            {user?.first_name?.[0] || user?.username?.[0] || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{user?.first_name || user?.username}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => router.push(routes.profile)}
                        className="w-full justify-start"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full justify-start text-red-600"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        onClick={() => router.push(routes.login)}
                        className="w-full"
                      >
                        Sign In
                      </Button>
                      <Button
                        onClick={() => router.push(routes.register)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                      >
                        Get Started
                      </Button>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
