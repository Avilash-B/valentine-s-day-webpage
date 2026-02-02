import { FloatingElements } from "@/components/floating-elements"
import { ValentineCard } from "@/components/valentine-card"

export default function ValentinePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingElements />
      <div className="relative z-10">
        <ValentineCard />
      </div>
    </main>
  )
}
