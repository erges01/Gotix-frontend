"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TicketSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export default function TicketSuccessModal({ open, onClose }: TicketSuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="text-center space-y-4 max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-[#DDB892] text-2xl">
            Ticket Purchased!
          </DialogTitle>
        </DialogHeader>

        <p className="text-[#6B6B6B] text-sm">
          Check your email for your ticket confirmation.
        </p>

        <DialogFooter>
          <Button
            onClick={onClose}
            className="w-full bg-[#DDB892] text-[#1E1E1E] hover:opacity-90"
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
