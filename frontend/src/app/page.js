import BookList from "@/components/BookList";
import Image from "next/image";
import Link from 'next/link'

export default function Home() {
  

  return (
    <div className="flex-col flex items-center justify-center">
      
      <div className="invisible h-[10vh]"></div>
      <BookList/>
    </div>
  );
}
