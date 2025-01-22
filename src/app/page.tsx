import DecodeLoader from "./components/DecodeLoader/DecodeLoader"
export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <DecodeLoader message="Loading complete" duration={3000} delay={2000} />
    </main>
  )
}

