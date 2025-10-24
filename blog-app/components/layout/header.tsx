"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Create",
    href: "/post/create",
  },
];

export default function Header() {
  const { data } = useSession();
  const router = useRouter();

  const logout = async () => {
    try {
      const { error } = await signOut();
      router.push("/auth");

      if (error) {
        toast.error("Logged out successfully");
      } else {
        toast.success("Logged out successfully");
      }
    } catch (e) {
      toast.error("Error while logging out");
    }
  };

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="flex justify-between items-center container mx-auto p-4">
        <div className="flex items-center gap-6">
          <Link href={"/"} className="text-2xl font-bold">
            Blog App
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((nav) => (
              <Link key={nav.href} href={nav.href} className="hover:font-bold">
                {nav.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div>Search here...</div>
          <div className="flex items-center">
            <Button variant={"ghost"} asChild>
              {data?.session && (
                <Link href={"#"} onClick={logout}>
                  Logout
                </Link>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
