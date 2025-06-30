export default function FooterPage() {
  return (
    <footer className="max-w-7xl mx-auto w-full border-t-2 border-[var(--main)]">
      <div className="flex flex-col items-center justify-center bg-[var(--background)] text-center">
        <p className="text-sm opacity-70 max-w-md pt-6 px-4">
          Nuestra misión es ayudarte a armar tu PC ideal, eligiendo los
          componentes perfectos para tu rendimiento y presupuesto.
        </p>

        <span className="p-5 opacity-50">
          © 2025 FitMyRig. Todos los derechos reservados. Santiago, Chile
        </span>
      </div>
    </footer>
  );
}
