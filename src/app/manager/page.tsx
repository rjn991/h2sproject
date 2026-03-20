"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { DonationCard } from "@/components/DonationCard";
import { Package, ClipboardList, Loader2 } from "lucide-react";

export default function ManagerPage() {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "donations"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDonations(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleClaim = async (id: string) => {
    try {
      const docRef = doc(db, "donations", id);
      await updateDoc(docRef, { status: "claimed" });
    } catch (error) {
      console.error("Error claiming donation:", error);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-8 space-y-8">
      <header className="flex items-center justify-between border-b pb-6 border-slate-200">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-lg">
            <ClipboardList className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Camp Manager Dashboard
          </h1>
        </div>
        <div className="bg-white px-6 py-2 rounded-full shadow-sm border border-slate-200 flex items-center space-x-2">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-bold text-slate-600 uppercase tracking-widest">
            Live Feed
          </span>
        </div>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          <p className="text-slate-500 font-medium">Loading inventory...</p>
        </div>
      ) : donations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-300">
          <Package className="w-20 h-20 text-slate-300 mb-4" />
          <p className="text-slate-500 text-xl font-medium text-center">
            No donations recorded yet.<br />
            New donations will appear here in real-time.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {donations.map((donation) => (
            <DonationCard
              key={donation.id}
              donation={donation}
              onClaim={() => handleClaim(donation.id)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
