import React, { useEffect, useState } from "react";

type PromptModalProps = {
  onClose: () => void;
};

const steps = [
  {
    title: "Navigate Sections",
    description: "Use the sidebar to navigate between sections.",
    targetId: "sidebar",
  },
  {
    title: "Manage Profile",
    description: "Click on your profile to manage settings.",
    targetId: "profile-button",
  },
  {
    title: "Top Up Wallet",
    description: "Top up your wallet to access premium features.",
    targetId: "topup-button",
  },
  {
    title: "View Overview",
    description: "View reports and analytics from the Overview tab.",
    targetId: "overview-tab",
  },
  {
    title: "Notifications",
    description: "Check notifications for updates and alerts.",
    targetId: "notification-button",
  },
  {
    title: "Dashboad Assistant",
    description: "Chat with bot to give you insight of the app.",
    targetId: "chat-button",
  },
];

const PromptModal: React.FC<PromptModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const currentStep = steps[step];

  useEffect(() => {
    const el = document.getElementById(currentStep.targetId);
    if (el) {
      const rect = el.getBoundingClientRect();
      setHighlightRect(rect);
  
      const tooltipHeight = 150;
      const tooltipWidth = 300;
  
      const isNearLeft = rect.left < window.innerWidth / 2;
      const isNearBottom = rect.top > window.innerHeight / 2;
  
      let top: number;
      let left: number;
  
      // Default placement: bottom of target
      top = rect.bottom + 10;
      left = rect.left;
  
      if (isNearBottom && isNearLeft) {
        // Sidebar (bottom-left corner): place tooltip at top-right of the target
        top = rect.top - tooltipHeight - 10;
        left = rect.right + 10;
      } else if (isNearBottom) {
        // Bottom-right: show top-left
        top = rect.top - tooltipHeight - 10;
        left = rect.left - tooltipWidth - 10;
      } else if (!isNearLeft) {
        // Top-right: show bottom-left
        top = rect.bottom + 10;
        left = rect.left - tooltipWidth - 10;
      } else {
        // Top-left: show bottom-right
        top = rect.bottom + 10;
        left = rect.right + 10;
      }
  
      // Clamp to screen
      top = Math.max(10, Math.min(top, window.innerHeight - tooltipHeight - 10));
      left = Math.max(10, Math.min(left, window.innerWidth - tooltipWidth - 10));
  
      setTooltipPos({ top, left });
    }
  }, [step, currentStep.targetId]);
  
  
  

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  return (
    <>
      {/* SVG Backdrop with hole */}
      {highlightRect && (
        <svg
            className="fixed inset-0 z-40 pointer-events-none"
            width="100%"
            height="100%"
        >
            <defs>
            <mask id="mask">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <ellipse
                cx={highlightRect.left + highlightRect.width / 2}
                cy={highlightRect.top + highlightRect.height / 2}
                rx={(highlightRect.width + 32) / 2}
                ry={(highlightRect.height + 32) / 2}
                fill="black"
                />
            </mask>
            </defs>
            <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(0,0,0,0.5)"
            mask="url(#mask)"
            />
        </svg>
        )}


      {/* Highlight border (optional) */}
      {highlightRect && (
        <div
          className="fixed  rounded-lg z-50 pointer-events-auto"
          style={{
            top: highlightRect.top - 8,
            left: highlightRect.left - 8,
            width: highlightRect.width + 16,
            height: highlightRect.height + 16,
          }}
        />
      )}

      {/* Tooltip */}
      <div
        className="fixed z-50 bg-white p-4 m-3 rounded shadow-lg max-w-sm w-[300px] pointer-events-auto"
        style={{
          top: tooltipPos.top,
          left: tooltipPos.left,
        }}
      >
        <h2 className="text-lg font-semibold mb-2">{currentStep.title}</h2>
        <p className="text-gray-600 text-sm mb-4">{currentStep.description}</p>
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
          onClick={handleNext}
        >
          {step === steps.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </>
  );
};

export default PromptModal;
