import Link from "next/link"

const Hero = () => {
    return (
        <section className="my-7 grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col gap-1 md:justify-center md:pr-20 px-2 md:px-0">
                <h1 className="text-4xl md:text-5xl font-semibold mb-2 leading-[1.1]">Explore, Share <br></br>and Enjoy.</h1>
                <p className="text-gray-600 w-85 text-md">Share your good experiences, memories and the moment of your life as a Blog. Feel free to share if you have one. Let&#39;s create a collection of wonderful moments! </p>
                <Link href={"/register"} className="px-3 mt-5 w-32 py-2 text-md bg-mgreen text-white rounded-lg flex items-center justify-center hover:bg-transparent hover:text-mgreen hover:border-mgreen hover:border">Share now &raquo;</Link>
            </div>
            <div className="flex justify-center items-center">
                <img src="../../hero.png" />
            </div>
        </section>
    )
}

export default Hero