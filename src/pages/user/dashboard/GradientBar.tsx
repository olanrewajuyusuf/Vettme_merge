export default function GradientBar({ values }: { values: number[] }) {
    const gradient = `linear-gradient(to right, 
      red 0% ${values[0]}%, 
      purple ${values[0]}% ${values[0] + values[1]}%, 
      blue ${values[0] + values[1]}% 100%)`;
  
    return (
      <div
        className="w-full h-3 mb-5"
        style={{ background: gradient }}
      />
    );
}
  