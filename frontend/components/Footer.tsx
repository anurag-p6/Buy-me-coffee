export default function Footer() {
  return (
    <footer className="w-full py-4 border-t text-center text-[1px] md:text-[10px] text-gray-500 bg-zinc-900 mt-10">
      © {new Date().getFullYear()} BrewETH — Made with <span className="relative top-[-2px] px-1 text-red-500 ">{'\u2764\uFE0F'}</span> by Anurag
    </footer>
  )
}
