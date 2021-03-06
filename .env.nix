let
  unstable = import (fetchTarball https://nixos.org/channels/nixos-unstable/nixexprs.tar.xz) { };
in
{ nixpkgs ? import <nixpkgs> {} }:
with nixpkgs; mkShell {

  buildInputs = [
    unstable.nodejs-12_x
    chromium
    geckodriver
  ];

  NPM_CONFIG_PROXY = builtins.getEnv "http_proxy";
  CHROME_BIN = "${chromium}/bin/chromium";

}