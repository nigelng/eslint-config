{
  description = "Dev environment for @nigelng/eslint-config-base";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";

  outputs =
    { nixpkgs, ... }:
    let
      # Keep in sync with package.json "packageManager" and .yarnrc.yml yarnPath
      yarnVersion = "4.16.0";
      yarnRelease = ".yarn/releases/yarn-${yarnVersion}.cjs";

      supportedSystems = [
        "aarch64-darwin"
        "aarch64-linux"
        "x86_64-linux"
      ];
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;
    in
    {
      devShells = forAllSystems (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          default = pkgs.mkShell {
            buildInputs = with pkgs; [
              nodejs_24
            ];

            shellHook = ''
              yarn() {
                exec ${pkgs.nodejs_24}/bin/node "$PWD/${yarnRelease}" "$@"
              }
              export -f yarn
            '';
          };
        }
      );
    };
}
