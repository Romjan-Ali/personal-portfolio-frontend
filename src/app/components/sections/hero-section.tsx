// components/sections/hero-section.tsx
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-extrabold">Romjan Ali</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        MERN Stack Developer • React Native • Tailwind • Prisma
      </p>
      <div className="mt-6 flex gap-3">
        <Button asChild>
          <a href="#projects">See Projects</a>
        </Button>
        <Button variant="outline" asChild>
          <a href="#contact">Contact</a>
        </Button>
      </div>
    </section>
  );
}
