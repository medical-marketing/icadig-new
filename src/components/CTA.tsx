"use client";
import React, { ReactElement } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import clsx from "clsx";
// import IframeCSR from "@/components/iFrameCSR";

type CtaProps = {
  className: string;
  style: object;
  children: ReactElement;
  iframe: ReactElement;
  // cta_iframe?: String;
};

export default function CTA({
  className,
  style,
  children,
  iframe, // cta_iframe,
}: CtaProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button
        className={clsx(
          "block w-fit mx-auto transition-colors duration-200 ease-in-out py-2 md:py-3 px-6 md:px-8 font-display font-semibold text-lg md:text-2xl text-center tracking-wide text-white  bg-[#b11c10] hover:!bg-[#5e5e5e] rounded-full",
          className
        )}
        style={style}
        onClick={onOpen}
      >
        {children}
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent style={{ height: "700px", overflowY: "scroll" }}>
          {(onClose) => (
            <>
              <ModalBody style={{ paddingRight: 0, paddingLeft: 0 }}>
                {/* <iframe
                  src={`https://api.leadconnectorhq.com/widget/survey/${iframe_id}`}
                  style={{
                    border: "none",
                    height: "900px",
                  }}
                  scrolling="yes"
                  id={iframe_id}
                  title={iframe_title}
                  loading="eager"
                ></iframe>
                <script
                  async={true}
                  src="https://link.msgsndr.com/js/form_embed.js"
                ></script> */}
                {iframe}
                {/* <IframeCSR cta_iframe={cta_iframe} /> */}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
