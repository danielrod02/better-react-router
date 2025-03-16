SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

pnpm install
pnpm approve-builds

pnpx prisma init
# The schema.prisma file must have a model defined to it can generate the client.
# The model can be anything, but it must be there.
# If the model is not defined, the client will not be generated.
# and hence `pnpx @better-auth/cli@latest generate` will fail.
# Include a Dummy model like:
# model Dummy {
#   id Int @id @default(autoincrement())
# }
pnpx prisma generate
npx prisma migrate dev --name init
pnpm install @prisma/client
pnpm approve-builds
pnpx @better-auth/cli@latest generate --config "$SCRIPT_DIR/app/lib/auth.ts"
npx prisma migrate dev --name auth

# shadcn init
# pnpm dlx shadcn@latest init