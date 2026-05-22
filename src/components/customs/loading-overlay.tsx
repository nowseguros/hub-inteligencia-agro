import { motion } from "motion/react";
import nowPin from "@/assets/now-pin.svg";

export function LoadingOverlay() {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
			<motion.div
				initial={{ opacity: 0, scale: 0.92 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.18, ease: "easeOut" }}
				className="flex h-[191px] w-[224px] flex-col items-center justify-center gap-4 rounded-[20px] border border-[#d9d9d9] bg-white shadow-[4px_4px_4px_0px_rgba(166,166,166,0.6)]"
			>
				<div className="relative flex items-center justify-center">
					<div className="size-18 rounded-full border-2 border-[#e8e8e8]" />
					<motion.div
						className="absolute inset-0"
						animate={{ rotate: 360 }}
						transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
					>
						<div className="size-3 rounded-full bg-[#00ae8d] absolute -top-1.5 left-1/2 -translate-x-1/2" />
					</motion.div>
					<img
						src={nowPin}
						alt="Now"
						className="absolute h-12.5 w-auto"
					/>
				</div>
				<p className="text-[18px] font-bold tracking-[0.5px] text-[#3a3a3c]">
					Carregando...
				</p>
			</motion.div>
		</div>
	);
}
