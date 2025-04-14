import BookList from "@/components/BookList";
import Image from "next/image";
import Link from 'next/link'

export default function Home() {
  

  return (
    <div className="block">
      <p className="text-4xl">Books CRUD</p>
      <BookList/>
    </div>
  );
}
