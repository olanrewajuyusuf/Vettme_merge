export default function GradientBar({ values }: { values: number[] }) {
    const gradient = `linear-gradient(to right, 
      #f93663 0% ${values[0]}%, 
      #894eb3 ${values[0]}% ${values[0] + values[1]}%, 
      #3c7ade ${values[0] + values[1]}% 100%)`;
  
    return (
      <div
        className="w-full h-3 mb-5"
        style={{ background: gradient }}
      />
    );
}
  