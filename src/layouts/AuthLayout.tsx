import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-surface md:h-screen md:overflow-hidden">
      {children}
    </main>
  );
};

export default AuthLayout;
