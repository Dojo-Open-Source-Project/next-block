import type { FC } from "react";

export const Links: FC = () => {
	return (
		<div className="text-gray-500 flex flex-col md:flex-row gap-2 items-center">
			<a href="https://billandkeonne.org" target="_blank" rel="noreferrer">
				#FreeSamourai
			</a>
			<span className="hidden md:inline-block">&bull;</span>
			<a
				href="https://github.com/wanderingking072/sentinel-android"
				target="_blank"
				rel="noreferrer"
			>
				Sentinel
			</a>
			<span className="hidden md:inline-block">&bull;</span>
			<a href="https://dojo-osp.org" target="_blank" rel="noreferrer">
				Dojo OSP
			</a>
			<span className="hidden md:inline-block">&bull;</span>
			<a href="https://paynym.rs" target="_blank" rel="noreferrer">
				Paynym.rs
			</a>
			<span className="hidden md:inline-block">&bull;</span>
			<a href="https://ashigaru.rs" target="_blank" rel="noreferrer">
				Ashigaru
			</a>
		</div>
	);
};
