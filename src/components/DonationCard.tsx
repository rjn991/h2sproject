"use client";

import { Package, Clock, CheckCircle2, ChevronRight, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface DonationItem {
  name: string;
  qty: number;
  unit: string;
  cat: string;
}

interface DonationProps {
  donation: {
    id: string;
    items: DonationItem[];
    status: string;
    createdAt: any;
    rawText: string;
  };
  onClaim: () => void;
}

export function DonationCard({ donation, onClaim }: DonationProps) {
  const isClaimed = donation.status === "claimed";
  const date = donation.createdAt?.toDate ? donation.createdAt.toDate().toLocaleString() : "Just now";

  return (
    <div className={cn(
      "bg-white rounded-3xl shadow-xl border-2 transition-all p-6 space-y-6 flex flex-col",
      isClaimed ? "border-green-100 opacity-75" : "border-slate-100 hover:border-blue-200"
    )}>
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-2 text-slate-400">
          <Clock className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">{date}</span>
        </div>
        <div className={cn(
          "px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest",
          isClaimed ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
        )}>
          {donation.status}
        </div>
      </div>

      <div className="space-y-4 flex-grow">
        <h3 className="text-slate-900 font-black text-xl flex items-center gap-2">
          <Package className="w-5 h-5 text-blue-600" />
          Donation Package
        </h3>
        
        <ul className="space-y-3">
          {donation.items.map((item, idx) => (
            <li key={idx} className="bg-slate-50 p-3 rounded-2xl flex items-center justify-between border border-slate-100">
              <div>
                <span className="block text-slate-900 font-bold leading-tight">{item.name}</span>
                <span className="flex items-center gap-1 text-slate-500 text-xs font-bold uppercase mt-1">
                  <Tag className="w-3 h-3" />
                  {item.cat}
                </span>
              </div>
              <div className="text-right">
                <span className="text-blue-600 font-black text-lg">{item.qty}</span>
                <span className="text-slate-400 text-xs font-bold ml-1 uppercase">{item.unit}</span>
              </div>
            </li>
          ))}
        </ul>

        {donation.rawText && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 italic">
              Original Note Content:
            </p>
            <p className="text-slate-600 text-sm line-clamp-2 italic">
              "{donation.rawText}"
            </p>
          </div>
        )}
      </div>

      <button
        onClick={onClaim}
        disabled={isClaimed}
        className={cn(
          "w-full py-4 rounded-2xl flex items-center justify-center space-x-2 font-black uppercase tracking-widest transition-all",
          isClaimed 
            ? "bg-slate-100 text-slate-400 cursor-not-allowed border-2 border-slate-200" 
            : "bg-slate-900 text-white hover:bg-slate-800 active:scale-95 shadow-lg group"
        )}
      >
        {isClaimed ? (
          <>
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span>Already Claimed</span>
          </>
        ) : (
          <>
            <span>Claim for Camp</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </div>
  );
}
