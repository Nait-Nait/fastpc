export default function FooterPage() {
  return (
    <>
      <div className="h-80 bottom-0"></div>{" "}
      {/* Ajustamos para el nuevo alto del footer */}
      <footer className="max-w-7xl mx-auto w-full border-t-2 border-[var(--main)] fixed bottom-0">
        <div className="flex flex-col items-center justify-center bg-[var(--background)] text-center">
          {/* Misión */}
          <p className="text-sm opacity-70 max-w-md pt-6 px-4">
            Nuestra misión es ayudarte a armar tu PC ideal, eligiendo los
            componentes perfectos para tu rendimiento y presupuesto.
          </p>

          {/* Texto original intacto */}
          <span className="p-5 opacity-50">
            © 2025 FitMyRig. Todos los derechos reservados. Santiago, Chile
          </span>
        </div>
      </footer>
    </>
  );
}
