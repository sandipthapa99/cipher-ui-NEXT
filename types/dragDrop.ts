export interface DragAndDropProps {
    name: string;
    image: string;
    fileType: string;
    maxImageSize?: number;
    maxPdfSize?: number;
    maxVideoSize?: number;
    field?: (
        string: string,
        file: Array<{ id: number; src: string; file: File }>
    ) => void;
}
