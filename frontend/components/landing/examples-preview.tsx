'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function ExamplesPreview() {
  return (
    <section className="py-20 md:py-32 border-t">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            See It In Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Preview what JSONCraft generates from your JSON data
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="typescript" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="typescript">TypeScript</TabsTrigger>
              <TabsTrigger value="zod">Zod</TabsTrigger>
              <TabsTrigger value="prisma">Prisma</TabsTrigger>
            </TabsList>

            <TabsContent value="typescript" className="mt-6">
              <div className="rounded-lg border bg-card p-6 font-mono text-sm">
                <pre className="text-xs md:text-sm leading-relaxed overflow-x-auto">
                  <code className="language-typescript">
{`interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
  address: Address;
  tags: string[];
}

interface Address {
  street: string;
  city: string;
  zipCode: string;
}`}
                  </code>
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="zod" className="mt-6">
              <div className="rounded-lg border bg-card p-6 font-mono text-sm">
                <pre className="text-xs md:text-sm leading-relaxed overflow-x-auto">
                  <code className="language-typescript">
{`import { z } from 'zod'

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  zipCode: z.string(),
})

const userSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string(),
  age: z.number().int(),
  isActive: z.boolean(),
  address: addressSchema,
  tags: z.array(z.string()),
})

type User = z.infer<typeof userSchema>`}
                  </code>
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="prisma" className="mt-6">
              <div className="rounded-lg border bg-card p-6 font-mono text-sm">
                <pre className="text-xs md:text-sm leading-relaxed overflow-x-auto">
                  <code className="language-prisma">
{`generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  name      String
  email     String
  age       Int
  isActive  Boolean
  address   Json
  tags      Json
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}`}
                  </code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
