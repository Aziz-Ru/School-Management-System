const Breadcrumb = ({
  sectionName,
  year,
  className,
}: {
  sectionName: string;
  year: string;
  className: string;
}) => {
  return (
    <div className="mb-6 flex gap-3 sm:items-center justify-between">
      <ol className="flex items-center gap-1">
        <li className="font-medium">{sectionName}</li>
        <li className="font-medium">/</li>
        <li className="font-medium ">{year}</li>
      </ol>
      <ol className="flex items-center gap-1">
        <li className="font-medium">{sectionName}</li>
        <li className="font-medium">/</li>
        <li className="font-medium ">{className}</li>
      </ol>
    </div>
  );
};

export default Breadcrumb;
