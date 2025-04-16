declare module "react-file-uploadify" {
  import { ComponentType } from "react";

  export interface FileDropZoneProps {
    onChange?: any;
    onDrop?: (files: File[]) => void;
    maxFilesSizeInMb?: number;
    acceptTypes?: string[];
    haveFileList?: boolean;
    multiple?: boolean;
    minFiles?: number;
    maxFiles?: number;
    lang?: string;
    classNames?: any;
    // Add other props as needed
  }

  export const FileDropZone: ComponentType<FileDropZoneProps>;
}
