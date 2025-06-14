import NavigationMenuDemo from "../Header";

interface ScaffoldProps {
  children: React.ReactNode;
}

export default function Scaffold({ children }: ScaffoldProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <NavigationMenuDemo />
      {children}
    </div>
  );
}
