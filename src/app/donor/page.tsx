import { Scanner } from "@/components/Scanner";

export default function DonorPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">
          BridgeLink
        </h1>
        <p className="text-2xl text-slate-600 font-medium max-w-md">
          Simple donations for everyone. Just snap a photo of your note.
        </p>
      </div>

      <div className="w-full max-w-md">
        <Scanner />
      </div>

      <div className="mt-auto pb-8 text-center">
        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
          A Crisis Response Tool
        </p>
      </div>
    </main>
  );
}
