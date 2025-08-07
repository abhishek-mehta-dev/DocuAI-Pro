"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useHeaderVisibility } from "@/context/store/useHeaderVisibility";
import routes from "@/lib/routes";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useLogout } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showMessage } from "@/context/store/messageSlice";

const ROUTES_WITHOUT_HEADER = ["/admin"];

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

  return (
    <header className="border-b">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-4">
        <div className="font-bold text-lg">
          <a href={routes.home}>DocuAI Pro</a>
        </div>

        <nav className="flex items-center gap-4">
          <a href="#pricing" className="text-sm">
            Pricing
          </a>

          {isAuthenticated ? (
            <>
              <Link href={routes.profile}>
                <Button variant="outline" className="text-sm">
                  {user?.first_name || user?.username || "Profile"}
                </Button>
              </Link>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-sm text-red-600"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <a href={routes.login} className="text-sm">
                Sign In
              </a>
              <Link href={routes.register} passHref>
                <Button component="a">Get Started</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
