import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const AddressLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <div>{children}</div>
    </div>
    
  )
}

export default AddressLayout;