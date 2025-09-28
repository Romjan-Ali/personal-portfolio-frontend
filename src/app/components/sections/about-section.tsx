// components/sections/about-section.tsx
import { Card, CardContent } from "@/components/ui/card";

export function AboutSection() {
  return (
    <section id="about" className="py-16 px-6">
      <h2 className="text-3xl font-bold mb-6">About Me</h2>
      <Card>
        <CardContent>
          <p>
            I&apos;m a MERN-stack developer specializing in React, Node, Express and
            MongoDB/Prisma. I build mobile apps with Expo/React Native and
            production-ready web apps.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
