{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.pnpm
    pkgs.typescript
    pkgs.typescript-language-server
    pkgs.nodejs_24
  ];

  shellHook = ''
    pnpm i && pnpm run build && pnpm run preview
  '';
}

