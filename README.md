# AstroStack (Astro, Payload CMS, and Tailwind CSS)

Bundled together in a monorepo using [Turbo](https://turbo.build) and [pnpm](https://pnpm.io).

```txt
.github
  └─ workflows
        └─ CI with pnpm cache setup
apps
  ├─ web (Astro)
  |   ├─ Astro v4
  |   ├─ Tailwind CSS
  |   └─ Payload CMS Local API
  |─ cms (Payload CMS)
  |   └─ Payload CMS v2
  └─ server (Express)
      ├─ Imports Astro as middleware
      └─ Imports Payload CMS as middleware
```

## Apps and Packages

- `web`: [Astro](https://astro.build) app with [Tailwind CSS](https://tailwindcss.com)
- `cms`: [Payload CMS](https://payloadcms.com)
- `server`: [Express](https://expressjs.com) server
- `eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`) [ESLint](https://eslint.org/), [Prettier](https://prettier.io)
- `typescript-config`: `tsconfig.json`s used throughout the monorepo [TypeScript](https://www.typescriptlang.org/)de formatting

### Build

To build all apps and packages, run the following command:

```bash
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```bash
pnpm dev
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
