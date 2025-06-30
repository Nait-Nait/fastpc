import FooterPage from "../Footer";
import NavigationMenuDemo from "../Header";

interface ScaffoldProps {
  children: React.ReactNode;
}

export default function Scaffold({ children }: ScaffoldProps) {
  return (
    <div className="max-w-7xl mx-auto flex flex-col min-h-screen">
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <NavigationMenuDemo />
          {children}
        </main>
        <FooterPage />
      </div>
    </div>
  );
}
