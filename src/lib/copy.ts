import toast from "react-hot-toast";

export const handleCopy = ({title, descSuccess, descFailed}: {title: string, descSuccess: string, descFailed: string}) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(title).then(() => {
        toast.success(descSuccess);
      });
    } else {
      toast.error(descFailed);
    }
};