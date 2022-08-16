export interface DragAndDropProps {
    name: string;
    image: string;
    fileType: string;
    maxImageSize?: number;
    maxPdfSize?: number;
    maxVideoSize?: number;
    field?: (name: string, file: any) => void;
}
