import Image from 'next/image';

export default function Banner() {
    return (
        <div className='relative w-screen h-[80vh]'>
            <Image src='/img/cover.jpg' alt='cover' fill priority className='object-cover -z-10'/>

            <div className='relative z-10 flex flex-col items-center justify-center h-full text-white text-center'>
                <h1 className='text-4xl font-medium'>AAA</h1>
                <h3 className='text-xl font-serif'>BBB</h3>
            </div>
        </div>
    );
}
