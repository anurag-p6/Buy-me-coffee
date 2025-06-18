import Image from "next/image";
import  { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      Hello World
      <Button variant="destructive" className="">Click Me</Button>
    </div>
  );
}
