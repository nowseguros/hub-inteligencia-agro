import { ArrowCircleUp, CheckCircle, X } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface KmlUploadCardProps {
	files: File[];
	onFilesChange: (files: File[]) => void;
}

export function KmlUploadCard({ files, onFilesChange }: KmlUploadCardProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [dragging, setDragging] = useState(false);

	function handleFiles(incoming: FileList | null) {
		if (!incoming) return;
		const accepted = Array.from(incoming).filter((f) =>
			/\.(kml|kmz)$/i.test(f.name),
		);
		onFilesChange([...files, ...accepted]);
	}

	function removeFile(index: number) {
		onFilesChange(files.filter((_, i) => i !== index));
	}

	return (
		<div className="flex flex-col gap-3 rounded-[15px] bg-[#fafafa] p-5">
			<h2 className="text-[15px] font-bold text-[#3a3a3c]">Carregar KML/KMZ</h2>

			<button
				type="button"
				onClick={() => inputRef.current?.click()}
				onDragOver={(e) => {
					e.preventDefault();
					setDragging(true);
				}}
				onDragLeave={() => setDragging(false)}
				onDrop={(e) => {
					e.preventDefault();
					setDragging(false);
					handleFiles(e.dataTransfer.files);
				}}
				className={cn(
					"flex flex-col items-center justify-center gap-3 rounded-[10px] border border-dashed border-[#d9d9d9] bg-white py-8 transition-colors",
					dragging && "border-[#00ae8d] bg-[rgba(0,174,141,0.04)]",
				)}
			>
				<div className="flex size-[35px] items-center justify-center rounded-[5px] bg-[rgba(0,174,141,0.25)]">
					<ArrowCircleUp size={22} weight="regular" className="text-[#00ae8d]" />
				</div>
				<div className="text-center">
					<p className="text-[13px] font-bold text-[#3a3a3c]">
						Arraste o arquivo ou clique aqui
					</p>
					<p className="mt-0.5 text-[11px] text-[#3a3a3c]">
						Formato aceito: KML/KMZ
					</p>
				</div>
			</button>

			<input
				ref={inputRef}
				type="file"
				accept=".kml,.kmz"
				multiple
				className="hidden"
				onChange={(e) => handleFiles(e.target.files)}
			/>

			{files.length > 0 && (
				<ul className="flex flex-col gap-2">
					{files.map((file, i) => (
						<li
							key={`${file.name}-${i}`}
							className="flex items-center justify-between rounded-[8px] border border-[rgba(0,174,141,0.3)] bg-[rgba(0,174,141,0.05)] px-3 py-2"
						>
							<div className="flex items-center gap-2">
								<CheckCircle size={15} weight="fill" className="text-[#00ae8d]" />
								<span className="text-[12px] text-[#3a3a3c]">{file.name}</span>
							</div>
							<button
								type="button"
								onClick={() => removeFile(i)}
								className="text-[#8a8a8a] hover:text-[#252525]"
							>
								<X size={13} weight="bold" />
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
