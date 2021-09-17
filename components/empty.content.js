function EmptyContent({ header, subhead }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-1/3 bg-gray-100">
      {header && <h4 className="text-2xl font-serif font-medium">{header}</h4>}
      {subhead && <span className="mt-2 text-gray-600">{subhead}</span>}
    </div>
  );
}

export default EmptyContent;
