import { Fragment, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: { name: string; href: string }[];
}

export default function MobileMenu({ isOpen, onClose, items }: MobileMenuProps) {
  const handleNavClick = (href: string) => {
    scrollToElement(href.replace("#", ""));
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-end">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-x-full"
              enterTo="opacity-100 translate-x-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-full"
            >
              <Dialog.Panel className="fixed right-0 top-0 h-full w-[75%] max-w-sm bg-background shadow-xl">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <Dialog.Title className="text-lg font-medium">
                    Menu
                  </Dialog.Title>
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="py-4">
                  {items.map((item) => (
                    <button
                      key={item.name}
                      className="block w-full text-left py-3 px-6 hover:bg-muted transition-colors"
                      onClick={() => handleNavClick(item.href)}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
