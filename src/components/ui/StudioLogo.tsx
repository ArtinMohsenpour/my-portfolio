/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const StudioLogo = (props: any) => {
  const { renderDefault } = props;

  return (
    <div className="flex items-center gap-2 p-2">
      <div className="relative h-8 w-8 overflow-hidden rounded-full bg-white/10 p-1">
        {/* FIX: Use the path relative to the public folder */}
        <img
          src="logo-asr(2).png"
          alt="Logo"
          className="h-full w-full object-cover rounded-full"
        />
      </div>
      <>{renderDefault(props)}</>
    </div>
  );
};
