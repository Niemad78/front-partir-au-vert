"use client";

import { Editor, EditorTextChangeEvent, EditorProps } from "primereact/editor";

type QuillProps = Omit<
  EditorProps,
  "value" | "onTextChange" | "modules" | "formats"
> & {
  name: string;
  value: string;
  error?: string;
  touched?: boolean;
  onChange: (event: React.ChangeEvent<any>) => void;
  containerClassName?: string;
  placeholder?: string;
};

export default function Quill({
  name,
  value,
  error,
  touched,
  onChange,
  containerClassName,
  placeholder,
  className,
  ...editorProps
}: QuillProps) {
  const hasError = !!error && !!touched;

  const headerTemplate = (
    <div className="flex items-center gap-2">
      {/* Header: Normal / H1 / H2 */}
      <span className="ql-formats">
        <select className="ql-header" defaultValue="">
          <option value="1">Titre 1</option>
          <option value="2">Titre 2</option>
          <option value="0">Normal</option>
        </select>
      </span>

      {/* Bold / Italic / Underline */}
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Gras"></button>
        <button className="ql-italic" aria-label="Italique"></button>
        <button className="ql-underline" aria-label="Souligné"></button>
      </span>

      {/* Align */}
      <span className="ql-formats">
        <select className="ql-align" defaultValue="">
          <option value=""></option>
          <option value="center"></option>
          <option value="right"></option>
          <option value="justify"></option>
        </select>
      </span>

      {/* Liste à puces */}
      <span className="ql-formats">
        <button
          className="ql-list"
          value="bullet"
          aria-label="Liste à puces"
        ></button>
      </span>

      {/* Lien + clean */}
      <span className="ql-formats">
        <button className="ql-link" aria-label="Lien"></button>
        <button className="ql-clean" aria-label="Nettoyer le style"></button>
      </span>
    </div>
  );

  const handleTextChange = (e: EditorTextChangeEvent) => {
    onChange({
      target: {
        name,
        value: e.htmlValue ?? "",
      },
    } as React.ChangeEvent<any>);
  };

  return (
    <div className={containerClassName ?? "w-full"}>
      <div className="w-full">
        <Editor
          id={name}
          {...editorProps}
          value={value}
          onTextChange={handleTextChange}
          headerTemplate={headerTemplate}
          style={{ height: "300px" }}
          className={`${className ?? ""} ${
            hasError ? "p-invalid border border-red-500" : ""
          }`}
          placeholder={placeholder}
        />
      </div>

      {hasError && (
        <span id={`${name}-error`} className="p-error pl-[5px]">
          {error}
        </span>
      )}
    </div>
  );
}
