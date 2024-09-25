const Pagination = () => {
  return (
    <div className="p-4 flex items-center justify-between site-txt">
      <button className="link-btn px-4 py-1 text-lg">
        <span>Previous</span>
      </button>
      <div className="flex items-center gap-3 border site-border">
        <button type="button" className="border-r site-border p-2">
          1
        </button>
        <button type="button" className="border-r text-center site-border p-2">
          2
        </button>
        <button type="button" className="border-r site-border p-2">
          3
        </button>
      </div>
      <button className="link-btn px-4 py-1 text-lg">
        <span>Next</span>
      </button>
    </div>
  );
};

export default Pagination;
