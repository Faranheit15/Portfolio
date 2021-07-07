import React from "react";
import { TerminalIcon, UsersIcon } from "@heroicons/react/solid";
import { testimonials } from "../data";

export default function Testimonials() {
  return (
    <section id="testimonials">
      <div className="container px-5 py-10 mx-auto text-center">
        <UsersIcon className="w-10 inline-block mb-4" />
        <h1 className="sm:text-4xl text-3xl font-medium title-font text-white mb-12">
          Shoutouts
        </h1>
        <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
          Many of my friends are content creators. Here is a big shoutout to each and every one of them. Make sure to check their channel/page.
        </p>
        <div className="flex flex-wrap m-4">
          {testimonials.map((testimonial) => (
            <a href={testimonial.link}
            key={testimonial.image}
            className="sm:w-1/2 w-100 p-4">
              {/* <div className="p-4 md:w-1/2 w-full"> */}
              <div className="flex relative">
                <div className="h-full bg-gray-800 bg-opacity-40 p-8 rounded">
                  <TerminalIcon className="block w-8 text-gray-500 mb-4" />
                  <p className="leading-relaxed mb-6">{testimonial.quote}</p>
                  <div className="inline-flex items-center">
                    <img
                      alt="testimonial"
                      src={testimonial.image}
                      className="w-12 rounded-full flex-shrink-0 object-cover object-center"
                    />
                    <span className="flex-grow flex flex-col pl-4">
                      <span className="title-font font-medium text-white">
                        {testimonial.name}
                      </span>
                      <span className="text-gray-500 text-sm uppercase">
                        {testimonial.company}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}