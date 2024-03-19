import React, { Fragment, useState } from 'react';
import { faqData } from "../StaticData";
const Faqs = () => {
  return (
    <Fragment>
      <div className="container my-24 mx-auto md:px-6 xl:px-24">
        <section className="mb-32">
          <h2 className="mb-6 pl-6 text-3xl font-bold text-black">Frequently asked questions</h2>

          <div id="accordionFlushExample">
            {faqData && faqData.map((data, index) => (
              <Faq key={index} data={data} />
            ))}
          </div>
        </section>
      </div>
    </Fragment>
  );
}

const Faq = ({ data }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  }

  return (
    <div className="rounded-none border border-t-0 border-l-0 border-r-0 border-neutral-200">
      <h2 className="mb-0" id="flush-headingOne">
      <button
  className="group relative flex w-full items-center rounded-none border-0 py-4 px-5 text-left text-base font-bold transition overflow-anchor:none hover:z-[2] focus:z-[3] focus:outline-none [!open]:text-primary [!open]:box-shadow:inset_0_-1px_0_rgba(229,231,235) dark:[!open]:text-primary-400 text-black" // Add the text-black class here
  type="button" data-te-collapse-init data-te-target="#flush-collapseOne" aria-expanded="false"
  aria-controls="flush-collapseOne" onClick={handleOpen}>
  {data.question}
  <span
    className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out [!open]:rotate-0 [!open]:fill-[#212529] motion-reduce:transition-none dark:[!open]:fill-[#8FAEE0] dark:[!open]:fill-[#eee]">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path fillRule="evenodd"
        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
    </svg>
  </span>
</button>

      </h2>
      {open &&
        <div id="flush-collapseOne" className="!visible border-0" data-te-collapse-item data-te-collapse-show
          aria-labelledby="flush-headingOne" data-te-parent="#accordionFlushExample">
          <div className="py-4 px-5 text-neutral-500 dark:text-neutral-300">
            {data.answer}
          </div>
        </div>
      }
    </div>
  );
}

export default Faqs;
