import { useState } from "react";

export default function ImageUploader({ onChange }) {
  const [preview, setPreview] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange?.(file);
  };

  return (
    <div style={{ border: "1px dashed #ccc", padding: 12, borderRadius: 8 }}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        style={{ marginBottom: 8 }}
      />
      {preview && (
        <div>
          <img
            src={preview}
            alt="preview"
            style={{ maxWidth: "100%", borderRadius: 8 }}
          />
        </div>
      )}
    </div>
  );
}
