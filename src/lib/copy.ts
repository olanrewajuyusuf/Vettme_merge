import toast from "react-hot-toast";

export const handleCopy = (text: string, title: string) => {
  if (navigator.clipboard) {
  navigator.clipboard.writeText(text).then(() => {
      toast.success(`${title} copied`);
  });
  } else {
  toast.error("We need permission to write to your clipboard");
  }
};