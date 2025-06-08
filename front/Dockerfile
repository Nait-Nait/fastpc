# nixos > cualquier distro de linux
FROM nixos/nix

WORKDIR /app

COPY . .

CMD ["nix-shell", "--pure", "shell.nix"]
