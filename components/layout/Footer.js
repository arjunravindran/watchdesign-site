export default function Footer() {
  return (
    <footer className="border-t border-rule mt-24 py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-grey">
        <div className="flex items-center gap-3">
          <div className="w-px h-4 bg-gold-dim" />
          <span className="font-serif text-mist">Watch Design Self-Study Programme</span>
        </div>
        <span>10 Modules · 9 Assignments · 1 Final Pitch Deck</span>
        <span className="italic">"Increase the pressure while observing the entire piece."<br className="sm:hidden" /> — Yuji Kuroki, Grand Seiko</span>
      </div>
    </footer>
  )
}
