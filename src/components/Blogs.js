import React from 'react';
import { BookOpenIcon } from "@heroicons/react/solid";
import { blogs } from "../data";

export default function Blogs() {
    return(
        <section id="blogs">
            <div className="container px-5 py-10 mx-auto">
                <div className="text-center mb-20">
                    <BookOpenIcon className="w-10 inline-block mb-4" />
                    <h1 className="sm:text-4xl text-3xl font-medium title-font text-white mb-4">
                        Blogs
                    </h1>
                    <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                        I love to write. I write about various things, including, but not limited to, technology. Here are some of my blogs.
                    </p>
                </div>
                <div className="flex flex-wrap -m-4">
                    {blogs.map((blog) => (
                    <a
                    href={blog.link}
                    key={blog.image}
                    className="sm:w-1/2 w-100 p-4">
                        <div className="flex relative">
                            <img
                            alt="gallery"
                            className="absolute inset-0 w-full h-full object-cover object-center"
                            src={blog.image}
                            />
                            <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-800 bg-gray-900 opacity-0 hover:opacity-100">
                                <h2 className="tracking-widest text-sm title-font font-medium text-green-400 mb-1">
                                    {blog.subtitle}
                                </h2>
                                <h1 className="title-font text-lg font-medium text-white mb-3">
                                    {blog.title}
                                </h1>
                                <p className="leading-relaxed">{blog.description}</p>
                            </div>
                        </div>
                    </a>
                ))}
                </div>
            </div>
        </section>
    )
}