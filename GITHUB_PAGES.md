# Deploy no GitHub Pages

O projecto está preparado para o repositório `GHotelaria/painelg`. O workflow em `.github/workflows/deploy-pages.yml` instala as dependências, executa `pnpm build` e publica automaticamente `dist/public`.

## Primeira publicação

1. Exporte ou envie o projecto completo para `https://github.com/GHotelaria/painelg`.
2. Confirme que a branch principal se chama `main`.
3. No GitHub, abra **Settings → Pages**.
4. Em **Build and deployment → Source**, seleccione **GitHub Actions**.
5. Faça um commit na branch `main` ou execute o workflow manualmente em **Actions → Deploy painelg → Run workflow**.
6. Depois de concluído, o endereço será `https://ghotelaria.github.io/painelg/`.

## Actualizações futuras

Sempre que fizer `push` para a branch `main`, o GitHub executará novamente o workflow e actualizará o site. Não é necessário enviar manualmente a pasta `dist`.

## Importante

O repositório deve conter o projecto completo, não apenas os ficheiros compilados. O `vite.config.ts` já usa automaticamente `/painelg/` durante o build do GitHub Actions e `/` no ambiente local.
