export function ProductHeader() {
    return (
        <>
            <div className="flex flex-col gap-6 mb-6">
                <div>
                    <h1 className="text-[1.875rem] font-bold text-primary">Premium Cotton T-Shirt</h1>
                    <h2 className="text-[1rem] text-tertiary">STYLE Premium</h2>
                </div>
                <div className="text-[1rem]">
                    <span className="font-semibold text-primary">4.8</span>
                    <span className="font-regular text-tertiary">(124 reviews)</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-[1.875rem] font-bold text-[#DC2626]">$29</span>
                    <span className="text-[1.25rem] text-tertiary line-through">$49</span>

                </div>
                <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 bg-[#22C55E] rounded-full"></div>
                    <span className="font-semibold text-[#16A34A]">In Stock (12 Left)</span>
                </div>
            </div>
        </>
    )
}