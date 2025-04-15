export default function CreateBookForm() {

    return <>
    <form className='w-2/3 p-2 flex-col rounded border border-gray-300 shadow space-y-6'>
            <div className='flex flex-row'>
                <label className='flex w-1/3 p-4 justify-center text-right items-center font-medium'>
                    Title
                </label>
                <input
                    type='text'
                    id='title'
                    name='title'
                    className='flex w-full border border-gray-300 shadow-lg rounded p-2'
                />
            </div>
            <div className='flex flex-row'>
                <label className='flex w-1/3 p-4 justify-center text-right items-center font-medium'>
                    Description
                </label>
                <input
                    type='text'
                    id='description'
                    name='description'
                    className='flex w-full border border-gray-300 shadow-lg rounded p-2'
                />
            </div>
            <div className='flex flex-row'>
                <label className='flex w-1/3 p-4 justify-center text-right items-center font-medium'>
                    Published Date
                </label>
                <input
                    type='date'
                    id='published_date'
                    name='published_date'
                    className='flex w-full shadow-lg rounded p-2'
                />
            </div>
            <div>
                <span>Author</span>
            </div>
            <div className='flex flex-row'>
                <label className='flex w-1/3 p-4 justify-center text-right items-center font-medium'>
                    Name
                </label>
                <input
                    type='text'
                    id='author_name'
                    name='author_name'
                    className='flex w-full border border-gray-300 shadow-lg rounded p-2'
                />
            </div>
            <div className='flex flex-row'>
                <label className='flex w-1/3 p-4 justify-center text-right items-center font-medium'>
                    Born Date
                </label>
                <input
                    type='date'
                    id='author_born_date'
                    name='author_born_date'
                    className='flex w-full border border-gray-300 shadow-lg rounded p-2'
                />
            </div>
            <div className='flex flex-row'>
                <label className='flex w-1/3 p-4 justify-center text-right items-center font-medium'>
                    Biograhy
                </label>
                <input
                    type='text'
                    id='author_biograhy'
                    name='author_biograhy'
                    className='flex w-full border border-gray-300 shadow-lg rounded p-2'
                />
            </div>
        </form>
    </>
}