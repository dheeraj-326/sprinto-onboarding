import CreateBookForm from "@/components/CreateBookForm";

export default function Create() {
    return <div className='flex flex-col items-center justify-center'>
        <div className="invisible h-[10vh]"></div>
        <CreateBookForm />
    </div>
}