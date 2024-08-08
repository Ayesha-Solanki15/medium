const Avatar = ({ authorName, size }: { authorName: string; size: string }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-600 ${
        size === "small" ? "w-6 h-6" : "w-9 h-9"
      }`}
    >
      <span className={`font-xs text-gray-300 `}>
        {authorName[0].toUpperCase()}
      </span>
    </div>
  );
};

export default Avatar;

// w-${size} h-${size}
