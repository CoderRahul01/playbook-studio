import { ExternalBlob } from "@/backend";
import { Button } from "@/components/ui/button";
import { Clipboard, Image as ImageIcon, Upload, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";

interface ImageUploadProps {
  onUpload: (blob: ExternalBlob, previewUrl: string) => void;
  value?: string | null;
  onClear?: () => void;
  disabled?: boolean;
  "data-ocid"?: string;
}

export function ImageUpload({
  onUpload,
  value,
  onClear,
  disabled = false,
  "data-ocid": dataOcid,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const bytes = new Uint8Array(arrayBuffer);
        const blob = ExternalBlob.fromBytes(bytes);
        const previewUrl = URL.createObjectURL(file);
        onUpload(blob, previewUrl);
      };
      reader.readAsArrayBuffer(file);
    },
    [onUpload],
  );

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const file = files[0];
      if (!file.type.startsWith("image/")) return;
      processFile(file);
    },
    [processFile],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) processFile(file);
          break;
        }
      }
    },
    [processFile],
  );

  if (value) {
    return (
      <div
        className="relative rounded-xl overflow-hidden border border-border"
        data-ocid={dataOcid}
      >
        <img
          src={value}
          alt="Uploaded screenshot"
          className="w-full object-cover max-h-72"
        />
        {!disabled && (
          <button
            type="button"
            onClick={onClear}
            className="absolute top-2 right-2 flex items-center justify-center w-7 h-7 rounded-full bg-background/80 border border-border text-foreground hover:text-destructive hover:border-destructive transition-smooth backdrop-blur-sm"
            aria-label="Remove image"
            data-ocid="image_upload.clear_button"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      data-ocid={dataOcid}
      className={[
        "relative flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed transition-smooth cursor-pointer",
        isDragging
          ? "border-primary bg-primary/10"
          : "border-border hover:border-primary/50 hover:bg-muted/30",
        disabled ? "opacity-50 cursor-not-allowed" : "",
      ].join(" ")}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onPaste={handlePaste}
      onClick={() => !disabled && inputRef.current?.click()}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-label="Upload screenshot"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
        disabled={disabled}
        data-ocid="image_upload.input"
      />

      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border border-primary/20">
        <ImageIcon className="w-7 h-7 text-primary" />
      </div>

      <div className="text-center">
        <p className="text-sm font-medium text-foreground">
          Drop screenshot here or{" "}
          <span className="text-primary underline underline-offset-2">
            browse
          </span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Supports PNG, JPG, WebP
        </p>
      </div>

      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50 border border-border">
        <Clipboard className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">
          or paste from clipboard
        </span>
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.click();
        }}
        disabled={disabled}
        data-ocid="image_upload.upload_button"
      >
        <Upload className="w-4 h-4" />
        Choose File
      </Button>
    </div>
  );
}
