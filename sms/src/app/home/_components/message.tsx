const Message = () => {
  return (
    <div className="site-bg border site-border p-3 rounded-md shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Name</h2>
        <span className="text-sm text-gray-500">Name</span>
      </div>
      <div className="mt-1">
        <p className="text-gray-600 text-justify">Image</p>
      </div>
    </div>
  );
};

export default Message;
