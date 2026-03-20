"use client";

import { useState, useRef } from "react";
import { Camera, Upload, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { processDonationNote } from "@/app/actions/donate";

export function Scanner() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setIsProcessing(true);
    setStatus("idle");

    try {
      const formData = new FormData();
      formData.append("image", file);
      
      const result = await processDonationNote(formData);
      
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Scan error:", error);
      setStatus("error");
    } finally {
      setIsProcessing(false);
    }
  };

  const triggerCapture = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-8 w-full">
      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        data-testid="file-input"
        aria-hidden="true"
        tabIndex={-1}
      />

      <button
        onClick={triggerCapture}
        disabled={isProcessing}
        aria-busy={isProcessing}
        aria-label={
          isProcessing 
            ? "Processing your donation note" 
            : status === "success" 
              ? "Scanning completed successfully" 
              : "Scan handwritten donation note"
        }
        className={cn(
          "w-full aspect-square max-w-[320px] rounded-[40px] flex flex-col items-center justify-center space-y-4 transition-all active:scale-95 shadow-2xl focus-visible:ring-4 focus-visible:ring-blue-400 outline-none",
          isProcessing ? "bg-slate-100" : "bg-blue-600 hover:bg-blue-700",
          status === "success" && "bg-green-600",
          status === "error" && "bg-red-600"
        )}
      >
        {isProcessing ? (
          <Loader2 className="w-24 h-24 text-blue-600 animate-spin" aria-hidden="true" />
        ) : status === "success" ? (
          <CheckCircle2 className="w-24 h-24 text-white" aria-hidden="true" />
        ) : status === "error" ? (
          <AlertCircle className="w-24 h-24 text-white" aria-hidden="true" />
        ) : (
          <Camera className="w-24 h-24 text-white" aria-hidden="true" />
        )}
        <span className="text-3xl font-black text-white uppercase tracking-tight" aria-hidden="true">
          {isProcessing ? "Scanning..." : status === "success" ? "Done!" : "Scan Note"}
        </span>
      </button>

      <div role="status" aria-live="polite" className="sr-only">
        {isProcessing && "Analyzing your photo with AI, please wait..."}
        {status === "success" && "Success! Your donation has been recorded."}
        {status === "error" && "Error processing note. Please try a clearer photo."}
      </div>

      {status === "success" && (
        <div className="bg-green-100 border-2 border-green-500 rounded-2xl p-6 text-center">
          <p className="text-green-800 text-xl font-bold">
            Donation recorded! Thank you for your help.
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="bg-red-100 border-2 border-red-500 rounded-2xl p-6 text-center">
          <p className="text-red-800 text-xl font-bold">
            Something went wrong. Please try again.
          </p>
        </div>
      )}
      
      {preview && !isProcessing && status === "idle" && (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-4 border-slate-200">
          <img src={preview} alt="Captured donation note preview" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
}
